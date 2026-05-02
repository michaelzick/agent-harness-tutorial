import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { diagramById } from '../data/diagrams'
import type { Course, LessonSection } from '../types/course'
import {
  adjacentLessons,
  findLessonRef,
  findModuleForLesson,
  lessonPath,
  lessonsForModule,
} from '../lib/courseNavigation'
import { slugify } from '../lib/slug'
import { ReactFlowDiagram } from '../components/ReactFlowDiagram'
import { ComparisonTable } from '../components/ComparisonTable'
import { GoodBadExample } from '../components/GoodBadExample'
import { KeyConceptCallout } from '../components/KeyConceptCallout'
import { MistakeCallout } from '../components/MistakeCallout'
import { CapstoneProject } from '../components/CapstoneProject'
import { Checkpoint } from '../components/Checkpoint'
import { SetupGuide } from '../components/SetupGuide'
import { FeatureMatrix } from '../components/FeatureMatrix'
import { SkillRecipe } from '../components/SkillRecipe'
import { InterviewRubric } from '../components/InterviewRubric'
import { ImplementationLab } from '../components/ImplementationLab'
import { FileTemplate } from '../components/FileTemplate'
import { DecisionChecklist } from '../components/DecisionChecklist'
import { WorkflowGuide } from '../components/WorkflowGuide'

const PRACTICAL_EXAMPLE = 'Practical example'
const HARNESS_RELEVANCE = 'Harness-specific relevance'
const COMMON_MISTAKES = 'Common mistakes'

type TocItem = { title: string; slug: string }

export function LessonPage({
  course,
  completed,
  checkpointResults,
  onVisit,
  onComplete,
  onCheckpoint,
}: {
  course: Course
  completed: Set<string>
  checkpointResults: Record<string, boolean>
  onVisit: (lessonId: string) => void
  onComplete: (lessonId: string) => void
  onCheckpoint: (checkpointId: string, isCorrect: boolean) => void
}) {
  const { moduleSlug, lessonSlug } = useParams()
  const ref = findLessonRef(course, moduleSlug, lessonSlug)

  const lessonId = ref?.lesson.id

  useEffect(() => {
    if (lessonId) {
      onVisit(lessonId)
    }
  }, [onVisit, lessonId])

  if (!ref) {
    return <Navigate to="/lessons" replace />
  }

  const { lesson, module } = ref
  const diagram = lesson.diagramId ? diagramById.get(lesson.diagramId) : null
  const { previous, next } = adjacentLessons(course, lesson)
  const previousModule = previous ? findModuleForLesson(course, previous) : null
  const nextModule = next ? findModuleForLesson(course, next) : null
  const isComplete = completed.has(lesson.id)

  const moduleIndex = course.modules.findIndex((candidate) => candidate.id === module.id) + 1
  const moduleLessons = lessonsForModule(course, module.id)
  const lessonIndex = moduleLessons.findIndex((candidate) => candidate.id === lesson.id) + 1
  const moduleProgressDone = moduleLessons.filter((candidate) => completed.has(candidate.id)).length

  const tocItems = collectTocItems(lesson)

  return (
    <div className="page-stack">
      <div className="top-bar">
        <span className="crumbs">
          Lessons / Module {String(moduleIndex).padStart(2, '0')} / {String(lessonIndex).padStart(2, '0')}
        </span>
        <span className="top-meta">
          {lesson.estimatedMinutes} MIN · {isComplete ? 'COMPLETE' : 'IN PROGRESS'}
        </span>
      </div>

      <div className="lesson-layout">
        <article className="lesson-main">
          <header className="lesson-header">
            <span className="eyebrow">
              Module {String(moduleIndex).padStart(2, '0')} · {module.title}
            </span>
            <h1>{lesson.title}</h1>
            <p>{lesson.summary}</p>
          </header>

          {lesson.objectives.length > 0 && (
            <section className="lesson-objectives">
              <div className="lesson-objectives-label">Objectives</div>
              <ol>
                {lesson.objectives.map((objective, index) => (
                  <li key={objective}>
                    <span className="lesson-objectives-num">{String(index + 1).padStart(2, '0')}</span>
                    <span className="lesson-objectives-text">{objective}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {diagram && (
            <section className="diagram-panel">
              <div className="diagram-header">
                <h2>{diagram.title}</h2>
              </div>
              <ReactFlowDiagram diagram={diagram} />
            </section>
          )}

          {lesson.sections.map((section, index) => {
            const heading = sectionHeading(section)
            const id = heading ? slugify(heading) : undefined
            return (
              <div id={id} key={`${lesson.id}-${index}`} className="lesson-section-anchor">
                <LessonSectionRenderer section={section} />
              </div>
            )
          })}

          <section className="lesson-section" id={slugify(PRACTICAL_EXAMPLE)}>
            <h2>{PRACTICAL_EXAMPLE}</h2>
            <p>{lesson.practicalExample}</p>
          </section>

          <section className="lesson-section" id={slugify(HARNESS_RELEVANCE)}>
            <h2>{HARNESS_RELEVANCE}</h2>
            <p>{lesson.harnessRelevance}</p>
          </section>

          {lesson.commonMistakes.length > 0 && (
            <section className="lesson-section" id={slugify(COMMON_MISTAKES)}>
              <h2>{COMMON_MISTAKES}</h2>
              <ul className="mistake-list">
                {lesson.commonMistakes.map((mistake) => (
                  <li key={mistake}>{mistake}</li>
                ))}
              </ul>
            </section>
          )}

          <nav className="lesson-footer-nav" aria-label="Lesson navigation">
            {previous && previousModule ? (
              <Link to={lessonPath(previousModule, previous)} className="prev">
                <span className="kicker">Previous</span>
                <span className="title">{previous.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && nextModule ? (
              <Link to={lessonPath(nextModule, next)} className="next">
                <span className="kicker">Next &rarr;</span>
                <span className="title">{next.title}</span>
              </Link>
            ) : (
              <Link to="/lessons" className="next">
                <span className="kicker">Done &rarr;</span>
                <span className="title">Review course</span>
              </Link>
            )}
          </nav>
        </article>

        <aside className="lesson-side">
          {tocItems.length > 0 && (
            <LessonToc key={lesson.id} items={tocItems} />
          )}

          {lesson.keyConcepts.length > 0 && (
            <div className="side-rail-block">
              <div className="side-rail-label">Key concepts</div>
              <div className="tag-list">
                {lesson.keyConcepts.map((concept) => (
                  <span key={concept}>{concept}</span>
                ))}
              </div>
            </div>
          )}

          <div className="side-rail-block">
            <div className="side-rail-label">Module progress</div>
            <p>
              {moduleProgressDone} of {moduleLessons.length} lessons complete in {module.title}.
            </p>
            <button
              className="primary-button full-width"
              type="button"
              onClick={() => onComplete(lesson.id)}
            >
              {isComplete ? 'Completed' : 'Mark complete'}
            </button>
          </div>

          <Checkpoint
            checkpoint={lesson.checkpoint}
            savedResult={checkpointResults[lesson.checkpoint.id]}
            onAnswer={(isCorrect) => onCheckpoint(lesson.checkpoint.id, isCorrect)}
          />
        </aside>
      </div>
    </div>
  )
}

function LessonToc({ items }: { items: TocItem[] }) {
  const [activeSlug, setActiveSlug] = useState<string>(items[0]?.slug ?? '')

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, slug: string) {
    const target = document.getElementById(slug)
    if (!target) {
      return
    }
    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', `#${slug}`)
    setActiveSlug(slug)
  }

  return (
    <div className="side-rail-block">
      <div className="side-rail-label">On this page</div>
      <nav className="toc" aria-label="On this page">
        {items.map((item) => (
          <a
            key={item.slug}
            href={`#${item.slug}`}
            className={item.slug === activeSlug ? 'active' : undefined}
            onClick={(event) => handleClick(event, item.slug)}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  )
}

function collectTocItems(lesson: {
  sections: LessonSection[]
  practicalExample: string
  harnessRelevance: string
  commonMistakes: string[]
}): TocItem[] {
  const items: TocItem[] = []
  const seen = new Set<string>()

  function push(title: string | null) {
    if (!title) {
      return
    }
    const slug = slugify(title)
    if (!slug || seen.has(slug)) {
      return
    }
    seen.add(slug)
    items.push({ title, slug })
  }

  lesson.sections.forEach((section) => push(sectionHeading(section)))
  if (lesson.practicalExample) {
    push(PRACTICAL_EXAMPLE)
  }
  if (lesson.harnessRelevance) {
    push(HARNESS_RELEVANCE)
  }
  if (lesson.commonMistakes.length > 0) {
    push(COMMON_MISTAKES)
  }

  return items
}

function sectionHeading(section: LessonSection): string | null {
  if (section.kind === 'text') return section.heading
  if (section.kind === 'callout') return section.title
  if (section.kind === 'comparison') return section.title
  if (section.kind === 'goodBad') return section.title
  if (section.kind === 'prompt') return section.title
  if (section.kind === 'capstone') return section.goal
  if (section.kind === 'setupGuide') return section.title
  if (section.kind === 'featureMatrix') return section.title
  if (section.kind === 'skillRecipe') return section.title
  if (section.kind === 'interviewRubric') return section.title
  if (section.kind === 'implementationLab') return section.title
  if (section.kind === 'fileTemplate') return section.title
  if (section.kind === 'decisionChecklist') return section.title
  if (section.kind === 'workflowGuide') return section.title
  return null
}

function LessonSectionRenderer({ section }: { section: LessonSection }) {
  if (section.kind === 'text') {
    return (
      <section className="lesson-section">
        <h2>{section.heading}</h2>
        <p>{section.body}</p>
        {section.bullets && (
          <ul>
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
      </section>
    )
  }

  if (section.kind === 'callout') {
    return section.variant === 'mistake' ? (
      <MistakeCallout title={section.title} body={section.body} bullets={section.bullets} />
    ) : (
      <KeyConceptCallout title={section.title} body={section.body} bullets={section.bullets} />
    )
  }

  if (section.kind === 'comparison') {
    return <ComparisonTable title={section.title} columns={section.columns} rows={section.rows} note={section.note} />
  }

  if (section.kind === 'goodBad') {
    return (
      <GoodBadExample
        title={section.title}
        badTitle={section.badTitle}
        bad={section.bad}
        goodTitle={section.goodTitle}
        good={section.good}
        takeaways={section.takeaways}
      />
    )
  }

  if (section.kind === 'prompt') {
    return (
      <section className="lesson-section">
        <h2>{section.title}</h2>
        <pre className="prompt-block">{section.body}</pre>
      </section>
    )
  }

  if (section.kind === 'capstone') {
    return <CapstoneProject section={section} />
  }

  if (section.kind === 'setupGuide') {
    return <SetupGuide title={section.title} intro={section.intro} steps={section.steps} sourceNote={section.sourceNote} />
  }

  if (section.kind === 'featureMatrix') {
    return <FeatureMatrix title={section.title} rows={section.rows} note={section.note} />
  }

  if (section.kind === 'skillRecipe') {
    return (
      <SkillRecipe
        title={section.title}
        useCase={section.useCase}
        trigger={section.trigger}
        filePath={section.filePath}
        template={section.template}
        reviewChecklist={section.reviewChecklist}
        safetyNotes={section.safetyNotes}
      />
    )
  }

  if (section.kind === 'interviewRubric') {
    return (
      <InterviewRubric
        title={section.title}
        prompt={section.prompt}
        strongSignals={section.strongSignals}
        weakSignals={section.weakSignals}
        followUps={section.followUps}
      />
    )
  }

  if (section.kind === 'implementationLab') {
    return (
      <ImplementationLab
        title={section.title}
        scenario={section.scenario}
        steps={section.steps}
        deliverables={section.deliverables}
        verification={section.verification}
        failureModes={section.failureModes}
      />
    )
  }

  if (section.kind === 'fileTemplate') {
    return (
      <FileTemplate
        title={section.title}
        path={section.path}
        purpose={section.purpose}
        template={section.template}
        notes={section.notes}
      />
    )
  }

  if (section.kind === 'workflowGuide') {
    return (
      <WorkflowGuide
        title={section.title}
        harnessName={section.harnessName}
        audience={section.audience}
        outcome={section.outcome}
        requiredInputs={section.requiredInputs}
        steps={section.steps}
        operatingGuidance={section.operatingGuidance}
        safetyGates={section.safetyGates}
        followUpCadence={section.followUpCadence}
        successMetrics={section.successMetrics}
        technicalDeepDive={section.technicalDeepDive}
        sourceNote={section.sourceNote}
      />
    )
  }

  return <DecisionChecklist title={section.title} intro={section.intro} items={section.items} />
}
