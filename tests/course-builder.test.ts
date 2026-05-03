import { describe, expect, it } from 'vitest'
import { buildCourse, type LessonInput, type ModuleInput } from '../src/data/courseBuilder'
import { slugify } from '../src/lib/slug'
import type { LessonTrack } from '../src/types/course'

const baseLesson: LessonInput = {
  title: 'Getting Started',
  summary: 'Learn the basics.',
  objectives: ['Understand the setup.'],
  sections: [],
  keyConcepts: ['agent guardrails'],
  practicalExample: 'Set up a basic workflow.',
  harnessRelevance: 'All harnesses benefit from this.',
  commonMistakes: ['Skipping guardrails.'],
}

const baseModule: ModuleInput = {
  id: 'foundations',
  slug: 'foundations',
  title: 'Foundations',
  summary: 'Core concepts.',
  track: 'foundations',
  lessons: [baseLesson],
}

function singleModuleCourse(module: ModuleInput) {
  return buildCourse({ title: 'Test Course', summary: 'A test.', modules: [module] })
}

describe('buildCourse — lesson ID and slug', () => {
  it('generates a lesson ID as "{moduleId}-{slugifiedTitle}"', () => {
    const result = singleModuleCourse(baseModule)
    const expectedId = `foundations-${slugify('Getting Started')}`
    expect(result.lessons[0].id).toBe(expectedId)
  })

  it('generates a lesson slug from the title', () => {
    const result = singleModuleCourse(baseModule)
    expect(result.lessons[0].slug).toBe(slugify('Getting Started'))
  })
})

describe('buildCourse — module assembly', () => {
  it('populates lessonIds in the order lessons are declared', () => {
    const module: ModuleInput = {
      ...baseModule,
      lessons: [
        { ...baseLesson, title: 'Alpha lesson' },
        { ...baseLesson, title: 'Beta lesson' },
        { ...baseLesson, title: 'Gamma lesson' },
      ],
    }
    const result = singleModuleCourse(module)
    const ids = result.modules[0].lessonIds
    expect(ids).toHaveLength(3)
    expect(ids[0]).toContain(slugify('Alpha lesson'))
    expect(ids[1]).toContain(slugify('Beta lesson'))
    expect(ids[2]).toContain(slugify('Gamma lesson'))
  })

  it('produces a unique route key for every lesson within a module', () => {
    const module: ModuleInput = {
      ...baseModule,
      lessons: [
        { ...baseLesson, title: 'First lesson' },
        { ...baseLesson, title: 'Second lesson' },
      ],
    }
    const result = singleModuleCourse(module)
    const routeKeys = result.lessons.map((l) => `${result.modules[0].slug}/${l.slug}`)
    const uniqueKeys = new Set(routeKeys)
    expect(uniqueKeys.size).toBe(routeKeys.length)
  })
})

describe('buildCourse — track and harnessId inheritance', () => {
  it('inherits harnessId from the module when the lesson does not set one', () => {
    const module: ModuleInput = { ...baseModule, track: 'harness', harnessId: 'codex', lessons: [baseLesson] }
    const result = singleModuleCourse(module)
    expect(result.lessons[0].harnessId).toBe('codex')
  })

  it('uses a lesson-level harnessId over the module-level one', () => {
    const module: ModuleInput = {
      ...baseModule,
      track: 'harness',
      harnessId: 'codex',
      lessons: [{ ...baseLesson, harnessId: 'hermes' }],
    }
    const result = singleModuleCourse(module)
    expect(result.lessons[0].harnessId).toBe('hermes')
  })

  it('inherits track from the module when the lesson does not set one', () => {
    const module: ModuleInput = { ...baseModule, track: 'workflows', lessons: [baseLesson] }
    const result = singleModuleCourse(module)
    expect(result.lessons[0].track).toBe('workflows')
  })

  it('uses a lesson-level track over the module-level one', () => {
    const module: ModuleInput = {
      ...baseModule,
      track: 'foundations',
      lessons: [{ ...baseLesson, track: 'cto' }],
    }
    const result = singleModuleCourse(module)
    expect(result.lessons[0].track).toBe('cto')
  })
})

describe('buildCourse — auto-generated checkpoint', () => {
  it('creates a checkpoint ID as "{lessonId}-checkpoint"', () => {
    const result = singleModuleCourse(baseModule)
    const lesson = result.lessons[0]
    expect(lesson.checkpoint.id).toBe(`${lesson.id}-checkpoint`)
  })

  it('generates a checkpoint prompt that contains the lesson title', () => {
    const result = singleModuleCourse(baseModule)
    expect(result.lessons[0].checkpoint.prompt).toContain('Getting Started')
  })

  it('generates exactly 3 options with one correct answer', () => {
    const result = singleModuleCourse(baseModule)
    const { options } = result.lessons[0].checkpoint
    expect(options).toHaveLength(3)
    expect(options.filter((o) => o.isCorrect)).toHaveLength(1)
  })

  it('preserves a user-supplied checkpoint unchanged', () => {
    const customCheckpoint = {
      id: 'custom-checkpoint',
      prompt: 'Custom question?',
      options: [{ id: 'opt-a', text: 'Answer A', isCorrect: true, explanation: 'Correct.' }],
    }
    const module: ModuleInput = { ...baseModule, lessons: [{ ...baseLesson, checkpoint: customCheckpoint }] }
    const result = singleModuleCourse(module)
    expect(result.lessons[0].checkpoint).toEqual(customCheckpoint)
  })
})

describe('buildCourse — estimatedMinutes defaults by track', () => {
  function minutesForTrack(track: LessonTrack): number {
    const module: ModuleInput = {
      id: `test-${track}`,
      slug: `test-${track}`,
      title: `Test ${track}`,
      summary: 'S',
      track,
      lessons: [{ ...baseLesson, title: `Lesson ${track}` }],
    }
    return singleModuleCourse(module).lessons[0].estimatedMinutes
  }

  it('returns 28 minutes for cto and enterprise tracks', () => {
    expect(minutesForTrack('cto')).toBe(28)
    expect(minutesForTrack('enterprise')).toBe(28)
  })

  it('returns 35 minutes for capstone track', () => {
    expect(minutesForTrack('capstone')).toBe(35)
  })

  it('returns 30 minutes for workflows track', () => {
    expect(minutesForTrack('workflows')).toBe(30)
  })

  it('returns 24 minutes for harness, skills, and agent-files tracks', () => {
    expect(minutesForTrack('harness')).toBe(24)
    expect(minutesForTrack('skills')).toBe(24)
    expect(minutesForTrack('agent-files')).toBe(24)
  })

  it('returns 18 minutes for foundations, comparison, and personal tracks', () => {
    expect(minutesForTrack('foundations')).toBe(18)
    expect(minutesForTrack('comparison')).toBe(18)
    expect(minutesForTrack('personal')).toBe(18)
  })

  it('preserves a lesson-level estimatedMinutes override', () => {
    const module: ModuleInput = { ...baseModule, lessons: [{ ...baseLesson, estimatedMinutes: 45 }] }
    const result = singleModuleCourse(module)
    expect(result.lessons[0].estimatedMinutes).toBe(45)
  })
})

describe('buildCourse — difficulty defaults by track', () => {
  function difficultyForTrack(track: LessonTrack): string {
    const module: ModuleInput = {
      id: `diff-${track}`,
      slug: `diff-${track}`,
      title: `Diff ${track}`,
      summary: 'S',
      track,
      lessons: [{ ...baseLesson, title: `Diff lesson ${track}` }],
    }
    return singleModuleCourse(module).lessons[0].difficulty ?? ''
  }

  it('returns "executive" for cto track', () => {
    expect(difficultyForTrack('cto')).toBe('executive')
  })

  it('returns "advanced" for enterprise track', () => {
    expect(difficultyForTrack('enterprise')).toBe('advanced')
  })

  it('returns "practitioner" for harness, skills, agent-files, capstone, and workflows tracks', () => {
    expect(difficultyForTrack('harness')).toBe('practitioner')
    expect(difficultyForTrack('skills')).toBe('practitioner')
    expect(difficultyForTrack('agent-files')).toBe('practitioner')
    expect(difficultyForTrack('capstone')).toBe('practitioner')
    expect(difficultyForTrack('workflows')).toBe('practitioner')
  })

  it('returns "foundation" for foundations, comparison, and personal tracks', () => {
    expect(difficultyForTrack('foundations')).toBe('foundation')
    expect(difficultyForTrack('comparison')).toBe('foundation')
    expect(difficultyForTrack('personal')).toBe('foundation')
  })
})
