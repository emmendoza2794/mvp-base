import { useRef } from 'react'
import { useNavigate } from 'react-router'
import { Menu } from 'primereact/menu'
import type { MenuItem } from 'primereact/menuitem'
import { useToast } from '../hooks/useToast'

export default function AppHeader() {
  const navigate = useNavigate()
  const toast = useToast()
  const userMenu = useRef<Menu>(null)

  const userMenuItems: MenuItem[] = [
    {
      label: 'juan@example.com',
      disabled: true,
      className: 'text-xs text-gray-500',
    },
    { separator: true },
    {
      label: 'Mi Perfil',
      icon: 'pi pi-user',
      command: () => navigate('/settings'),
    },
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      command: () => navigate('/settings'),
    },
    { separator: true },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-sign-out',
      command: () => {
        toast({ severity: 'warn', summary: 'Sesión', detail: 'Cerrando sesión...', life: 2000 })
      },
    },
  ]

  return (
    <header id="app-header" className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Branding */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
              <span className="icon-[ic--twotone-stars] w-7 h-7 text-white"></span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">MVP Base</h1>
              <p className="text-xs text-gray-500">Tu template favorito</p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3">
            {/* Notification Bell */}
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              title="Notificaciones"
            >
              <span className="icon-[ic--twotone-notifications] w-5 h-5"></span>
            </button>

            {/* User Info - Desktop only */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Juan Pérez</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>

            {/* User Avatar Button */}
            <button
              onClick={(event) => userMenu.current?.toggle(event)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold hover:shadow-lg transition-shadow text-sm"
            >
              JP
            </button>
            <Menu ref={userMenu} model={userMenuItems} popup />
          </div>
        </div>
      </div>
    </header>
  )
}
