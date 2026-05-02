import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Course } from '../types/course'
import { lessonsForModule } from '../lib/courseNavigation'
import { ProgressBar } from '../components/ProgressBar'
import { harnessMarks, harnessMeta, harnessOrder } from '../data/harnessMeta'

export function HarnessesPage({ course, completed }: { course: Course; completed: Set<string> }) {
  return (
    <div className="page-stack">
      <div className="top-bar">
        <span className="crumbs">Reference / Harnesses</span>
        <span className="top-meta">{harnessOrder.length} INDEXED</span>
      </div>

      <header className="page-header">
        <div>
          <span className="eyebrow">Reference</span>
          <h1>Each harness in its own lane.</h1>
        </div>
        <p>
          Setup, instruction files, skills, workflows, failure modes, and enterprise fit &mdash; grouped per harness so
          you can read just the one you operate.
        </p>
      </header>

      <div className="harness-list">
        {harnessOrder.map((harnessId, index) => {
          const meta = harnessMeta[harnessId]
          const module = course.modules.find((candidate) => candidate.harnessId === harnessId)
          const lessons = module ? lessonsForModule(course, module.id) : []
          const completedCount = lessons.filter((lesson) => completed.has(lesson.id)).length
          const percent = lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0
          const status = percent === 100 ? 'complete' : percent > 0 ? 'in-progress' : 'not-started'
          const statusLabel = percent === 100 ? 'Complete' : percent > 0 ? 'In progress' : 'Not started'

          return (
            <Link className="harness-row" to={`/harnesses/${meta.slug}`} key={harnessId}>
              <div className="harness-row-id">
                <span className="harness-row-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="harness-mark">{harnessMarks[harnessId]}</span>
              </div>

              <div className="harness-row-body">
                <h2>{meta.title}</h2>
                <p className="harness-row-summary">{meta.summary}</p>
                <div className="harness-row-bestfor">
                  <span className="harness-row-bestfor-label">Best for</span>
                  <span className="harness-row-bestfor-text">{meta.bestFor}</span>
                </div>
              </div>

              <div className="harness-row-progress">
                <div className="harness-row-progress-head">
                  <span>Progress</span>
                  <span>{percent}%</span>
                </div>
                <ProgressBar percent={percent} variant="thin" />
                <span className="harness-row-progress-count">{lessons.length} lessons</span>
              </div>

              <div className={`harness-row-status ${status}`}>{statusLabel}</div>

              <div className="harness-row-arrow">
                <ArrowRight className="icon" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
