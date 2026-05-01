import type { Course, CourseModule, Lesson, LessonRef } from '../types/course'

export function lessonPath(module: CourseModule, lesson: Lesson) {
  return `/learn/${module.slug}/${lesson.slug}`
}

export function lessonsForModule(course: Course, moduleId: string) {
  const ids = course.modules.find((module) => module.id === moduleId)?.lessonIds ?? []
  const lessonMap = new Map(course.lessons.map((lesson) => [lesson.id, lesson]))
  return ids.map((id) => lessonMap.get(id)).filter((lesson): lesson is Lesson => Boolean(lesson))
}

export function findLessonRef(course: Course, moduleSlug?: string, lessonSlug?: string): LessonRef | null {
  const module = course.modules.find((candidate) => candidate.slug === moduleSlug)
  if (!module) {
    return null
  }
  const lesson = lessonsForModule(course, module.id).find((candidate) => candidate.slug === lessonSlug)
  return lesson ? { lesson, module } : null
}

export function findLessonById(course: Course, lessonId: string | null) {
  return lessonId ? course.lessons.find((lesson) => lesson.id === lessonId) ?? null : null
}

export function findModuleForLesson(course: Course, lesson: Lesson) {
  return course.modules.find((module) => module.id === lesson.moduleId) ?? null
}

export function adjacentLessons(course: Course, lesson: Lesson) {
  const index = course.lessons.findIndex((candidate) => candidate.id === lesson.id)
  return {
    previous: index > 0 ? course.lessons[index - 1] : null,
    next: index >= 0 && index < course.lessons.length - 1 ? course.lessons[index + 1] : null,
  }
}

export function firstIncompleteLesson(course: Course, completedIds: Set<string>) {
  return course.lessons.find((lesson) => !completedIds.has(lesson.id)) ?? course.lessons[0] ?? null
}
