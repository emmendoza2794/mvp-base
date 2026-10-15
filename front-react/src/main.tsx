import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { PrimeReactProvider } from 'primereact/api'
import { ToastProvider } from './hooks/useToast'
import { router } from './router'
import './assets/css/main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider value={{ ripple: true }}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </PrimeReactProvider>
  </StrictMode>,
)
