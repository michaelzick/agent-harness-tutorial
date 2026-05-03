import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Checkpoint } from '../src/components/Checkpoint'
import { ProgressBar } from '../src/components/ProgressBar'
import { ResetProgressButton } from '../src/components/ResetProgressButton'
import type { Checkpoint as CheckpointType } from '../src/types/course'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ProgressBar', () => {
  it('clamps percentage between 0 and 100 and exposes ARIA progress semantics', () => {
    render(<ProgressBar percent={150} />)
    const bar = screen.getByRole('progressbar')
    expect(bar.getAttribute('aria-valuenow')).toBe('100')
    expect(bar.getAttribute('aria-valuemin')).toBe('0')
    expect(bar.getAttribute('aria-valuemax')).toBe('100')
  })

  it('treats negative percentages as zero', () => {
    render(<ProgressBar percent={-5} />)
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('0')
  })

  it('uses the supplied label for the accessible name when provided', () => {
    render(<ProgressBar percent={42} label="42% complete" />)
    expect(screen.getByRole('progressbar', { name: '42% complete' })).toBeInTheDocument()
  })

  it('applies the thin variant class without breaking semantics', () => {
    const { container } = render(<ProgressBar percent={30} variant="thin" />)
    expect(container.querySelector('.progress-bar-wrap.thin')).not.toBeNull()
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('30')
  })
})

const sampleCheckpoint: CheckpointType = {
  id: 'sample-checkpoint',
  prompt: 'Pick the best operating principle.',
  options: [
    { id: 'good', text: 'Define explicit guardrails before launch.', isCorrect: true, explanation: 'Right.' },
    { id: 'bad', text: 'Run the agent without limits.', isCorrect: false, explanation: 'No.' },
  ],
}

describe('Checkpoint', () => {
  it('marks the chosen option as pressed and announces the explanation', () => {
    const onAnswer = vi.fn()
    render(<Checkpoint checkpoint={sampleCheckpoint} onAnswer={onAnswer} />)

    const option = screen.getByRole('button', { name: /Define explicit guardrails/ })
    expect(option.getAttribute('aria-pressed')).toBe('false')

    fireEvent.click(option)

    expect(option.getAttribute('aria-pressed')).toBe('true')
    expect(onAnswer).toHaveBeenCalledWith(true)
    expect(screen.getByRole('status')).toHaveTextContent(/Correct\./)
  })

  it('reports incorrect answers without throwing', () => {
    const onAnswer = vi.fn()
    render(<Checkpoint checkpoint={sampleCheckpoint} onAnswer={onAnswer} />)

    fireEvent.click(screen.getByRole('button', { name: /Run the agent without limits/ }))

    expect(onAnswer).toHaveBeenCalledWith(false)
    expect(screen.getByRole('status')).toHaveTextContent(/Not quite\./)
  })

  it('renders saved result feedback when supplied', () => {
    render(<Checkpoint checkpoint={sampleCheckpoint} savedResult={true} onAnswer={() => {}} />)
    expect(screen.getByText(/Saved result: passed/)).toBeInTheDocument()
  })
})

describe('ResetProgressButton', () => {
  it('only resets after the user confirms', () => {
    const onReset = vi.fn()
    vi.spyOn(window, 'confirm').mockReturnValueOnce(false).mockReturnValueOnce(true)
    render(<ResetProgressButton onReset={onReset} />)

    const button = screen.getByRole('button', { name: /Reset progress/ })
    fireEvent.click(button)
    expect(onReset).not.toHaveBeenCalled()

    fireEvent.click(button)
    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
