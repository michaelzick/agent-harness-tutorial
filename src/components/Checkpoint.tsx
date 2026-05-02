import { useState } from 'react'
import type { Checkpoint as CheckpointType } from '../types/course'

export function Checkpoint({
  checkpoint,
  savedResult,
  onAnswer,
}: {
  checkpoint: CheckpointType
  savedResult?: boolean
  onAnswer: (isCorrect: boolean) => void
}) {
  const [message, setMessage] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  function handleAnswer(optionId: string) {
    const option = checkpoint.options.find((candidate) => candidate.id === optionId)
    if (!option) {
      return
    }
    setSelectedId(option.id)
    setMessage(`${option.isCorrect ? 'Correct.' : 'Not quite.'} ${option.explanation}`)
    onAnswer(option.isCorrect)
  }

  return (
    <section className="side-rail-block checkpoint-card">
      <div className="side-rail-label">Checkpoint</div>
      <p>{checkpoint.prompt}</p>
      <div className="checkpoint-options" role="group" aria-label="Checkpoint options">
        {checkpoint.options.map((option) => (
          <button
            className={selectedId === option.id ? 'selected' : undefined}
            key={option.id}
            type="button"
            aria-pressed={selectedId === option.id}
            onClick={() => handleAnswer(option.id)}
          >
            {option.text}
          </button>
        ))}
      </div>
      {message && (
        <p className="checkpoint-result" role="status" aria-live="polite">
          {message}
        </p>
      )}
      {savedResult !== undefined && (
        <p className="quiet">Saved result: {savedResult ? 'passed' : 'needs review'}</p>
      )}
    </section>
  )
}
