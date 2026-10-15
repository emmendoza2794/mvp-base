const STORAGE_KEY = 'sidebar-collapsed'

export function useSidebar() {
  const collapsed = useState('sidebar-collapsed', () => false)

  const init = () => {
    if (import.meta.client) {
      collapsed.value = localStorage.getItem(STORAGE_KEY) === 'true'
    }
  }

  const toggle = () => {
    collapsed.value = !collapsed.value
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, String(collapsed.value))
    }
  }

  return { collapsed, init, toggle }
}
