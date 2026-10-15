import { createContext, useCallback, useContext, useRef, type ReactNode } from 'react'
import { Toast, type ToastMessage } from 'primereact/toast'

type ShowToast = (message: ToastMessage) => void

const ToastContext = createContext<ShowToast | null>(null)

// Toast global: se monta una sola vez en la raíz de la app
export function ToastProvider({ children }: { children: ReactNode }) {
  const toast = useRef<Toast>(null)
  const show = useCallback<ShowToast>((message) => toast.current?.show(message), [])

  return (
    <ToastContext value={show}>
      <Toast ref={toast} position="top-right" />
      {children}
    </ToastContext>
  )
}

export function useToast() {
  const show = useContext(ToastContext)
  if (!show) throw new Error('useToast debe usarse dentro de <ToastProvider>')
  return show
}
