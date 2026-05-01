import { describe, expect, it } from 'vitest'
import { course } from '../src/data/course'
import {
  calculatePercentComplete,
  completeLesson,
  createEmptyProgress,
  normalizeProgress,
  recordCheckpoint,
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
})
