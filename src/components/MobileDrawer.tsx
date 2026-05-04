import { useEffect, useState, type ReactNode } from 'react'
import { X } from 'lucide-react'

export function MobileDrawer({
  open,
  onClose,
  side,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  side: 'left' | 'right'
  title: string
  children: ReactNode
}) {
  const [phase, setPhase] = useState<'closed' | 'open' | 'closing'>(open ? 'open' : 'closed')
  const isClosing = phase === 'closing'

  useEffect(() => {
    let frame = 0

    if (open && phase !== 'open') {
      frame = requestAnimationFrame(() => setPhase('open'))
    } else if (!open && phase === 'open') {
      frame = requestAnimationFrame(() => setPhase('closing'))
    }

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [open, phase])

  useEffect(() => {
    if (phase === 'closed') {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const desktopQuery = window.matchMedia('(min-width: 1181px)')
    function handleDesktopChange(event: MediaQueryListEvent) {
      if (event.matches) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    desktopQuery.addEventListener('change', handleDesktopChange)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      desktopQuery.removeEventListener('change', handleDesktopChange)
      document.body.style.overflow = previousOverflow
    }
  }, [phase, onClose])

  if (phase === 'closed') {
    return null
  }

  return (
    <>
      <div
        className={`mobile-drawer-backdrop${isClosing ? ' closing' : ''}`}
        role="presentation"
        onClick={onClose}
      />
      <div
        className={`mobile-drawer-panel ${side}${isClosing ? ' closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onAnimationEnd={() => {
          if (isClosing && !open) {
            setPhase('closed')
          }
        }}
      >
        <div className="mobile-drawer-head">
          <span className="mobile-drawer-title">{title}</span>
          <button
            type="button"
            className="mobile-drawer-close"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="icon" />
          </button>
        </div>
        <div className="mobile-drawer-body">{children}</div>
      </div>
    </>
  )
}
