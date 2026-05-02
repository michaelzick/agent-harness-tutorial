import { ArrowLeft } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import type { Course } from '../types/course'
import { lessonPath, lessonsForModule } from '../lib/courseNavigation'
import { LessonCard } from '../components/LessonCard'
import { ModuleOverview } from '../components/ModuleOverview'
import { harnessMeta } from '../data/harnessMeta'

export function HarnessDetailPage({ course, completed }: { course: Course; completed: Set<string> }) {
  const { harnessSlug } = useParams()
  const entry = Object.entries(harnessMeta).find(([, meta]) => meta.slug === harnessSlug)

  if (!entry) {
    return <Navigate to="/harnesses" replace />
  }

  const [harnessId, meta] = entry
  const module = course.modules.find((candidate) => candidate.harnessId === harnessId)

  if (!module) {
    return <Navigate to="/harnesses" replace />
  }

  const lessons = lessonsForModule(course, module.id)
  const firstLesson = lessons[0]

  return (
    <div className="page-stack">
      <div className="top-bar">
        <span className="crumbs">Reference / Harnesses / {meta.slug}</span>
        <Link className="text-link" to="/harnesses">
          <ArrowLeft className="icon" />
          All harnesses
        </Link>
      </div>

      <header className="page-header single-col">
        <span className="eyebrow">Dedicated harness section</span>
        <h1>{meta.title}</h1>
        <p>{meta.summary}</p>
        {firstLesson && (
          <div style={{ marginTop: '1.5rem' }}>
            <Link className="primary-button" to={lessonPath(module, firstLesson)}>
              Start {meta.title}
            </Link>
          </div>
        )}
      </header>

      <ModuleOverview course={course} module={module} completed={completed} />

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
    </div>
  )
}
