import { ArrowRight, CheckCircle2, Circle } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CourseModule, Lesson } from '../types/course'
import { lessonPath } from '../lib/courseNavigation'

export function LessonCard({
  module,
  lesson,
  index,
  isComplete,
}: {
  module: CourseModule
  lesson: Lesson
  index: number
  isComplete: boolean
}) {
  return (
    <Link className="lesson-card" to={lessonPath(module, lesson)}>
      <span className="lesson-card-index">{index + 1}</span>
      <div>
        <h3>{lesson.title}</h3>
        <p>{lesson.summary}</p>
      </div>
      <span className={isComplete ? 'status done' : 'status'}>
        {isComplete ? <CheckCircle2 className="icon" /> : <Circle className="icon" />}
        {isComplete ? 'Complete' : `${lesson.estimatedMinutes} min`}
      </span>
      <ArrowRight className="icon muted-icon" />
    </Link>
  )
}
