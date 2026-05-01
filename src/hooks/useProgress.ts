import { useCallback, useMemo, useState } from 'react'
import type { CourseModule, Lesson, ProgressState } from '../types/course'
import {
  completeLesson,
  createEmptyProgress,
  readProgress,
  recordCheckpoint,
  visitLesson,
  writeProgress,
} from '../lib/progress'

export function useProgress(lessons: Lesson[], modules: CourseModule[]) {
  const [progress, setProgress] = useState<ProgressState>(() => readProgress(lessons, modules))

  const persist = useCallback((updater: (current: ProgressState) => ProgressState) => {
    setProgress((current) => {
      const next = updater(current)
      writeProgress(next)
      return next
    })
  }, [])

  const completed = useMemo(() => new Set(progress.completedLessonIds), [progress.completedLessonIds])

  const markLessonComplete = useCallback(
    (lesson: Lesson) => persist((current) => completeLesson(current, lesson)),
    [persist],
  )

  const setCurrentLesson = useCallback(
    (lesson: Lesson) => persist((current) => visitLesson(current, lesson)),
    [persist],
  )

  const setCheckpointResult = useCallback(
    (checkpointId: string, isCorrect: boolean) =>
      persist((current) => recordCheckpoint(current, checkpointId, isCorrect)),
    [persist],
  )

  const resetProgress = useCallback(() => {
    const next = createEmptyProgress()
    writeProgress(next)
    setProgress(next)
  }, [])

  return {
    progress,
    completed,
    markLessonComplete,
    setCurrentLesson,
    setCheckpointResult,
    resetProgress,
  }
}
