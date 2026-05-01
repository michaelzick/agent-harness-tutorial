import { RotateCcw } from 'lucide-react'

export function ResetProgressButton({ onReset }: { onReset: () => void }) {
  function handleReset() {
    if (window.confirm('Reset all lesson and checkpoint progress?')) {
      onReset()
    }
  }

  return (
    <button className="secondary-button full-width" type="button" onClick={handleReset}>
      <RotateCcw className="icon" />
      Reset progress
    </button>
  )
}
