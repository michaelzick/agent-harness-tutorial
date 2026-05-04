import { useMemo, useState, type ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import type { Course, ProgressState } from '../types/course'
import { calculatePercentComplete } from '../lib/progress'
import { ProgressBar } from './ProgressBar'
import { ResetProgressButton } from './ResetProgressButton'
import { MobileDrawer } from './MobileDrawer'
import { MobileTopBar } from './MobileTopBar'
import { OutlineContext } from './OutlineContext'

const COURSE_LINKS: Array<{ to: string; label: string; matchPrefix?: string; end?: boolean }> = [
  { to: '/', label: 'Overview', end: true },
  { to: '/lessons', label: 'Lessons', matchPrefix: '/learn' },
  { to: '/diagrams', label: 'Diagrams' },
]

const REFERENCE_LINKS: Array<{ to: string; label: string; matchPrefix?: string }> = [
  { to: '/harnesses', label: 'Harnesses', matchPrefix: '/harnesses' },
  { to: '/skills', label: 'Skills' },
  { to: '/workflows', label: 'Workflows', matchPrefix: '/workflows' },
  { to: '/cto', label: 'CTO track' },
]

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
  const [menuState, setMenuState] = useState({ open: false, pathname: location.pathname })
  const [outlineHandler, setOutlineHandlerState] = useState<(() => void) | null>(null)
  const percent = calculatePercentComplete(progress, course.lessons)
  const completedCount = course.lessons.filter((lesson) => completed.has(lesson.id)).length
  const outlineContextValue = useMemo(
    () => ({
      setOutlineHandler: (handler: (() => void) | null) => {
        setOutlineHandlerState(() => handler)
      },
    }),
    [],
  )
  const menuOpen = menuState.open && menuState.pathname === location.pathname

  function isActive(link: { to: string; matchPrefix?: string; end?: boolean }) {
    if (link.end) {
      return location.pathname === link.to
    }
    if (link.matchPrefix) {
      return location.pathname === link.to || location.pathname.startsWith(link.matchPrefix)
    }
    return location.pathname === link.to || location.pathname.startsWith(link.to)
  }

  const sidebarContents = (
    <SidebarContents
      isActive={isActive}
      percent={percent}
      completedCount={completedCount}
      total={course.lessons.length}
      lastVisitedAt={progress.lastVisitedAt}
      onResetProgress={onResetProgress}
    />
  )

  return (
    <OutlineContext.Provider value={outlineContextValue}>
      <div className="app-shell">
        <aside className="app-sidebar">{sidebarContents}</aside>

        <main className="main-shell">
          <MobileTopBar
            onOpenMenu={() => setMenuState({ open: true, pathname: location.pathname })}
            onOpenOutline={outlineHandler}
          />
          {children}
        </main>

        <MobileDrawer
          open={menuOpen}
          onClose={() => setMenuState((current) => ({ ...current, open: false }))}
          side="left"
          title="Menu"
        >
          {sidebarContents}
        </MobileDrawer>
      </div>
    </OutlineContext.Provider>
  )
}

function SidebarContents({
  isActive,
  percent,
  completedCount,
  total,
  lastVisitedAt,
  onResetProgress,
}: {
  isActive: (link: { to: string; matchPrefix?: string; end?: boolean }) => boolean
  percent: number
  completedCount: number
  total: number
  lastVisitedAt: string
  onResetProgress: () => void
}) {
  return (
    <>
      <div className="brand">
        <span className="brand-kicker">Tutorial</span>
        <span className="brand-word">Agent Harness</span>
      </div>

      <div className="nav-group">
        <span className="nav-group-label">Course</span>
        <nav className="primary-nav" aria-label="Course navigation">
          {COURSE_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={() => (isActive(link) ? 'active' : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="nav-group">
        <span className="nav-group-label">Reference</span>
        <nav className="primary-nav" aria-label="Reference navigation">
          {REFERENCE_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={() => (isActive(link) ? 'active' : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <section className="sidebar-foot">
        <div className="sidebar-foot-row">
          <span className="sidebar-foot-label">Progress</span>
          <span className="sidebar-foot-value">{percent}%</span>
        </div>
        <ProgressBar percent={percent} variant="thin" />
        <div className="sidebar-foot-row">
          <span className="sidebar-foot-label">Lessons</span>
          <span className="sidebar-foot-value">
            {completedCount} / {total}
          </span>
        </div>
        <div className="sidebar-foot-row">
          <span className="sidebar-foot-label">Last visit</span>
          <span className="sidebar-foot-value">{formatDate(lastVisitedAt)}</span>
        </div>
        <ResetProgressButton onReset={onResetProgress} />
      </section>
    </>
  )
}

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return '—'
  }
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
