import { Link } from 'react-router-dom'
import type { Course } from '../types/course'
import { lessonPath, lessonsForModule } from '../lib/courseNavigation'
import { LessonCard } from '../components/LessonCard'

export function CtoPage({ course, completed }: { course: Course; completed: Set<string> }) {
  const modules = course.modules.filter((candidate) => candidate.track === 'enterprise' || candidate.track === 'cto')

  return (
    <div className="page-stack">
      <div className="top-bar">
        <span className="crumbs">Reference / CTO track</span>
        <span className="top-meta">{modules.reduce((acc, module) => acc + lessonsForModule(course, module.id).length, 0)} LESSONS</span>
      </div>

      <header className="page-header single-col">
        <span className="eyebrow">CTO hiring bar</span>
        <h1>Answer like the person responsible for the system.</h1>
        <p>
          These lessons focus on architecture judgment, build-vs-buy, workstation-to-enterprise rollout, governance,
          observability, evals, incident response, and marketplace risk.
        </p>
      </header>

      {modules.map((module) => {
        const lessons = lessonsForModule(course, module.id)
        return (
          <section className="lesson-module" key={module.id}>
            <div className="section-header">
              <div>
                <span className="eyebrow">{module.track}</span>
                <h2>{module.title}</h2>
              </div>
              {lessons[0] && (
                <Link className="secondary-button" to={lessonPath(module, lessons[0])}>
                  Start section
                </Link>
              )}
            </div>
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
