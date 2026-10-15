import { Outlet } from 'react-router'
import { ConfirmDialog } from 'primereact/confirmdialog'
import AppHeader from '../components/AppHeader'
import AppNavigation from '../components/AppNavigation'
import { useSidebar } from '../stores/sidebar'

export default function DefaultLayout() {
  const collapsed = useSidebar((state) => state.collapsed)

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <AppNavigation />
      <main className={`pb-16 lg:pb-0 transition-all duration-200 ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <Outlet />
      </main>
      <ConfirmDialog />
    </div>
  )
}
