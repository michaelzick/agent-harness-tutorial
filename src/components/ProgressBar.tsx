export function ProgressBar({ percent, label }: { percent: number; label?: string }) {
  const safePercent = Math.max(0, Math.min(100, percent))

  return (
    <div className="progress-bar-wrap">
      {label && <span>{label}</span>}
      <div className="progress-track" aria-label={`${safePercent}% complete`}>
        <div style={{ width: `${safePercent}%` }} />
      </div>
    </div>
  )
}
