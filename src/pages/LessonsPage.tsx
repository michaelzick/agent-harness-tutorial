import type { Course } from '../types/course'
import { LessonCard } from '../components/LessonCard'
import { ModuleOverview } from '../components/ModuleOverview'
import { lessonsForModule } from '../lib/courseNavigation'

export function LessonsPage({ course, completed }: { course: Course; completed: Set<string> }) {
  return (
    <div className="page-stack">
      <section className="page-header">
        <span className="eyebrow">Lesson path</span>
        <h1>Agentic automation course</h1>
        <p>
          Follow the lessons in order if you are new to agentic systems. Jump to soul files, workflow design, or safety
          if you already know the basic agent loop.
        </p>
      </section>

      {course.modules.map((module) => {
        const lessons = lessonsForModule(course, module.id)
        return (
          <section className="lesson-module" key={module.id}>
            <ModuleOverview course={course} module={module} completed={completed} />
            <div className="lesson-card-list">
              {lessons.map((lesson, index) => (
                <LessonCard
                  key={lesson.id}
                  module={module}
                  lesson={lesson}
                  index={index}
                  isComplete={completed.has(lesson.id)}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
