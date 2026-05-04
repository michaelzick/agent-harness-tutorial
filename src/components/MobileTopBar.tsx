import { Menu } from 'lucide-react'

export function MobileTopBar({ onOpenMenu }: { onOpenMenu: () => void }) {
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
    </div>
  )
}
