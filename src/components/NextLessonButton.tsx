import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Course, Lesson } from '../types/course'
import { findModuleForLesson, lessonPath } from '../lib/courseNavigation'

export function NextLessonButton({ course, next }: { course: Course; next: Lesson | null }) {
  if (!next) {
    return (
      <Link className="primary-button" to="/lessons">
        Review course
        <ArrowRight className="icon" />
      </Link>
    )
  }

  const module = findModuleForLesson(course, next)
  if (!module) {
    return null
  }

  return (
    <Link className="primary-button" to={lessonPath(module, next)}>
      Next lesson
      <ArrowRight className="icon" />
    </Link>
  )
}
