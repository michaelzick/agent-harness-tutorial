import type { Edge, Node } from '@xyflow/react'

export type SectionKind =
  | 'text'
  | 'callout'
  | 'comparison'
  | 'goodBad'
  | 'prompt'
  | 'capstone'
  | 'setupGuide'
  | 'featureMatrix'
  | 'skillRecipe'
  | 'interviewRubric'
  | 'implementationLab'
  | 'fileTemplate'
  | 'decisionChecklist'
  | 'workflowGuide'

export type CalloutVariant = 'concept' | 'mistake' | 'assumption'
export type HarnessId = 'codex' | 'claude-cowork' | 'openclaw' | 'nemoclaw' | 'hermes'
export type LessonTrack =
  | 'foundations'
  | 'comparison'
  | 'harness'
  | 'agent-files'
  | 'skills'
  | 'workflows'
  | 'personal'
  | 'enterprise'
  | 'cto'
  | 'capstone'
export type LessonDifficulty = 'foundation' | 'practitioner' | 'advanced' | 'executive'

export interface SetupStep {
  title: string
  body: string
  commands?: string[]
  verify?: string[]
  warnings?: string[]
}

export interface FeatureMatrixRow {
  feature: string
  codex: string
  claudeCowork: string
  openclaw: string
  nemoclaw: string
  hermes: string
}

export interface WorkflowStep {
  title: string
  plainEnglish: string
  examplePrompt: string
  harnessAction: string
}

export interface WorkflowMetric {
  label: string
  target: string
}

export type LessonSection =
  | {
      kind: 'text'
      heading: string
      body: string
      bullets?: string[]
    }
  | {
      kind: 'callout'
      variant: CalloutVariant
      title: string
      body: string
      bullets?: string[]
    }
  | {
      kind: 'comparison'
      title: string
      columns: string[]
      rows: string[][]
      note?: string
    }
  | {
      kind: 'goodBad'
      title: string
      badTitle: string
      bad: string
      goodTitle: string
      good: string
      takeaways: string[]
    }
  | {
      kind: 'prompt'
      title: string
      body: string
      whereToUse?: string
      whatHappensNext?: string[]
      whyThisShape?: string
      tryThis?: string
    }
  | {
      kind: 'capstone'
      goal: string
      scenario: string
      requiredContext: string[]
      instructions: string[]
      expectedOutput: string[]
      evaluationChecklist: string[]
      commonFailureModes: string[]
      suggestedImprovements: string[]
    }
  | {
      kind: 'setupGuide'
      title: string
      intro: string
      steps: SetupStep[]
      sourceNote?: string
    }
  | {
      kind: 'featureMatrix'
      title: string
      rows: FeatureMatrixRow[]
      note?: string
    }
  | {
      kind: 'skillRecipe'
      title: string
      useCase: string
      trigger: string
      filePath: string
      template: string
      reviewChecklist: string[]
      safetyNotes: string[]
    }
  | {
      kind: 'interviewRubric'
      title: string
      prompt: string
      strongSignals: string[]
      weakSignals: string[]
      followUps: string[]
    }
  | {
      kind: 'implementationLab'
      title: string
      scenario: string
      steps: string[]
      deliverables: string[]
      verification: string[]
      failureModes: string[]
    }
  | {
      kind: 'fileTemplate'
      title: string
      path: string
      purpose: string
      template: string
      notes: string[]
    }
  | {
      kind: 'decisionChecklist'
      title: string
      intro: string
      items: string[]
    }
  | {
      kind: 'workflowGuide'
      title: string
      harnessName: string
      audience: string
      outcome: string
      requiredInputs: string[]
      steps: WorkflowStep[]
      operatingGuidance: string[]
      safetyGates: string[]
      followUpCadence: string[]
      successMetrics: WorkflowMetric[]
      technicalDeepDive: string[]
      sourceNote?: string
    }

export interface CheckpointOption {
  id: string
  text: string
  isCorrect: boolean
  explanation: string
}

export interface Checkpoint {
  id: string
  prompt: string
  options: CheckpointOption[]
}

export interface Lesson {
  id: string
  slug: string
  moduleId: string
  harnessId?: HarnessId
  track?: LessonTrack
  difficulty?: LessonDifficulty
  title: string
  summary: string
  estimatedMinutes: number
  objectives: string[]
  sections: LessonSection[]
  keyConcepts: string[]
  practicalExample: string
  harnessRelevance: string
  commonMistakes: string[]
  checkpoint: Checkpoint
  diagramId?: string
}

export interface CourseModule {
  id: string
  slug: string
  track?: LessonTrack
  harnessId?: HarnessId
  title: string
  summary: string
  lessonIds: string[]
}

export interface Course {
  title: string
  summary: string
  modules: CourseModule[]
  lessons: Lesson[]
}

export interface ProgressState {
  completedLessonIds: string[]
  currentLessonId: string | null
  currentModuleId: string | null
  checkpointResults: Record<string, boolean>
  lastVisitedAt: string
}

export interface DiagramDefinition {
  id: string
  title: string
  summary: string
  nodes: Node[]
  edges: Edge[]
}

export interface LessonRef {
  lesson: Lesson
  module: CourseModule
}
