import { ArrowRight, Route } from 'lucide-react'
import { Link } from 'react-router-dom'
import { harnessMeta, harnessOrder } from '../data/harnessMeta'
import { lessonsForModule } from '../lib/courseNavigation'
import type { Course, HarnessId } from '../types/course'
import { ProgressBar } from './ProgressBar'

export function WorkflowHarnessSelector({
  course,
  completed,
  activeHarnessId,
}: {
  course: Course
  completed: Set<string>
  activeHarnessId?: HarnessId
}) {
  const orderedHarnesses = activeHarnessId
    ? [activeHarnessId, ...harnessOrder.filter((harnessId) => harnessId !== activeHarnessId)]
    : harnessOrder

  return (
    <section className="harness-grid" aria-label="Workflow harness choices">
      {orderedHarnesses.map((harnessId) => {
        const meta = harnessMeta[harnessId]
        const module = course.modules.find(
          (candidate) => candidate.track === 'workflows' && candidate.harnessId === harnessId,
        )
        const lessons = module ? lessonsForModule(course, module.id) : []
        const completedCount = lessons.filter((lesson) => completed.has(lesson.id)).length
        const percent = lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0
        const isActive = activeHarnessId === harnessId

        return (
          <Link
            className={isActive ? 'harness-card workflow-choice active' : 'harness-card workflow-choice'}
            to={`/workflows/${meta.slug}`}
            key={harnessId}
          >
            <div className="module-card-top">
              <div className="module-icon">
                <Route className="icon" />
              </div>
              <span className={isActive ? 'status done' : 'status'}>{isActive ? 'Selected' : `${lessons.length} lessons`}</span>
            </div>
            <div>
              <h2>{meta.title}</h2>
              <p>{module?.summary ?? meta.summary}</p>
            </div>
            <ProgressBar percent={percent} label={`${percent}% complete`} />
            <span className="inline-link">
              {isActive ? 'Open selected workflow' : 'Choose workflow track'}
              <ArrowRight className="icon" />
            </span>
          </Link>
        )
      })}
    </section>
  )
}
