import { ArrowRight, BookOpenCheck, Boxes, BrainCircuit, Route, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Course } from '../types/course'
import { calculatePercentComplete } from '../lib/progress'
import { findLessonById, findModuleForLesson, firstIncompleteLesson, lessonPath } from '../lib/courseNavigation'
import type { ProgressState } from '../types/course'
import { HarnessComparison } from '../components/HarnessComparison'
import { ModuleOverview } from '../components/ModuleOverview'
import { ProgressBar } from '../components/ProgressBar'

export function DashboardPage({
  course,
  progress,
  completed,
}: {
  course: Course
  progress: ProgressState
  completed: Set<string>
}) {
  const percent = calculatePercentComplete(progress, course.lessons)
  const currentLesson = findLessonById(course, progress.currentLessonId)
  const resumeLesson = currentLesson ?? firstIncompleteLesson(course, completed)
  const resumeModule = resumeLesson ? findModuleForLesson(course, resumeLesson) : null

  return (
    <div className="page-stack">
      <section className="dashboard-hero">
        <div>
          <span className="eyebrow">Agentic automation from first principles</span>
          <h1>Learn to design useful agents, not vague autonomy.</h1>
          <p>
            Work through the agent loop, harness selection, instruction files, workflow design, safety gates, and
            capstone automations using Codex, Claude Cowork, OpenClaw, NemoClaw, and Hermes as examples.
          </p>
          <div className="hero-actions">
            {resumeLesson && resumeModule && (
              <Link className="primary-button" to={lessonPath(resumeModule, resumeLesson)}>
                <BookOpenCheck className="icon" />
                Continue lesson
              </Link>
            )}
            <Link className="secondary-button" to="/lessons">
              View course path
              <ArrowRight className="icon" />
            </Link>
            <Link className="secondary-button" to="/harnesses">
              Harness deep dives
              <ArrowRight className="icon" />
            </Link>
            <Link className="secondary-button" to="/workflows">
              Harness workflows
              <ArrowRight className="icon" />
            </Link>
          </div>
        </div>
        <aside className="hero-progress-card">
          <strong>{percent}%</strong>
          <span>complete</span>
          <ProgressBar percent={percent} />
          <p>{course.lessons.length} lessons across {course.modules.length} modules</p>
        </aside>
      </section>

      <section className="dashboard-panels">
        <Link className="dashboard-panel" to="/harnesses">
          <Boxes className="icon" />
          <strong>Harness deep dives</strong>
          <p>Install, configure, compare, and use Codex, Claude Cowork, OpenClaw, NemoClaw, and Hermes in separate sections.</p>
        </Link>
        <Link className="dashboard-panel" to="/skills">
          <BrainCircuit className="icon" />
          <strong>Skills and marketplaces</strong>
          <p>Learn `SKILL.md`, ClawHub, Claude plugin marketplaces, Hermes skills, custom skills, and internal catalog governance.</p>
        </Link>
        <Link className="dashboard-panel" to="/workflows">
          <Route className="icon" />
          <strong>Harness workflows</strong>
          <p>Choose one harness, then follow client-acquisition playbooks written only for that harness.</p>
        </Link>
        <Link className="dashboard-panel" to="/cto">
          <ShieldCheck className="icon" />
          <strong>CTO readiness</strong>
          <p>Practice architecture, rollout, observability, evals, data policy, incident response, and vendor risk answers.</p>
        </Link>
      </section>

      <section className="section-header">
        <div>
          <span className="eyebrow">Course path</span>
          <h2>Modules</h2>
        </div>
        <p>Each module builds one layer of practical agentic automation design.</p>
      </section>

      <section className="module-grid">
        {course.modules.map((module) => (
          <ModuleOverview course={course} module={module} completed={completed} key={module.id} />
        ))}
      </section>

      <HarnessComparison />
    </div>
  )
}
