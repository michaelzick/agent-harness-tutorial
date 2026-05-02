import { describe, expect, it } from 'vitest'
import { course } from '../src/data/course'
import {
  adjacentLessons,
  findLessonById,
  findLessonRef,
  findModuleForLesson,
  firstIncompleteLesson,
  lessonPath,
  lessonsForModule,
} from '../src/lib/courseNavigation'

describe('courseNavigation helpers', () => {
  it('builds canonical lesson paths', () => {
    const lesson = course.lessons[0]
    const module = findModuleForLesson(course, lesson)
    expect(module).not.toBeNull()
    if (!module) {
      throw new Error('expected module')
    }
    expect(lessonPath(module, lesson)).toBe(`/learn/${module.slug}/${lesson.slug}`)
  })

  it('returns lessons in the order declared by the module', () => {
    const module = course.modules.find((candidate) => candidate.lessonIds.length > 1)
    if (!module) {
      throw new Error('expected at least one multi-lesson module')
    }
    const lessons = lessonsForModule(course, module.id)
    expect(lessons.map((lesson) => lesson.id)).toEqual(module.lessonIds)
  })

  it('resolves lesson ref by module and lesson slug', () => {
    const lesson = course.lessons[0]
    const module = findModuleForLesson(course, lesson)
    if (!module) {
      throw new Error('expected module')
    }
    const ref = findLessonRef(course, module.slug, lesson.slug)
    expect(ref?.lesson.id).toBe(lesson.id)
    expect(ref?.module.id).toBe(module.id)
  })

  it('returns null when slugs are missing or unknown', () => {
    expect(findLessonRef(course, 'no-such-module', 'no-such-lesson')).toBeNull()
    expect(findLessonRef(course, undefined, undefined)).toBeNull()
  })

  it('looks up a lesson by id and returns null for unknown ids', () => {
    const lesson = course.lessons[0]
    expect(findLessonById(course, lesson.id)?.id).toBe(lesson.id)
    expect(findLessonById(course, 'not-a-real-id')).toBeNull()
    expect(findLessonById(course, null)).toBeNull()
  })

  it('reports adjacent lessons across the flat lesson list', () => {
    const first = course.lessons[0]
    const last = course.lessons[course.lessons.length - 1]
    const middle = course.lessons[Math.floor(course.lessons.length / 2)]

    expect(adjacentLessons(course, first).previous).toBeNull()
    expect(adjacentLessons(course, first).next?.id).toBe(course.lessons[1].id)

    expect(adjacentLessons(course, last).next).toBeNull()
    expect(adjacentLessons(course, last).previous?.id).toBe(course.lessons[course.lessons.length - 2].id)

    const { previous, next } = adjacentLessons(course, middle)
    expect(previous?.id).not.toBe(middle.id)
    expect(next?.id).not.toBe(middle.id)
  })

  it('returns the first lesson when no progress exists, then advances as lessons complete', () => {
    const empty = firstIncompleteLesson(course, new Set())
    expect(empty?.id).toBe(course.lessons[0].id)

    const completed = new Set([course.lessons[0].id, course.lessons[1].id])
    expect(firstIncompleteLesson(course, completed)?.id).toBe(course.lessons[2].id)
  })

  it('falls back to the first lesson when every lesson is complete', () => {
    const allCompleted = new Set(course.lessons.map((lesson) => lesson.id))
    expect(firstIncompleteLesson(course, allCompleted)?.id).toBe(course.lessons[0].id)
  })
})
