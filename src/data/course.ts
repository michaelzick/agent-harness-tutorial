import { capstoneModules } from './capstones'
import { buildCourse } from './courseBuilder'
import { contextModules } from './contextModules'
import { foundationModules } from './foundations'
import { harnessModules } from './harnessModules'
import { workflowModules } from './workflows'

export const course = buildCourse({
  title: 'Agent Harness Tutorial',
  summary:
    'A practical course on designing, installing, governing, and evaluating agentic automation with Codex, Claude Cowork, OpenClaw, NemoClaw, and Hermes.',
  modules: [...foundationModules, ...harnessModules, ...contextModules, ...workflowModules, ...capstoneModules],
})

export const lessonById = new Map(course.lessons.map((lesson) => [lesson.id, lesson]))
export const moduleById = new Map(course.modules.map((module) => [module.id, module]))
