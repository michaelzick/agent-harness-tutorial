import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { LessonCard } from '../components/LessonCard'
import { ModuleOverview } from '../components/ModuleOverview'
import { WorkflowHarnessSelector } from '../components/WorkflowHarnessSelector'
import { harnessMeta } from '../data/harnessMeta'
import { lessonPath, lessonsForModule } from '../lib/courseNavigation'
import type { Course, HarnessId } from '../types/course'

export function WorkflowsPage({ course, completed }: { course: Course; completed: Set<string> }) {
  const { harnessSlug } = useParams()

  if (!harnessSlug) {
    return (
      <div className="page-stack">
        <section className="page-header workflow-playbook-header">
          <span className="eyebrow">Harness-specific workflows</span>
          <h1>Choose one harness before you start the playbook.</h1>
          <p>
            Each workflow track teaches the same business use cases through one selected harness only. Pick Codex,
            Claude Cowork, OpenClaw, NemoClaw, or Hermes, then follow lessons that keep every step in that harness.
          </p>
        </section>

        <WorkflowHarnessSelector course={course} completed={completed} />
      </div>
    )
  }

  const entry = Object.entries(harnessMeta).find(([, meta]) => meta.slug === harnessSlug)

  if (!entry) {
    return <Navigate to="/workflows" replace />
  }

  const [harnessId, meta] = entry as [HarnessId, (typeof harnessMeta)[HarnessId]]
  const module = course.modules.find(
    (candidate) => candidate.track === 'workflows' && candidate.harnessId === harnessId,
  )

  if (!module) {
    return <Navigate to="/workflows" replace />
  }

  const lessons = lessonsForModule(course, module.id)
  const firstLesson = lessons[0]

  return (
    <div className="page-stack">
      <section className="page-header workflow-playbook-header">
        <Link className="inline-link" to="/workflows">
          <ArrowLeft className="icon" />
          Workflow harnesses
        </Link>
        <span className="eyebrow">Harness-specific workflows</span>
        <h1>{meta.title} workflow playbooks</h1>
        <p>{module.summary}</p>
        {firstLesson && (
          <Link className="primary-button" to={lessonPath(module, firstLesson)}>
            Start {meta.title} workflows
            <ArrowRight className="icon" />
          </Link>
        )}
      </section>

      <WorkflowHarnessSelector course={course} completed={completed} activeHarnessId={harnessId} />

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
