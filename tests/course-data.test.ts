import { describe, expect, it } from 'vitest'
import { course } from '../src/data/course'
import { diagramById } from '../src/data/diagrams'

describe('course data integrity', () => {
  it('has valid module and route references for every lesson', () => {
    const moduleIds = new Set(course.modules.map((module) => module.id))
    const routeKeys = new Set<string>()

    for (const lesson of course.lessons) {
      expect(moduleIds.has(lesson.moduleId)).toBe(true)
      const module = course.modules.find((candidate) => candidate.id === lesson.moduleId)
      expect(module?.lessonIds).toContain(lesson.id)
      const routeKey = `${module?.slug}/${lesson.slug}`
      expect(routeKeys.has(routeKey)).toBe(false)
      routeKeys.add(routeKey)
    }
  })

  it('references only existing diagrams', () => {
    for (const lesson of course.lessons) {
      if (lesson.diagramId) {
        expect(diagramById.has(lesson.diagramId), `${lesson.title} references ${lesson.diagramId}`).toBe(true)
      }
    }
  })

  it('gives every harness section setup and reusable operating content', () => {
    const harnessModules = course.modules.filter((module) => module.harnessId)

    expect(harnessModules).toHaveLength(5)

    for (const module of harnessModules) {
      const lessons = course.lessons.filter((lesson) => lesson.moduleId === module.id)
      const sections = lessons.flatMap((lesson) => lesson.sections)

      expect(sections.some((section) => section.kind === 'setupGuide'), module.title).toBe(true)
      expect(
        sections.some(
          (section) =>
            section.kind === 'skillRecipe' ||
            section.kind === 'fileTemplate' ||
            section.kind === 'comparison' ||
            section.kind === 'decisionChecklist',
        ),
        module.title,
      ).toBe(true)
    }
  })

  it('includes CTO, marketplace, and agent-file curriculum', () => {
    expect(course.modules.some((module) => module.track === 'cto')).toBe(true)
    expect(course.modules.some((module) => module.track === 'skills')).toBe(true)
    expect(course.modules.some((module) => module.track === 'workflows')).toBe(true)
    expect(course.modules.some((module) => module.track === 'agent-files')).toBe(true)

    expect(course.lessons.some((lesson) => lesson.title.includes('Marketplace'))).toBe(true)
    expect(course.lessons.some((lesson) => lesson.title.includes('Interview'))).toBe(true)
    expect(course.lessons.some((lesson) => lesson.title.includes('AGENTS.md'))).toBe(true)
  })

  it('includes beginner and technical workflow guidance for every workflow lesson', () => {
    const workflowLessons = course.lessons.filter((lesson) => lesson.track === 'workflows')

    expect(workflowLessons.length).toBeGreaterThanOrEqual(6)

    for (const lesson of workflowLessons) {
      const workflowSections = lesson.sections.filter((section) => section.kind === 'workflowGuide')

      expect(workflowSections.length, lesson.title).toBeGreaterThan(0)

      for (const section of workflowSections) {
        expect(section.steps.length, lesson.title).toBeGreaterThanOrEqual(5)
        expect(section.requiredInputs.length, lesson.title).toBeGreaterThanOrEqual(4)
        expect(section.technicalDeepDive.length, lesson.title).toBeGreaterThanOrEqual(4)
        expect(section.safetyGates.some((gate) => gate.toLowerCase().includes('approval')), lesson.title).toBe(true)
      }
    }
  })
})
