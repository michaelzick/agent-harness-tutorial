import { afterEach, describe, expect, it, vi } from 'vitest'
import { course } from '../src/data/course'
import {
  calculatePercentComplete,
  completeLesson,
  createEmptyProgress,
  normalizeProgress,
  PROGRESS_STORAGE_KEY,
  readProgress,
  recordCheckpoint,
  visitLesson,
  writeProgress,
} from '../src/lib/progress'

describe('progress storage model', () => {
  it('recovers from malformed or empty progress', () => {
    const progress = normalizeProgress(null, course.lessons, course.modules)

    expect(progress.completedLessonIds).toEqual([])
    expect(progress.currentLessonId).toBeNull()
    expect(progress.currentModuleId).toBeNull()
  })

  it('drops unknown lessons and preserves valid checkpoint results', () => {
    const lesson = course.lessons[0]
    const progress = normalizeProgress(
      {
        completedLessonIds: [lesson.id, 'missing-lesson'],
        currentLessonId: 'missing-lesson',
        currentModuleId: lesson.moduleId,
        checkpointResults: {
          [lesson.checkpoint.id]: true,
          bogus: 'yes',
        },
        lastVisitedAt: '2026-05-01T12:00:00.000Z',
      },
      course.lessons,
      course.modules,
    )

    expect(progress.completedLessonIds).toEqual([lesson.id])
    expect(progress.currentLessonId).toBeNull()
    expect(progress.currentModuleId).toBe(lesson.moduleId)
    expect(progress.checkpointResults[lesson.checkpoint.id]).toBe(true)
    expect(progress.checkpointResults.bogus).toBeUndefined()
  })

  it('marks completion and calculates percentage from valid course lessons', () => {
    const lesson = course.lessons[0]
    const progress = completeLesson(createEmptyProgress(), lesson)

    expect(progress.completedLessonIds).toEqual([lesson.id])
    expect(progress.currentLessonId).toBe(lesson.id)
    expect(calculatePercentComplete(progress, course.lessons)).toBe(Math.round(100 / course.lessons.length))
  })

  it('records checkpoint results without losing existing state', () => {
    const lesson = course.lessons[0]
    const completed = completeLesson(createEmptyProgress(), lesson)
    const withCheckpoint = recordCheckpoint(completed, lesson.checkpoint.id, true)

    expect(withCheckpoint.completedLessonIds).toEqual([lesson.id])
    expect(withCheckpoint.checkpointResults[lesson.checkpoint.id]).toBe(true)
  })

  it('treats a lesson as completed only once even if marked twice', () => {
    const lesson = course.lessons[0]
    const once = completeLesson(createEmptyProgress(), lesson)
    const twice = completeLesson(once, lesson)
    expect(twice.completedLessonIds).toEqual([lesson.id])
  })

  it('updates the current lesson and module when visiting a lesson', () => {
    const lesson = course.lessons[1]
    const next = visitLesson(createEmptyProgress(), lesson)
    expect(next.currentLessonId).toBe(lesson.id)
    expect(next.currentModuleId).toBe(lesson.moduleId)
    expect(next.completedLessonIds).toEqual([])
  })

  it('returns 0% complete when no lessons exist', () => {
    expect(calculatePercentComplete(createEmptyProgress(), [])).toBe(0)
  })

  it('round-trips through localStorage', () => {
    const lesson = course.lessons[0]
    const initial = completeLesson(createEmptyProgress(), lesson)
    writeProgress(initial)

    const restored = readProgress(course.lessons, course.modules)
    expect(restored.completedLessonIds).toEqual([lesson.id])
    expect(restored.currentLessonId).toBe(lesson.id)
  })
})

describe('writeProgress error handling', () => {
  afterEach(() => {
    window.localStorage.clear()
    vi.restoreAllMocks()
  })

  it('does not throw when localStorage refuses the write', () => {
    vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })

    expect(() => writeProgress(createEmptyProgress())).not.toThrow()
  })

  it('survives malformed JSON without crashing readProgress', () => {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, '{not valid')
    const recovered = readProgress(course.lessons, course.modules)
    expect(recovered.completedLessonIds).toEqual([])
    expect(recovered.checkpointResults).toEqual({})
  })
})
