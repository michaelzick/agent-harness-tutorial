export function ProgressBar({
  percent,
  label,
  variant,
}: {
  percent: number
  label?: string
  variant?: 'thin'
}) {
  const safePercent = Math.max(0, Math.min(100, percent))
  const className = variant === 'thin' ? 'progress-bar-wrap thin' : 'progress-bar-wrap'

  return (
    <div className={className}>
      {label && <span>{label}</span>}
      <div className="progress-track" aria-label={`${safePercent}% complete`}>
        <div style={{ width: `${safePercent}%` }} />
      </div>
    </div>
  )
}
