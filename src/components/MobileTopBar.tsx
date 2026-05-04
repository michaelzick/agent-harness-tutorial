import { ListTree, Menu } from 'lucide-react'

export function MobileTopBar({
  onOpenMenu,
  onOpenOutline,
}: {
  onOpenMenu: () => void
  onOpenOutline?: (() => void) | null
}) {
  return (
    <div className="mobile-topbar">
      <button
        type="button"
        className="mobile-topbar-button"
        aria-label="Open menu"
        onClick={onOpenMenu}
      >
        <Menu className="icon" />
      </button>
      <div className="mobile-topbar-brand">
        <span className="brand-kicker">Tutorial</span>
        <span className="brand-word">Agent Harness</span>
      </div>
      {onOpenOutline && (
        <button
          type="button"
          className="mobile-topbar-outline"
          aria-label="Open lesson outline"
          onClick={onOpenOutline}
        >
          <ListTree className="icon" />
          <span>Outline</span>
        </button>
      )}
    </div>
  )
}
