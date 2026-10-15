import type { ReactNode } from 'react'
import { Card } from 'primereact/card'

const features = [
  { icon: 'icon-[ic--twotone-layers]', text: 'Backend con arquitectura en capas (Layered Architecture)' },
  { icon: 'icon-[ic--twotone-web]', text: 'Frontend moderno con React 19 + PrimeReact' },
  { icon: 'icon-[ic--twotone-lock]', text: 'Autenticación JWT con hash bcrypt' },
  { icon: 'icon-[ic--twotone-storage]', text: 'Base de datos PostgreSQL con SQLAlchemy' },
  { icon: 'icon-[ic--twotone-monitor-heart]', text: 'Health check con verificación de BD' },
  { icon: 'icon-[ic--twotone-palette]', text: 'UI con PrimeReact 10 y Tailwind CSS 4' },
  { icon: 'icon-[ic--twotone-cloud]', text: 'Listo para despliegue serverless (AWS + Cloudflare)' },
  { icon: 'icon-[ic--twotone-code]', text: 'TypeScript en frontend + Zustand + PWA' },
]

const techStacks = [
  {
    title: 'Backend',
    icon: 'icon-[ic--twotone-dns]',
    color: 'bg-orange-500',
    items: [
      { name: 'FastAPI', desc: 'Framework web moderno' },
      { name: 'SQLAlchemy 2.x', desc: 'ORM para PostgreSQL' },
      { name: 'Pydantic 2.x', desc: 'Validación de datos' },
      { name: 'PyJWT + bcrypt', desc: 'Autenticación JWT' },
      { name: 'Uvicorn', desc: 'Servidor ASGI' },
      { name: 'Mangum', desc: 'Adaptador AWS Lambda' },
    ],
  },
  {
    title: 'Frontend',
    icon: 'icon-[ic--twotone-web]',
    color: 'bg-blue-500',
    items: [
      { name: 'React 19 + Vite', desc: 'Librería UI y bundler' },
      { name: 'PrimeReact 10', desc: 'Librería de componentes UI' },
      { name: 'Tailwind CSS 4', desc: 'Estilos utilitarios' },
      { name: 'React Router', desc: 'Enrutamiento' },
      { name: 'Zustand', desc: 'Gestión de estado' },
      { name: 'Iconify', desc: 'Librería de iconos' },
    ],
  },
  {
    title: 'DevOps',
    icon: 'icon-[ic--twotone-cloud]',
    color: 'bg-purple-500',
    items: [
      { name: 'AWS Lambda', desc: 'Backend serverless' },
      { name: 'AWS SAM', desc: 'Infrastructure as Code' },
      { name: 'Cloudflare Workers', desc: 'Frontend en el edge' },
      { name: 'Wrangler', desc: 'CLI de Cloudflare' },
      { name: 'Poetry', desc: 'Gestión de paquetes Python' },
      { name: 'PostgreSQL 14+', desc: 'Base de datos' },
    ],
  },
]

const backendLayers = [
  { name: 'Routes', desc: 'Manejo de HTTP requests/responses', icon: 'icon-[ic--twotone-route]', color: 'text-blue-700', bg: 'bg-blue-50' },
  { name: 'Services', desc: 'Lógica de negocio', icon: 'icon-[ic--twotone-settings]', color: 'text-purple-700', bg: 'bg-purple-50' },
  { name: 'Repositories', desc: 'Acceso a datos y BD', icon: 'icon-[ic--twotone-storage]', color: 'text-orange-700', bg: 'bg-orange-50' },
  { name: 'Models', desc: 'Entidades SQLAlchemy', icon: 'icon-[ic--twotone-table-chart]', color: 'text-green-700', bg: 'bg-green-50' },
  { name: 'Schemas', desc: 'Validación Pydantic (DTOs)', icon: 'icon-[ic--twotone-checklist]', color: 'text-red-700', bg: 'bg-red-50' },
]

const frontendLayers = [
  { name: 'Pages', desc: 'Vistas y rutas de la app', icon: 'icon-[ic--twotone-web]', color: 'text-blue-700', bg: 'bg-blue-50' },
  { name: 'Layouts', desc: 'Estructura base (nav, header)', icon: 'icon-[ic--twotone-view-quilt]', color: 'text-indigo-700', bg: 'bg-indigo-50' },
  { name: 'Components', desc: 'Componentes reutilizables', icon: 'icon-[ic--twotone-widgets]', color: 'text-purple-700', bg: 'bg-purple-50' },
  { name: 'Hooks', desc: 'Lógica reutilizable', icon: 'icon-[ic--twotone-integration-instructions]', color: 'text-orange-700', bg: 'bg-orange-50' },
  { name: 'Stores (Zustand)', desc: 'Estado global de la app', icon: 'icon-[ic--twotone-storage]', color: 'text-green-700', bg: 'bg-green-50' },
]

const quickStart = [
  {
    title: 'Clonar y ejecutar el setup',
    code: `git clone <tu-repo-url>
cd mvp-base
./setup-project.sh`,
  },
  {
    title: 'Configurar variables de entorno del backend',
    code: `cp back/.env.example back/.env
# Editar back/.env con tus valores:
# DATABASE_URL=postgresql://user:pass@localhost:5432/mvp_base
# JWT_SECRET_KEY=tu-clave-secreta`,
  },
  {
    title: 'Instalar dependencias e iniciar el backend',
    code: `cd back
poetry install
poetry run uvicorn src.main:app --reload --port 8000
# API: http://localhost:8000
# Docs: http://localhost:8000/docs`,
  },
  {
    title: 'Instalar dependencias e iniciar el frontend',
    code: `cd front
npm install
npm run dev
# App: http://localhost:3000`,
  },
]

const apiEndpoints = [
  { method: 'GET', path: '/health', desc: 'Estado del servicio y base de datos', auth: false },
  { method: 'POST', path: '/auth/register', desc: 'Registrar nuevo usuario (Form Data)', auth: false },
  { method: 'POST', path: '/auth/login', desc: 'Iniciar sesión, retorna JWT (Form Data)', auth: false },
  { method: 'GET', path: '/auth/me', desc: 'Obtener usuario autenticado actual', auth: true },
]

const envVars = `# back/.env

# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/mvp_base

# Aplicación
DEBUG=True

# JWT
JWT_SECRET_KEY=tu-clave-super-secreta  # ⚠️ Cambiar en producción
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=10080   # 7 días`

const securityItems = [
  { ok: true, text: 'Autenticación JWT con expiración configurable' },
  { ok: true, text: 'Hash de contraseñas con bcrypt' },
  { ok: true, text: 'Validación de entrada con Pydantic' },
  { ok: true, text: 'Variables de entorno para secrets' },
  { ok: false, text: 'Cambiar JWT_SECRET_KEY en producción' },
]

const deployItems = [
  {
    title: 'Backend — AWS Lambda',
    icon: 'icon-[ic--twotone-cloud-upload]',
    color: 'text-orange-500',
    code: `cd back\nsam build\nsam deploy --guided\n# o: ./deploy.sh`,
  },
  {
    title: 'Frontend — Cloudflare Workers',
    icon: 'icon-[ic--twotone-cloud-upload]',
    color: 'text-blue-500',
    code: `cd front\nnpm run deploy`,
  },
]

function SectionTitle({ icon, children, className = 'mb-6' }: { icon: string; children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-2xl font-bold text-gray-900 flex items-center gap-3 ${className}`}>
      <span className={`${icon} w-6 h-6 text-blue-600`}></span>
      {children}
    </h2>
  )
}

function LayerList({ title, icon, layers, flow }: { title: ReactNode; icon: string; layers: typeof backendLayers; flow: string }) {
  return (
    <Card
      className="border border-gray-100 shadow-sm"
      title={
        <div className="flex items-center gap-2">
          <span className={`${icon} w-5 h-5`}></span>
          <span className="text-base font-bold">{title}</span>
        </div>
      }
    >
      <div className="flex flex-col gap-2 mt-1">
        {layers.map((layer) => (
          <div key={layer.name} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${layer.bg}`}>
            <span className={`${layer.icon} w-4 h-4 ${layer.color}`}></span>
            <div>
              <span className={`text-sm font-semibold ${layer.color}`}>{layer.name}</span>
              <span className="text-xs text-gray-500 ml-2">{layer.desc}</span>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mt-1">
          <span className="icon-[ic--twotone-arrow-downward] w-4 h-4"></span>
          {flow}
        </div>
      </div>
    </Card>
  )
}

export default function Docs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <span className="icon-[ic--twotone-menu-book] w-4 h-4"></span>
          Documentación
        </div>
        <h1 className="text-5xl font-extrabold text-white mb-4">MVP Base</h1>
        <p className="text-xl text-white/85 max-w-2xl mx-auto">
          Template full-stack con arquitectura en capas, diseñado para despliegue serverless en AWS Lambda y Cloudflare Workers.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        {/* Descripción */}
        <section>
          <SectionTitle icon="icon-[ic--twotone-info]">¿Qué incluye?</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div key={feature.text} className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm">
                <span className={`${feature.icon} w-5 h-5 shrink-0 text-blue-600`}></span>
                <span className="text-sm text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Stack Tecnológico */}
        <section>
          <SectionTitle icon="icon-[ic--twotone-layers]">Stack Tecnológico</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techStacks.map((stack) => (
              <Card
                key={stack.title}
                className="border border-gray-100 shadow-sm"
                title={
                  <div className="flex items-center gap-3">
                    <div className={`${stack.color} w-9 h-9 rounded-lg flex items-center justify-center shrink-0`}>
                      <span className={`${stack.icon} w-5 h-5 text-white`}></span>
                    </div>
                    <span className="text-base font-bold">{stack.title}</span>
                  </div>
                }
              >
                <ul className="space-y-2 mt-1">
                  {stack.items.map((item) => (
                    <li key={item.name} className="flex items-start gap-2">
                      <span className="icon-[ic--twotone-check-circle] w-4 h-4 text-green-500 mt-0.5 shrink-0"></span>
                      <span className="text-sm text-gray-700">
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-gray-500"> — {item.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Arquitectura */}
        <section>
          <SectionTitle icon="icon-[ic--twotone-account-tree]">Arquitectura</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LayerList
              title="Backend (FastAPI)"
              icon="icon-[ic--twotone-dns] text-orange-500"
              layers={backendLayers}
              flow="Flujo: Routes → Services → Repositories → Models"
            />
            <LayerList
              title="Frontend (React 19)"
              icon="icon-[ic--twotone-web] text-blue-500"
              layers={frontendLayers}
              flow="Flujo: Pages → Hooks → Stores (Zustand)"
            />
          </div>
        </section>

        {/* Inicio Rápido */}
        <section>
          <SectionTitle icon="icon-[ic--twotone-rocket-launch]">Inicio Rápido</SectionTitle>
          <div className="space-y-4">
            {quickStart.map((step, i) => (
              <div key={step.title} className="bg-white border border-gray-100 shadow-sm rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 mb-2">{step.title}</p>
                    <pre className="bg-gray-900 text-green-400 text-xs rounded-lg p-4 overflow-x-auto leading-relaxed">{step.code}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* API Endpoints */}
        <section>
          <SectionTitle icon="icon-[ic--twotone-api]">API Endpoints</SectionTitle>
          <Card className="border border-gray-100 shadow-sm">
            <div className="space-y-3">
              {apiEndpoints.map((endpoint) => (
                <div key={endpoint.path} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded shrink-0 w-14 text-center ${
                      endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono text-gray-800 shrink-0">{endpoint.path}</code>
                  <span className="text-sm text-gray-500">{endpoint.desc}</span>
                  {endpoint.auth && (
                    <span className="ml-auto text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded shrink-0">JWT</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Variables de entorno */}
        <section>
          <SectionTitle icon="icon-[ic--twotone-settings]">Variables de Entorno</SectionTitle>
          <Card className="border border-gray-100 shadow-sm">
            <pre className="bg-gray-900 text-green-400 text-xs rounded-lg p-4 overflow-x-auto leading-relaxed">{envVars}</pre>
          </Card>
        </section>

        {/* Seguridad & Despliegue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section>
            <SectionTitle icon="icon-[ic--twotone-security]" className="mb-4">
              Seguridad
            </SectionTitle>
            <Card className="border border-gray-100 shadow-sm h-full">
              <ul className="space-y-3">
                {securityItems.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <span
                      className={`${
                        item.ok ? 'icon-[ic--twotone-check-circle] text-green-500' : 'icon-[ic--twotone-warning] text-orange-500'
                      } w-5 h-5 shrink-0 mt-0.5`}
                    ></span>
                    <span className="text-sm text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          <section>
            <SectionTitle icon="icon-[ic--twotone-cloud-upload]" className="mb-4">
              Despliegue
            </SectionTitle>
            <Card className="border border-gray-100 shadow-sm h-full">
              <div className="space-y-4">
                {deployItems.map((deploy) => (
                  <div key={deploy.title}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`${deploy.icon} w-5 h-5 ${deploy.color}`}></span>
                      <span className="text-sm font-semibold text-gray-800">{deploy.title}</span>
                    </div>
                    <pre className="bg-gray-900 text-green-400 text-xs rounded-lg p-3 overflow-x-auto">{deploy.code}</pre>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
