import { useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router'

export interface NavItem {
  to: string
  label: string
  icon: string
}

interface NavSectionProps {
  title: string
  items: NavItem[]
  currentPath: string
  collapsed?: boolean
  onNavigate?: () => void
}

const isDisabled = (route: string) => !route || route === '#'

export default function NavSection({ title, items, currentPath, collapsed = false, onNavigate }: NavSectionProps) {
  const [tooltip, setTooltip] = useState<{ label: string; top: number; left: number } | null>(null)

  const isActive = (route: string) => currentPath === route

  function onEnter(event: MouseEvent<HTMLElement>, label: string) {
    if (!collapsed) return
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltip({ label, top: rect.top + rect.height / 2, left: rect.right + 10 })
  }

  const onLeave = () => setTooltip(null)

  return (
    <div>
      {!collapsed && (
        <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-2 whitespace-nowrap">{title}</h3>
      )}
      <div className="space-y-0.5">
        {items.map((item) =>
          !isDisabled(item.to) ? (
            <Link
              key={item.label}
              to={item.to}
              onClick={onNavigate}
              onMouseEnter={(e) => onEnter(e, item.label)}
              onMouseLeave={onLeave}
              className={`flex items-center gap-3 rounded-lg transition-all duration-200 ${
                collapsed ? 'justify-center px-3 py-2' : 'px-4 py-2'
              } ${isActive(item.to) ? 'text-white font-semibold shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              style={isActive(item.to) ? { background: 'linear-gradient(135deg, #3b82f6, #4f46e5)' } : undefined}
            >
              <span className={`${item.icon} w-5 h-5 shrink-0`}></span>
              {!collapsed && <span className="text-sm whitespace-nowrap">{item.label}</span>}
            </Link>
          ) : (
            <div
              key={item.label}
              onMouseEnter={(e) => onEnter(e, item.label)}
              onMouseLeave={onLeave}
              className={`flex items-center gap-3 rounded-lg text-gray-400 cursor-not-allowed opacity-60 select-none ${
                collapsed ? 'justify-center px-3 py-2' : 'px-4 py-2'
              }`}
              aria-disabled="true"
            >
              <span className={`${item.icon} w-5 h-5 shrink-0`}></span>
              {!collapsed && <span className="text-sm whitespace-nowrap">{item.label}</span>}
            </div>
          ),
        )}
      </div>

      {/* Floating tooltip badge shown when the sidebar is collapsed to icons only */}
      {collapsed &&
        tooltip &&
        createPortal(
          <div
            className="fixed z-[100] pointer-events-none rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap animate-[navtooltip_0.12s_ease-out]"
            style={{ top: tooltip.top, left: tooltip.left, transform: 'translateY(-50%)' }}
          >
            {tooltip.label}
          </div>,
          document.body,
        )}
    </div>
  )
}
