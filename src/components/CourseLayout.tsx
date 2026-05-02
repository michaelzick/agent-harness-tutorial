import { BookOpenCheck, Boxes, BrainCircuit, GitBranch, LayoutDashboard, Route, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import type { Course, ProgressState } from '../types/course'
import { calculatePercentComplete } from '../lib/progress'
import { ProgressBar } from './ProgressBar'
import { ResetProgressButton } from './ResetProgressButton'

export function CourseLayout({
  course,
  progress,
  completed,
  onResetProgress,
  children,
}: {
  course: Course
  progress: ProgressState
  completed: Set<string>
  onResetProgress: () => void
  children: ReactNode
}) {
  const location = useLocation()
  const percent = calculatePercentComplete(progress, course.lessons)
  const completedCount = course.lessons.filter((lesson) => completed.has(lesson.id)).length

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="brand">
          <div className="brand-mark">AA</div>
          <div>
            <strong>Agentic Automation Tutor</strong>
            <span>Harness-based technical course</span>
          </div>
        </div>

        <nav className="primary-nav" aria-label="Primary navigation">
          <NavLink to="/" end>
            <LayoutDashboard className="icon" />
            Dashboard
          </NavLink>
          <NavLink
            to="/lessons"
            className={({ isActive }) => (isActive || location.pathname.startsWith('/learn') ? 'active' : undefined)}
          >
            <BookOpenCheck className="icon" />
            Lessons
          </NavLink>
          <NavLink to="/harnesses" className={({ isActive }) => (isActive || location.pathname.startsWith('/harnesses') ? 'active' : undefined)}>
            <Boxes className="icon" />
            Harnesses
          </NavLink>
          <NavLink to="/skills">
            <BrainCircuit className="icon" />
            Skills
          </NavLink>
          <NavLink to="/workflows">
            <Route className="icon" />
            Workflows
          </NavLink>
          <NavLink to="/cto">
            <ShieldCheck className="icon" />
            CTO Track
          </NavLink>
          <NavLink to="/diagrams">
            <GitBranch className="icon" />
            Diagrams
          </NavLink>
        </nav>

        <section className="sidebar-panel">
          <div className="panel-title">Progress</div>
          <ProgressBar percent={percent} label={`${percent}% complete`} />
          <p>
            {completedCount} of {course.lessons.length} lessons complete
          </p>
          <p>Last visit: {formatDate(progress.lastVisitedAt)}</p>
          <ResetProgressButton onReset={onResetProgress} />
        </section>
      </aside>

      <main className="main-shell">{children}</main>
    </div>
  )
}

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return 'not recorded'
  }
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
