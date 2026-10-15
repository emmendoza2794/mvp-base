import type { ComponentType } from 'react'
import { createBrowserRouter, Navigate, Outlet, ScrollRestoration } from 'react-router'
import DefaultLayout from './layouts/DefaultLayout'

function Root() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

// Cada página se carga bajo demanda (code splitting por ruta)
const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({ Component: (await load()).default })

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      // Páginas sin layout (pantalla completa)
      { path: '/', lazy: page(() => import('./pages/Index')) },
      { path: '/login-1', lazy: page(() => import('./pages/Login1')) },
      { path: '/login-2', lazy: page(() => import('./pages/Login2')) },

      // Páginas con header + navegación
      {
        element: <DefaultLayout />,
        children: [
          { path: '/demo', lazy: page(() => import('./pages/Demo')) },
          { path: '/docs', lazy: page(() => import('./pages/Docs')) },
          { path: '/settings', lazy: page(() => import('./pages/Settings')) },
        ],
      },

      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
