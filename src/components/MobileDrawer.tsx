import { useEffect, type ReactNode } from 'react'
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
  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const desktopQuery = window.matchMedia('(min-width: 881px)')
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
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <>
      <div className="mobile-drawer-backdrop" role="presentation" onClick={onClose} />
      <div
        className={`mobile-drawer-panel ${side}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
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
