import { ArrowRight, BriefcaseBusiness, CalendarCheck, Home, Lightbulb, Megaphone, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LessonCard } from '../components/LessonCard'
import { lessonPath, lessonsForModule } from '../lib/courseNavigation'
import type { Course } from '../types/course'

const workflowIcons = [Home, Users, Lightbulb, BriefcaseBusiness, CalendarCheck, Megaphone]

export function WorkflowsPage({ course, completed }: { course: Course; completed: Set<string> }) {
  const module = course.modules.find((candidate) => candidate.track === 'workflows')
  const lessons = module ? lessonsForModule(course, module.id) : []
  const firstLesson = lessons[0]

  return (
    <div className="page-stack">
      <section className="page-header workflow-playbook-header">
        <span className="eyebrow">Example workflows</span>
        <h1>Client acquisition playbooks for people who do not want to become automation engineers.</h1>
        <p>
          Start with the plain-English path: offer, lead source, capture, draft, review, follow up, and measure. Then
          go deeper with skill files, CRM fields, webhooks, approval rules, and audit logs when the manual version works.
        </p>
        {module && firstLesson && (
          <Link className="primary-button" to={lessonPath(module, firstLesson)}>
            Start workflow playbook
            <ArrowRight className="icon" />
          </Link>
        )}
      </section>

      <section className="workflow-card-grid">
        {lessons.slice(1).map((lesson, index) => {
          const Icon = workflowIcons[index % workflowIcons.length]
          return (
            <Link className="workflow-card" key={lesson.id} to={module ? lessonPath(module, lesson) : '/workflows'}>
              <Icon className="icon" />
              <div>
                <h2>{lesson.title}</h2>
                <p>{lesson.summary}</p>
              </div>
              <span className={completed.has(lesson.id) ? 'status done' : 'status'}>
                {completed.has(lesson.id) ? 'Complete' : `${lesson.estimatedMinutes} min`}
              </span>
            </Link>
          )
        })}
      </section>

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
