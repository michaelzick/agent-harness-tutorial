import { CheckCircle2, Circle } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Course, Lesson } from '../types/course'
import { lessonPath, lessonsForModule } from '../lib/courseNavigation'

export function LessonSidebar({
  course,
  activeLesson,
  completed,
}: {
  course: Course
  activeLesson: Lesson | null
  completed: Set<string>
}) {
  return (
    <nav className="lesson-sidebar" aria-label="Lesson navigation">
      {course.modules.map((module, moduleIndex) => (
        <section className="lesson-sidebar-module" key={module.id}>
          <h3>
            <span>{String(moduleIndex + 1).padStart(2, '0')}</span>
            {module.title}
          </h3>
          <div>
            {lessonsForModule(course, module.id).map((lesson) => {
              const isActive = activeLesson?.id === lesson.id
              const isComplete = completed.has(lesson.id)
              return (
                <Link
                  className={isActive ? 'lesson-sidebar-link active' : 'lesson-sidebar-link'}
                  key={lesson.id}
                  to={lessonPath(module, lesson)}
                >
                  {isComplete ? <CheckCircle2 className="icon" /> : <Circle className="icon" />}
                  <span>{lesson.title}</span>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </nav>
  )
}
