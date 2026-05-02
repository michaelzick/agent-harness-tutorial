export function ResetProgressButton({ onReset }: { onReset: () => void }) {
  function handleReset() {
    if (window.confirm('Reset all lesson and checkpoint progress?')) {
      onReset()
    }
  }

  return (
    <button className="reset-button" type="button" onClick={handleReset}>
      Reset progress
    </button>
  )
}
