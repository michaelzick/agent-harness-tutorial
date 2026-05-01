import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { diagramById } from '../data/diagrams'
import type { Course, LessonSection } from '../types/course'
import { adjacentLessons, findLessonRef, findModuleForLesson, lessonPath } from '../lib/courseNavigation'
import { ReactFlowDiagram } from '../components/ReactFlowDiagram'
import { ComparisonTable } from '../components/ComparisonTable'
import { GoodBadExample } from '../components/GoodBadExample'
import { KeyConceptCallout } from '../components/KeyConceptCallout'
import { MistakeCallout } from '../components/MistakeCallout'
import { CapstoneProject } from '../components/CapstoneProject'
import { Checkpoint } from '../components/Checkpoint'
import { NextLessonButton } from '../components/NextLessonButton'
import { SetupGuide } from '../components/SetupGuide'
import { FeatureMatrix } from '../components/FeatureMatrix'
import { SkillRecipe } from '../components/SkillRecipe'
import { InterviewRubric } from '../components/InterviewRubric'
import { ImplementationLab } from '../components/ImplementationLab'
import { FileTemplate } from '../components/FileTemplate'
import { DecisionChecklist } from '../components/DecisionChecklist'
import { WorkflowGuide } from '../components/WorkflowGuide'

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
  const isComplete = completed.has(lesson.id)

  return (
    <div className="lesson-layout">
      <article className="lesson-main">
        <div className="lesson-kicker">
          <Link to="/lessons">
            <ArrowLeft className="icon" />
            Lesson path
          </Link>
          <span className={isComplete ? 'status done' : 'status'}>
            <CheckCircle2 className="icon" />
            {isComplete ? 'Complete' : 'In progress'}
          </span>
        </div>

        <header className="lesson-header">
          <span className="eyebrow">{module.title}</span>
          <h1>{lesson.title}</h1>
          <p>{lesson.summary}</p>
        </header>

        {diagram && <ReactFlowDiagram diagram={diagram} />}

        <section className="lesson-section">
          <h2>Learning objectives</h2>
          <ul>
            {lesson.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </section>

        {lesson.sections.map((section, index) => (
          <LessonSectionRenderer key={`${lesson.id}-${index}`} section={section} />
        ))}

        <section className="lesson-section">
          <h2>Practical example</h2>
          <p>{lesson.practicalExample}</p>
        </section>

        <section className="lesson-section">
          <h2>Harness-specific relevance</h2>
          <p>{lesson.harnessRelevance}</p>
        </section>

        <section className="lesson-section">
          <h2>Common mistakes</h2>
          <ul className="mistake-list">
            {lesson.commonMistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </section>

        <div className="lesson-footer-nav">
          {previous && previousModule ? (
            <Link className="secondary-button" to={lessonPath(previousModule, previous)}>
              <ArrowLeft className="icon" />
              Previous
            </Link>
          ) : (
            <span />
          )}
          <NextLessonButton course={course} next={next} />
        </div>
      </article>

      <aside className="lesson-side">
        <section className="side-card">
          <div className="panel-title">Key concepts</div>
          <div className="tag-list">
            {lesson.keyConcepts.map((concept) => (
              <span key={concept}>{concept}</span>
            ))}
          </div>
        </section>

        <section className="side-card">
          <div className="panel-title">Completion</div>
          <p>{lesson.estimatedMinutes} minute lesson</p>
          <button className="primary-button full-width" type="button" onClick={() => onComplete(lesson.id)}>
            <CheckCircle2 className="icon" />
            {isComplete ? 'Completed' : 'Mark complete'}
          </button>
        </section>

        <Checkpoint
          checkpoint={lesson.checkpoint}
          savedResult={checkpointResults[lesson.checkpoint.id]}
          onAnswer={(isCorrect) => onCheckpoint(lesson.checkpoint.id, isCorrect)}
        />
      </aside>
    </div>
  )
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
        audience={section.audience}
        outcome={section.outcome}
        requiredInputs={section.requiredInputs}
        steps={section.steps}
        harnessRoles={section.harnessRoles}
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
