import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Course, ProgressState } from '../types/course';
import { calculatePercentComplete } from '../lib/progress';
import {
  findLessonById,
  findModuleForLesson,
  firstIncompleteLesson,
  lessonPath,
  lessonsForModule,
} from '../lib/courseNavigation';
import { harnessOrder } from '../data/harnessMeta';
import { ProgressBar } from '../components/ProgressBar';

export function DashboardPage({
  course,
  progress,
  completed,
}: {
  course: Course;
  progress: ProgressState;
  completed: Set<string>;
}) {
  const percent = calculatePercentComplete(progress, course.lessons);
  const currentLesson = findLessonById(course, progress.currentLessonId);
  const resumeLesson = currentLesson ?? firstIncompleteLesson(course, completed);
  const resumeModule = resumeLesson ? findModuleForLesson(course, resumeLesson) : null;
  const resumeModuleIndex = resumeModule
    ? course.modules.findIndex((module) => module.id === resumeModule.id) + 1
    : 0;
  const resumeLessonIndex = resumeModule && resumeLesson
    ? lessonsForModule(course, resumeModule.id).findIndex((lesson) => lesson.id === resumeLesson.id) + 1
    : 0;

  const completedLessons = course.lessons.filter((lesson) => completed.has(lesson.id)).length;
  const totalLessons = course.lessons.length;
  const totalDiagrams = new Set(course.lessons.map((lesson) => lesson.diagramId).filter(Boolean)).size;
  const harnessCount = harnessOrder.length;
  const moduleCount = course.modules.length;

  const lastVisit = formatDate(progress.lastVisitedAt);

  return (
    <div className="page-stack">
      <div className="top-bar">
        <span className="crumbs">Agent Harness Tutorial / Overview</span>
        <span className="top-meta">{percent}% complete · Last visit {lastVisit}</span>
      </div>

      <section className="dashboard-hero">
        <div>
          <span className="eyebrow hero-eyebrow">From first principles</span>
          <h1>
            Design useful agents,<br />
            <span>not vague autonomy.</span>
          </h1>
          <p className="hero-lede">
            Master agent loop design, harness selection, instruction file patterns, workflow architecture, and
            safety gates using five agentic harnesses: Codex, Claude Cowork, OpenClaw, NemoClaw, and Hermes.
          </p>
          <div className="hero-actions">
            {resumeLesson && resumeModule && (
              <Link className="primary-button" to={lessonPath(resumeModule, resumeLesson)}>
                Continue lesson
                <ArrowRight className="icon" />
              </Link>
            )}
            <Link className="secondary-button" to="/lessons">
              Course path
            </Link>
            <Link className="text-link" to="/harnesses">
              Skip to harnesses &rarr;
            </Link>
          </div>
        </div>

        {resumeLesson && resumeModule && (
          <Link
            className="resume-card"
            to={lessonPath(resumeModule, resumeLesson)}
            aria-label={`Resume ${resumeLesson.title}`}
          >
            <div className="resume-card-head">
              <span className="resume-kicker">Resume</span>
              <span className="resume-index">
                {String(resumeModuleIndex).padStart(2, '0')} &middot; {String(resumeLessonIndex).padStart(2, '0')}
              </span>
            </div>
            <span className="resume-module">{resumeModule.title}</span>
            <span className="resume-title">{resumeLesson.title}</span>
            <div className="resume-meta">
              <span>{resumeLesson.estimatedMinutes} MIN</span>
              <span className="resume-action">READ &rarr;</span>
            </div>
          </Link>
        )}
      </section>

      <section className="stat-strip">
        <div className="stat">
          <div className="stat-label">Modules</div>
          <div className="stat-num">{String(moduleCount).padStart(2, '0')}</div>
          <div className="stat-sub">Foundations &rarr; capstone</div>
        </div>
        <div className="stat">
          <div className="stat-label">Lessons</div>
          <div className="stat-num">{totalLessons}</div>
          <div className="stat-sub">{completedLessons} complete</div>
        </div>
        <div className="stat">
          <div className="stat-label">Harnesses</div>
          <div className="stat-num">{String(harnessCount).padStart(2, '0')}</div>
          <div className="stat-sub">Codex, Cowork, Open, Nemo, Hermes</div>
        </div>
        <div className="stat">
          <div className="stat-label">Diagrams</div>
          <div className="stat-num">{totalDiagrams}</div>
          <div className="stat-sub">Interactive flow canvases</div>
        </div>
      </section>

      <div className="section-header">
        <h2>Course path</h2>
        <p className="dek">Each module builds one layer. Take them in order, or jump to the harness you actually use.</p>
      </div>

      <div className="module-list">
        {course.modules.map((module, index) => {
          const lessons = lessonsForModule(course, module.id);
          const doneCount = lessons.filter((lesson) => completed.has(lesson.id)).length;
          const pct = lessons.length > 0 ? Math.round((doneCount / lessons.length) * 100) : 0;
          const firstLesson = lessons[0];
          const target = firstLesson ? lessonPath(module, firstLesson) : '/lessons';

          return (
            <Link className="module-row" to={target} key={module.id}>
              <div className="module-row-idx">{String(index + 1).padStart(2, '0')}</div>
              <div>
                <div className="module-row-title">{module.title}</div>
                <div className="module-row-summary">{module.summary}</div>
              </div>
              <div className="module-row-progress">
                <ProgressBar percent={pct} variant="thin" label={`${pct}% complete`} />
              </div>
              <div className="module-row-count">
                {doneCount}/{lessons.length}
              </div>
              <div className="module-row-arrow">
                <ArrowRight className="icon" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '—';
  }
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
