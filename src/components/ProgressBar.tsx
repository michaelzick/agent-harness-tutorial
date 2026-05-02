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
      <div
        className="progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safePercent}
        aria-label={label ?? `${safePercent}% complete`}
      >
        <div style={{ width: `${safePercent}%` }} />
      </div>
    </div>
  )
}
