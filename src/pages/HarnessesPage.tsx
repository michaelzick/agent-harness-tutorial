import { ArrowRight, Boxes } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Course } from '../types/course'
import { lessonsForModule } from '../lib/courseNavigation'
import { ProgressBar } from '../components/ProgressBar'
import { harnessMeta, harnessOrder } from '../data/harnessMeta'

export function HarnessesPage({ course, completed }: { course: Course; completed: Set<string> }) {
  return (
    <div className="page-stack">
      <section className="page-header">
        <span className="eyebrow">Harness deep dives</span>
        <h1>Learn each harness in its own lane.</h1>
        <p>
          Each section groups install/setup, instruction files, skills, workflows, failure modes, and enterprise fit for
          one harness. Use the comparison module when deciding between them.
        </p>
      </section>

      <section className="harness-grid">
        {harnessOrder.map((harnessId) => {
          const meta = harnessMeta[harnessId]
          const module = course.modules.find((candidate) => candidate.harnessId === harnessId)
          const lessons = module ? lessonsForModule(course, module.id) : []
          const completedCount = lessons.filter((lesson) => completed.has(lesson.id)).length
          const percent = lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0

          return (
            <Link className="harness-card" to={`/harnesses/${meta.slug}`} key={harnessId}>
              <div className="module-card-top">
                <div className="module-icon">
                  <Boxes className="icon" />
                </div>
                <span className="status">{lessons.length} lessons</span>
              </div>
              <div>
                <h2>{meta.title}</h2>
                <p>{meta.summary}</p>
              </div>
              <div className="mini-panel">
                <strong>Best for</strong>
                <p>{meta.bestFor}</p>
              </div>
              <ProgressBar percent={percent} label={`${percent}% complete`} />
              <span className="inline-link">
                Open section
                <ArrowRight className="icon" />
              </span>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
