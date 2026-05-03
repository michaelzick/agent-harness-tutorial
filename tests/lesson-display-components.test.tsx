import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ComparisonTable } from '../src/components/ComparisonTable'
import { GoodBadExample } from '../src/components/GoodBadExample'
import { HarnessComparison } from '../src/components/HarnessComparison'
import { KeyConceptCallout } from '../src/components/KeyConceptCallout'
import { LessonCard } from '../src/components/LessonCard'
import { MistakeCallout } from '../src/components/MistakeCallout'
import { ModuleOverview } from '../src/components/ModuleOverview'
import { NextLessonButton } from '../src/components/NextLessonButton'
import { course } from '../src/data/course'
import { findModuleForLesson } from '../src/lib/courseNavigation'

describe('LessonCard', () => {
  const lesson = course.lessons[0]
  const module = findModuleForLesson(course, lesson)
  if (!module) throw new Error('missing module for first lesson')

  it('renders the title, summary, and 1-based index', () => {
    render(
      <MemoryRouter>
        <LessonCard module={module} lesson={lesson} index={0} isComplete={false} />
      </MemoryRouter>,
    )
    expect(screen.getByText(lesson.title)).toBeInTheDocument()
    expect(screen.getByText(lesson.summary)).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('shows estimated minutes when the lesson is not complete', () => {
    render(
      <MemoryRouter>
        <LessonCard module={module} lesson={lesson} index={0} isComplete={false} />
      </MemoryRouter>,
    )
    expect(screen.getByText(`${lesson.estimatedMinutes} min`)).toBeInTheDocument()
  })

  it('shows "Complete" when isComplete is true', () => {
    render(
      <MemoryRouter>
        <LessonCard module={module} lesson={lesson} index={0} isComplete={true} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Complete')).toBeInTheDocument()
  })

  it('links to the correct lesson path', () => {
    render(
      <MemoryRouter>
        <LessonCard module={module} lesson={lesson} index={0} isComplete={false} />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe(`/learn/${module.slug}/${lesson.slug}`)
  })
})

describe('NextLessonButton', () => {
  it('renders a "Review course" link to /lessons when next is null', () => {
    render(
      <MemoryRouter>
        <NextLessonButton course={course} next={null} />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: /Review course/i })
    expect(link.getAttribute('href')).toBe('/lessons')
  })

  it('renders a "Next lesson" link to the correct path when a next lesson exists', () => {
    const next = course.lessons[1]
    const nextModule = findModuleForLesson(course, next)
    if (!nextModule) throw new Error('missing module for second lesson')
    render(
      <MemoryRouter>
        <NextLessonButton course={course} next={next} />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: /Next lesson/i })
    expect(link.getAttribute('href')).toBe(`/learn/${nextModule.slug}/${next.slug}`)
  })
})

describe('KeyConceptCallout', () => {
  it('renders the title and body', () => {
    render(<KeyConceptCallout title="Key principle" body="Always define guardrails first." />)
    expect(screen.getByRole('heading', { name: 'Key principle' })).toBeInTheDocument()
    expect(screen.getByText('Always define guardrails first.')).toBeInTheDocument()
  })

  it('renders a bullet list when bullets are provided', () => {
    render(<KeyConceptCallout title="T" body="B" bullets={['Alpha', 'Beta']} />)
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
  })

  it('renders no list when bullets are omitted', () => {
    render(<KeyConceptCallout title="T" body="B" />)
    expect(screen.queryByRole('list')).toBeNull()
  })
})

describe('MistakeCallout', () => {
  it('renders the title and body', () => {
    render(<MistakeCallout title="Common mistake" body="Never skip approval gates." />)
    expect(screen.getByRole('heading', { name: 'Common mistake' })).toBeInTheDocument()
    expect(screen.getByText('Never skip approval gates.')).toBeInTheDocument()
  })

  it('renders a bullet list when bullets are provided', () => {
    render(<MistakeCallout title="T" body="B" bullets={['Issue 1', 'Issue 2']} />)
    expect(screen.getByText('Issue 1')).toBeInTheDocument()
    expect(screen.getByText('Issue 2')).toBeInTheDocument()
  })

  it('renders no list when bullets are omitted', () => {
    render(<MistakeCallout title="T" body="B" />)
    expect(screen.queryByRole('list')).toBeNull()
  })
})

describe('GoodBadExample', () => {
  it('renders weak and better cards with title, labels, content, and takeaways', () => {
    render(
      <GoodBadExample
        title="Prompt comparison"
        badTitle="Vague prompt"
        bad="Do the thing."
        goodTitle="Specific prompt"
        good="List every open PR approved by @alice."
        takeaways={['Be specific.', 'Name the actor.']}
      />,
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Prompt comparison' })).toBeInTheDocument()
    expect(screen.getByText('Weak')).toBeInTheDocument()
    expect(screen.getByText('Better')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Vague prompt' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Specific prompt' })).toBeInTheDocument()
    expect(screen.getByText('Be specific.')).toBeInTheDocument()
    expect(screen.getByText('Name the actor.')).toBeInTheDocument()
  })
})

describe('ComparisonTable', () => {
  it('renders the title, column headers, and row data', () => {
    render(
      <ComparisonTable
        title="Harness table"
        columns={['Name', 'Strength']}
        rows={[
          ['Codex', 'Code editing'],
          ['Hermes', 'Workflow automation'],
        ]}
      />,
    )
    expect(screen.getByRole('heading', { name: 'Harness table' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Strength' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Codex' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Workflow automation' })).toBeInTheDocument()
  })

  it('renders the optional note when provided', () => {
    render(<ComparisonTable title="T" columns={['A']} rows={[['a']]} note="Use with care." />)
    expect(screen.getByText('Use with care.')).toBeInTheDocument()
  })

  it('renders no note paragraph when note is omitted', () => {
    render(<ComparisonTable title="T" columns={['A']} rows={[['a']]} />)
    expect(screen.queryByText('Use with care.')).toBeNull()
  })
})

describe('ModuleOverview', () => {
  it('renders the module title, lesson count eyebrow, and correct progress ratio', () => {
    const module = course.modules.find((m) => m.lessonIds.length > 1)
    if (!module) throw new Error('expected a multi-lesson module')
    const completed = new Set([module.lessonIds[0]])

    render(<ModuleOverview course={course} module={module} completed={completed} />)

    expect(screen.getByRole('heading', { level: 2, name: module.title })).toBeInTheDocument()
    expect(screen.getByText(`${module.lessonIds.length} lessons`)).toBeInTheDocument()

    const expected = Math.round((1 / module.lessonIds.length) * 100)
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe(String(expected))
  })

  it('shows 0% progress when no lessons are completed', () => {
    const module = course.modules[0]
    render(<ModuleOverview course={course} module={module} completed={new Set()} />)
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('0')
  })
})

describe('HarnessComparison', () => {
  it('renders all five harnesses', () => {
    render(<HarnessComparison />)
    expect(screen.getByRole('cell', { name: 'Codex' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Claude Cowork' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'OpenClaw' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'NemoClaw' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Hermes' })).toBeInTheDocument()
  })

  it('renders the five column headers', () => {
    render(<HarnessComparison />)
    expect(screen.getByRole('columnheader', { name: 'Harness' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Strengths' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Weaknesses' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Best use cases' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Autonomy' })).toBeInTheDocument()
  })
})
