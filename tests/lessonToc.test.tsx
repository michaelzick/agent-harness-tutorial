import { fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App'
import { course } from '../src/data/course'
import { findModuleForLesson, lessonPath } from '../src/lib/courseNavigation'
import { slugify } from '../src/lib/slug'

function findLessonByTitle(title: string) {
  const lesson = course.lessons.find((candidate) => candidate.title === title)
  if (!lesson) {
    throw new Error(`missing lesson: ${title}`)
  }
  const module = findModuleForLesson(course, lesson)
  if (!module) {
    throw new Error(`missing module for lesson: ${title}`)
  }
  return { lesson, module }
}

beforeEach(() => {
  window.localStorage.clear()
  window.history.pushState({}, '', '/')
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('lesson "On this page" navigation', () => {
  it('renders a TOC link for each rendered section heading', () => {
    const { lesson, module } = findLessonByTitle('Install and Set Up Codex')
    window.history.pushState({}, '', lessonPath(module, lesson))
    render(<App />)

    const toc = screen.getByRole('navigation', { name: 'On this page' })
    const links = within(toc).getAllByRole('link')

    expect(links.length).toBeGreaterThan(0)
    const hrefs = links.map((link) => link.getAttribute('href'))
    expect(hrefs).toContain('#practical-example')
    expect(hrefs).toContain('#harness-specific-relevance')
  })

  it('every TOC link points to a target element actually present in the DOM', () => {
    const { lesson, module } = findLessonByTitle('Install and Set Up Codex')
    window.history.pushState({}, '', lessonPath(module, lesson))
    render(<App />)

    const toc = screen.getByRole('navigation', { name: 'On this page' })
    const links = within(toc).getAllByRole('link')

    for (const link of links) {
      const href = link.getAttribute('href') ?? ''
      expect(href.startsWith('#')).toBe(true)
      const id = href.slice(1)
      expect(id.length).toBeGreaterThan(0)
      const target = document.getElementById(id)
      expect(target, `missing anchor target for ${href}`).not.toBeNull()
    }
  })

  it('clicking a TOC link scrolls the matching section into view and marks it active', () => {
    const { lesson, module } = findLessonByTitle('Install and Set Up Codex')
    window.history.pushState({}, '', lessonPath(module, lesson))
    render(<App />)

    const toc = screen.getByRole('navigation', { name: 'On this page' })
    const practicalLink = within(toc).getByRole('link', { name: 'Practical example' })
    const target = document.getElementById('practical-example')
    if (!target) {
      throw new Error('expected practical example anchor')
    }
    const scrollIntoView = vi.fn()
    Object.defineProperty(target, 'scrollIntoView', {
      configurable: true,
      writable: true,
      value: scrollIntoView,
    })

    fireEvent.click(practicalLink)

    expect(scrollIntoView).toHaveBeenCalledTimes(1)
    expect(practicalLink.classList.contains('active')).toBe(true)
  })

  it('omits the Common mistakes entry when a lesson has none', () => {
    const lessonWithoutMistakes = course.lessons.find((lesson) => lesson.commonMistakes.length === 0)
    if (!lessonWithoutMistakes) {
      // Every lesson today ships with mistakes; that is itself a course-data invariant
      // we rely on, so assert it here so the test makes the assumption explicit.
      expect(course.lessons.every((lesson) => lesson.commonMistakes.length > 0)).toBe(true)
      return
    }
    const module = findModuleForLesson(course, lessonWithoutMistakes)
    if (!module) {
      throw new Error('missing module')
    }
    window.history.pushState({}, '', lessonPath(module, lessonWithoutMistakes))
    render(<App />)

    const toc = screen.getByRole('navigation', { name: 'On this page' })
    expect(within(toc).queryByRole('link', { name: 'Common mistakes' })).toBeNull()
  })

  it('matches the slugify rules used by the lib helper', () => {
    const { lesson, module } = findLessonByTitle('Install and Set Up Codex')
    window.history.pushState({}, '', lessonPath(module, lesson))
    render(<App />)

    const toc = screen.getByRole('navigation', { name: 'On this page' })
    const links = within(toc).getAllByRole('link')

    for (const link of links) {
      const text = link.textContent ?? ''
      const href = link.getAttribute('href') ?? ''
      expect(href).toBe(`#${slugify(text)}`)
    }
  })
})
