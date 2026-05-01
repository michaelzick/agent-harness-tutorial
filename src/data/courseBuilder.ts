import { slugify } from '../lib/slug'
import type {
  Checkpoint,
  Course,
  CourseModule,
  HarnessId,
  Lesson,
  LessonDifficulty,
  LessonSection,
  LessonTrack,
} from '../types/course'

export type LessonInput = {
  title: string
  summary: string
  estimatedMinutes?: number
  objectives: string[]
  sections: LessonSection[]
  keyConcepts: string[]
  practicalExample: string
  harnessRelevance: string
  commonMistakes: string[]
  diagramId?: string
  harnessId?: HarnessId
  track?: LessonTrack
  difficulty?: LessonDifficulty
  checkpoint?: Checkpoint
}

export type ModuleInput = {
  id: string
  slug: string
  title: string
  summary: string
  track: LessonTrack
  harnessId?: HarnessId
  lessons: LessonInput[]
}

export function buildCourse(input: { title: string; summary: string; modules: ModuleInput[] }): Course {
  const lessons: Lesson[] = input.modules.flatMap((module) =>
    module.lessons.map((lessonInput) => {
      const slug = slugify(lessonInput.title)
      const lesson: Lesson = {
        id: `${module.id}-${slug}`,
        slug,
        moduleId: module.id,
        harnessId: lessonInput.harnessId ?? module.harnessId,
        track: lessonInput.track ?? module.track,
        difficulty: lessonInput.difficulty ?? difficultyForTrack(module.track),
        title: lessonInput.title,
        summary: lessonInput.summary,
        estimatedMinutes: lessonInput.estimatedMinutes ?? minutesForTrack(module.track),
        objectives: lessonInput.objectives,
        sections: lessonInput.sections,
        keyConcepts: lessonInput.keyConcepts,
        practicalExample: lessonInput.practicalExample,
        harnessRelevance: lessonInput.harnessRelevance,
        commonMistakes: lessonInput.commonMistakes,
        checkpoint:
          lessonInput.checkpoint ??
          createCheckpoint(`${module.id}-${slug}`, lessonInput.title, lessonInput.keyConcepts[0] ?? 'agentic automation'),
        diagramId: lessonInput.diagramId,
      }
      return lesson
    }),
  )

  const modules: CourseModule[] = input.modules.map((module) => ({
    id: module.id,
    slug: module.slug,
    track: module.track,
    harnessId: module.harnessId,
    title: module.title,
    summary: module.summary,
    lessonIds: lessons.filter((lesson) => lesson.moduleId === module.id).map((lesson) => lesson.id),
  }))

  return {
    title: input.title,
    summary: input.summary,
    modules,
    lessons,
  }
}

function minutesForTrack(track: LessonTrack) {
  if (track === 'cto' || track === 'enterprise') return 28
  if (track === 'capstone') return 35
  if (track === 'workflows') return 30
  if (track === 'harness' || track === 'skills' || track === 'agent-files') return 24
  return 18
}

function difficultyForTrack(track: LessonTrack): LessonDifficulty {
  if (track === 'cto') return 'executive'
  if (track === 'enterprise') return 'advanced'
  if (track === 'harness' || track === 'skills' || track === 'agent-files' || track === 'capstone' || track === 'workflows') {
    return 'practitioner'
  }
  return 'foundation'
}

function createCheckpoint(lessonId: string, title: string, concept: string): Checkpoint {
  return {
    id: `${lessonId}-checkpoint`,
    prompt: `What is the strongest operational takeaway from "${title}"?`,
    options: [
      {
        id: `${lessonId}-correct`,
        text: `Turn ${concept} into explicit context, permissions, checks, and a stopping rule before increasing autonomy.`,
        isCorrect: true,
        explanation:
          'Correct. Serious agentic automation is designed around boundaries, verification, and escalation, not a vague request for autonomy.',
      },
      {
        id: `${lessonId}-broad`,
        text: 'Give the agent broad access and let it discover the right workflow by trial and error.',
        isCorrect: false,
        explanation:
          'That may work in a toy setting, but it is not a reliable operating model for workstation or enterprise automation.',
      },
      {
        id: `${lessonId}-manual`,
        text: 'Avoid agents entirely and force every step into a deterministic script.',
        isCorrect: false,
        explanation:
          'Deterministic scripts are valuable, but this course focuses on the cases where judgment, tool use, and feedback loops are useful.',
      },
    ],
  }
}
