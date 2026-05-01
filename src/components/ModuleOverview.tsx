import type { Course, CourseModule } from '../types/course'
import { lessonsForModule } from '../lib/courseNavigation'
import { ProgressBar } from './ProgressBar'

export function ModuleOverview({
  course,
  module,
  completed,
}: {
  course: Course
  module: CourseModule
  completed: Set<string>
}) {
  const lessons = lessonsForModule(course, module.id)
  const completedCount = lessons.filter((lesson) => completed.has(lesson.id)).length
  const percent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0

  return (
    <article className="module-overview">
      <div>
        <span className="eyebrow">{lessons.length} lessons</span>
        <h2>{module.title}</h2>
        <p>{module.summary}</p>
      </div>
      <ProgressBar percent={percent} label={`${completedCount} of ${lessons.length} complete`} />
    </article>
  )
}
