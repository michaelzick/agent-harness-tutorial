import type { CourseModule, Lesson, ProgressState } from '../types/course'

export const PROGRESS_STORAGE_KEY = 'agenticAutomationTutorProgress'

export function createEmptyProgress(): ProgressState {
  return {
    completedLessonIds: [],
    currentLessonId: null,
    currentModuleId: null,
    checkpointResults: {},
    lastVisitedAt: new Date().toISOString(),
  }
}

export function normalizeProgress(
  input: unknown,
  lessons: Lesson[],
  modules: CourseModule[],
): ProgressState {
  const lessonIds = new Set(lessons.map((lesson) => lesson.id))
  const moduleIds = new Set(modules.map((module) => module.id))
  const fallback = createEmptyProgress()

  if (!input || typeof input !== 'object') {
    return fallback
  }

  const candidate = input as Partial<ProgressState>
  const completedLessonIds = Array.isArray(candidate.completedLessonIds)
    ? Array.from(
        new Set(
          candidate.completedLessonIds.filter(
            (id): id is string => typeof id === 'string' && lessonIds.has(id),
          ),
        ),
      )
    : []

  const checkpointResults: Record<string, boolean> = {}
  if (candidate.checkpointResults && typeof candidate.checkpointResults === 'object') {
    for (const [checkpointId, value] of Object.entries(candidate.checkpointResults)) {
      if (typeof checkpointId === 'string' && typeof value === 'boolean') {
        checkpointResults[checkpointId] = value
      }
    }
  }

  const currentLessonId =
    typeof candidate.currentLessonId === 'string' && lessonIds.has(candidate.currentLessonId)
      ? candidate.currentLessonId
      : null
  const currentModuleId =
    typeof candidate.currentModuleId === 'string' && moduleIds.has(candidate.currentModuleId)
      ? candidate.currentModuleId
      : currentLessonId
        ? lessons.find((lesson) => lesson.id === currentLessonId)?.moduleId ?? null
        : null

  return {
    completedLessonIds,
    currentLessonId,
    currentModuleId,
    checkpointResults,
    lastVisitedAt:
      typeof candidate.lastVisitedAt === 'string' && candidate.lastVisitedAt.length > 0
        ? candidate.lastVisitedAt
        : fallback.lastVisitedAt,
  }
}

export function readProgress(lessons: Lesson[], modules: CourseModule[]): ProgressState {
  if (typeof window === 'undefined') {
    return createEmptyProgress()
  }

  try {
    const stored = window.localStorage.getItem(PROGRESS_STORAGE_KEY)
    return normalizeProgress(stored ? JSON.parse(stored) : null, lessons, modules)
  } catch {
    return createEmptyProgress()
  }
}

export function writeProgress(progress: ProgressState) {
  window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress))
}

export function calculatePercentComplete(progress: ProgressState, lessons: Lesson[]) {
  if (lessons.length === 0) {
    return 0
  }
  const validLessonIds = new Set(lessons.map((lesson) => lesson.id))
  const completedCount = progress.completedLessonIds.filter((id) => validLessonIds.has(id)).length
  return Math.round((completedCount / lessons.length) * 100)
}

export function completeLesson(progress: ProgressState, lesson: Lesson): ProgressState {
  return {
    ...progress,
    completedLessonIds: Array.from(new Set([...progress.completedLessonIds, lesson.id])),
    currentLessonId: lesson.id,
    currentModuleId: lesson.moduleId,
    lastVisitedAt: new Date().toISOString(),
  }
}

export function visitLesson(progress: ProgressState, lesson: Lesson): ProgressState {
  return {
    ...progress,
    currentLessonId: lesson.id,
    currentModuleId: lesson.moduleId,
    lastVisitedAt: new Date().toISOString(),
  }
}

export function recordCheckpoint(
  progress: ProgressState,
  checkpointId: string,
  isCorrect: boolean,
): ProgressState {
  return {
    ...progress,
    checkpointResults: {
      ...progress.checkpointResults,
      [checkpointId]: isCorrect,
    },
    lastVisitedAt: new Date().toISOString(),
  }
}
