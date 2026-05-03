import { Link } from 'react-router-dom'
import type { Course } from '../types/course'
import { lessonPath, lessonsForModule } from '../lib/courseNavigation'
import { LessonCard } from '../components/LessonCard'

export function SkillsPage({ course, completed }: { course: Course; completed: Set<string> }) {
  const module = course.modules.find((candidate) => candidate.track === 'skills')
  const lessons = module ? lessonsForModule(course, module.id) : []

  return (
    <div className="page-stack">
      <div className="top-bar">
        <span className="crumbs">Reference / Skills</span>
        <span className="top-meta">{lessons.length} LESSONS</span>
      </div>

      <header className="page-header single-col">
        <span className="eyebrow">Skills and marketplaces</span>
        <h1>Turn repeated prompting into reviewed procedures.</h1>
        <p>
          Learn how `SKILL.md` files, progressive disclosure, ClawHub, Claude plugin marketplaces, Hermes skills, and
          internal skill catalogs fit into a serious automation practice.
        </p>
        {module && lessons[0] && (
          <div style={{ marginTop: '1.5rem' }}>
            <Link className="primary-button" to={lessonPath(module, lessons[0])}>
              Start skills module
            </Link>
          </div>
        )}
      </header>

      {module && (
        <section className="lesson-card-list">
          {lessons.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              module={module}
              lesson={lesson}
              index={index}
              isComplete={completed.has(lesson.id)}
            />
          ))}
        </section>
      )}
    </div>
  )
}
