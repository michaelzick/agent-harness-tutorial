import { fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App'
import { course } from '../src/data/course'
import { findModuleForLesson, lessonPath } from '../src/lib/courseNavigation'
import { PROGRESS_STORAGE_KEY } from '../src/lib/progress'

function firstLessonPath() {
  const lesson = course.lessons[0]
  const module = findModuleForLesson(course, lesson)
  if (!module) {
    throw new Error('missing module')
  }
  return lessonPath(module, lesson)
}

beforeEach(() => {
  window.localStorage.clear()
  window.history.pushState({}, '', '/')
  vi.spyOn(window, 'confirm').mockReturnValue(true)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Agentic Automation Tutor app', () => {
  it('renders the dashboard and course modules', () => {
    render(<App />)

    expect(screen.getByText('Agentic Automation Tutor')).toBeInTheDocument()
    expect(screen.getByText('Learn to design useful agents, not vague autonomy.')).toBeInTheDocument()
    expect(screen.getAllByText('Foundations').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Agent Files and Workspace Context').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Harness deep dives').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Skills and marketplaces').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Example workflows').length).toBeGreaterThan(0)
    expect(screen.getAllByText('CTO readiness').length).toBeGreaterThan(0)
  })

  it('renders the lesson path grouped by module', () => {
    window.history.pushState({}, '', '/lessons')
    render(<App />)

    expect(screen.getByText('Agentic automation course')).toBeInTheDocument()
    expect(screen.getAllByText('What Agentic Automation Actually Is').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Real Estate Agent Marketing and Outreach Funnel').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Build a Multi-Harness Agentic Automation System').length).toBeGreaterThan(0)
  })

  it('does not crash when localStorage contains malformed progress', () => {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, '{bad json')

    render(<App />)

    expect(screen.getByText('0% complete')).toBeInTheDocument()
    expect(screen.getByText('Learn to design useful agents, not vague autonomy.')).toBeInTheDocument()
  })

  it('marks lesson completion and persists it', () => {
    window.history.pushState({}, '', firstLessonPath())
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /Mark complete/i }))

    expect(screen.getByRole('button', { name: /Completed/i })).toBeInTheDocument()
    const stored = JSON.parse(window.localStorage.getItem(PROGRESS_STORAGE_KEY) ?? '{}')
    expect(stored.completedLessonIds).toContain(course.lessons[0].id)
  })

  it('records checkpoint completion', () => {
    window.history.pushState({}, '', firstLessonPath())
    render(<App />)

    const checkpoint = screen.getByText(/What is the strongest operational takeaway/i).closest('section')
    if (!checkpoint) {
      throw new Error('checkpoint not found')
    }
    fireEvent.click(within(checkpoint).getByRole('button', { name: /Turn agent loop into explicit/i }))

    expect(screen.getByText(/Correct./i)).toBeInTheDocument()
    const stored = JSON.parse(window.localStorage.getItem(PROGRESS_STORAGE_KEY) ?? '{}')
    expect(stored.checkpointResults[course.lessons[0].checkpoint.id]).toBe(true)
  })

  it('resets progress from the sidebar', () => {
    window.history.pushState({}, '', firstLessonPath())
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /Mark complete/i }))
    fireEvent.click(screen.getByRole('button', { name: /Reset progress/i }))

    const stored = JSON.parse(window.localStorage.getItem(PROGRESS_STORAGE_KEY) ?? '{}')
    expect(stored.completedLessonIds).toEqual([])
  })

  it('renders React Flow diagrams in the gallery', () => {
    window.history.pushState({}, '', '/diagrams')
    render(<App />)

    expect(screen.getByText('Automation flow library')).toBeInTheDocument()
    expect(screen.getByText('Basic Agent Loop')).toBeInTheDocument()
    expect(screen.getByText('Multi-Harness Automation Stack')).toBeInTheDocument()
  })

  it('renders harness grouping pages', () => {
    window.history.pushState({}, '', '/harnesses')
    render(<App />)

    expect(screen.getByText('Learn each harness in its own lane.')).toBeInTheDocument()
    expect(screen.getByText('Codex')).toBeInTheDocument()
    expect(screen.getByText('Claude Cowork')).toBeInTheDocument()
    expect(screen.getByText('NemoClaw')).toBeInTheDocument()
  })

  it('renders a dedicated harness detail page with setup content', () => {
    window.history.pushState({}, '', '/harnesses/codex')
    render(<App />)

    expect(screen.getByText('Codex')).toBeInTheDocument()
    expect(screen.getAllByText('Install and Set Up Codex').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Repository-grounded engineering automation/i).length).toBeGreaterThan(0)
  })

  it('renders new authored lesson section types', () => {
    window.history.pushState({}, '', '/learn/codex-dedicated-section/install-and-set-up-codex')
    render(<App />)

    expect(screen.getByText('Codex setup lab')).toBeInTheDocument()
    expect(screen.getByText('npm i -g @openai/codex')).toBeInTheDocument()
    expect(screen.getByText('Codex `AGENTS.md` starter')).toBeInTheDocument()
  })

  it('renders the skills and CTO routes', () => {
    window.history.pushState({}, '', '/skills')
    const { unmount } = render(<App />)

    expect(screen.getByText('Turn repeated prompting into reviewed procedures.')).toBeInTheDocument()
    expect(screen.getAllByText('What Skills Are and When to Use Them').length).toBeGreaterThan(0)

    unmount()
    window.history.pushState({}, '', '/cto')
    render(<App />)

    expect(screen.getByText('Answer like the person responsible for the system.')).toBeInTheDocument()
    expect(screen.getAllByText('What an Interviewer Wants to Hear').length).toBeGreaterThan(0)
  })

  it('renders workflow playbooks and workflow guide sections', () => {
    window.history.pushState({}, '', '/workflows')
    const { unmount } = render(<App />)

    expect(screen.getByText('Client acquisition playbooks for people who do not want to become automation engineers.')).toBeInTheDocument()
    expect(screen.getAllByText('Real Estate Agent Marketing and Outreach Funnel').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Life Coach Consultation Funnel').length).toBeGreaterThan(0)

    unmount()
    window.history.pushState({}, '', '/learn/example-workflows/real-estate-agent-marketing-and-outreach-funnel')
    render(<App />)

    expect(screen.getByText('Real estate lead follow-up funnel')).toBeInTheDocument()
    expect(screen.getByText('Inputs to collect before using agents')).toBeInTheDocument()
    expect(screen.getAllByText(/Best harness:/i).length).toBeGreaterThan(0)
    expect(screen.getByText('Go deeper for technical operators')).toBeInTheDocument()
  })
})
