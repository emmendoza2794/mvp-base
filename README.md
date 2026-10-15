# MVP Base

> Template full-stack (FastAPI + Nuxt o React) con arquitectura en capas, listo para desplegar serverless en AWS Lambda y Cloudflare Workers.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Inicio rápido](#-inicio-rápido)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Arquitectura](#️-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Desarrollo](#-desarrollo)
- [Despliegue](#-despliegue)
- [Configuración](#️-configuración)
- [Seguridad](#-seguridad)

## 🎯 Descripción

**MVP Base** es un proyecto base para construir MVPs rápido siguiendo buenas prácticas. Incluye:

- ✅ Backend FastAPI con arquitectura en capas (routes → services → repositories → models)
- ✅ Autenticación JWT (registro, login y `/auth/me`) con hash bcrypt
- ✅ PostgreSQL con SQLAlchemy 2 y health check con verificación de BD
- ✅ Dos frontends a elegir con las mismas pantallas:
  - **Vue**: Nuxt 4 + PrimeVue 4 + Pinia
  - **React**: Vite + React 19 + React Router + PrimeReact 10 + Zustand
  - Ambos con TypeScript, Tailwind CSS 4 e Iconify
- ✅ Sidebar comprimible (solo íconos, con tooltips) que recuerda su estado
- ✅ Navegación mobile: barra inferior + drawer
- ✅ Header global con avatar y menú de usuario
- ✅ Páginas de ejemplo: landing, dashboard demo, documentación, configuraciones y 2 logins
- ✅ Soporte PWA
- ✅ `dev.sh` para levantar back y front con un solo comando
- ✅ `setup-project.sh` para elegir el frontend (Vue o React) y renombrar el template a tu proyecto

## ⚡ Inicio rápido

**Requisitos:** Python 3.12+, [Poetry](https://python-poetry.org/), Node.js 22+, [Bun](https://bun.sh/) (o npm) y PostgreSQL 14+.

```bash
# 1. Crea tu repo desde el template ("Use this template" en GitHub) y clónalo
git clone <tu-nuevo-repo-url>
cd <tu-proyecto>

# 2. Personaliza el proyecto (frontend Vue o React, nombre, autor, .env, dependencias)
./setup-project.sh

# 3. Configura DATABASE_URL en back/.env y crea la base de datos
createdb mi_app

# 4. Levanta back y front juntos
./dev.sh
```

- Frontend: http://localhost:3000
- API: http://localhost:8000 — docs interactiva en http://localhost:8000/docs

### ¿Qué hace `setup-project.sh`?

- Pide el nombre del proyecto (`mi-app`), el nombre visible (`Mi App`), la descripción y el autor.
- Pregunta qué frontend usar: **Vue** (`front-vue/`) o **React** (`front-react/`). El elegido queda en `front/` y el otro se elimina.
- Reemplaza `MVP Base` / `mvp-base` / `mvp_base` / `MvpBase` en todo el código: UI, API, `template.yaml`, `pyproject.toml`, `package.json`, etc.
- Crea `back/.env` desde `back/.env.example` con un `JWT_SECRET_KEY` aleatorio.
- Opcionalmente instala las dependencias (`poetry install` y `bun install`/`npm install`).
- Si ya lo corriste antes (ya existe `front/`), no vuelve a preguntar por el frontend.
- Funciona en macOS y Linux.

## 🛠️ Stack Tecnológico

### Backend
| Tecnología | Versión | Uso |
|---|---|---|
| Python | 3.12+ | Runtime (Lambda usa `python3.14`) |
| FastAPI | 0.141 | Framework web |
| SQLAlchemy | 2.1 | ORM |
| psycopg | 3 | Driver PostgreSQL |
| Pydantic / pydantic-settings | 2.13 / 2.15 | Validación y configuración |
| PyJWT + bcrypt | 2.15 / 5 | Tokens JWT y hash de contraseñas |
| Uvicorn | 0.54 | Servidor de desarrollo |
| Mangum | 0.22 | Adaptador ASGI para AWS Lambda |
| Poetry | 2.x | Gestor de dependencias |

### Frontend Vue (`front-vue/`)
| Tecnología | Versión | Uso |
|---|---|---|
| Nuxt | 4.5 | Framework (Vue 3 + TypeScript) |
| PrimeVue | 4.5 | Componentes UI (tema en `app/assets/themes/theme.js`) |
| Tailwind CSS | 4.3 | Estilos (+ `tailwindcss-primeui`) |
| Iconify | — | Íconos vía `@iconify/tailwind4` (`icon-[ic--twotone-home]`) |
| Pinia | 4 | Estado global |
| @vite-pwa/nuxt | 1.1 | PWA |

### Frontend React (`front-react/`)
| Tecnología | Versión | Uso |
|---|---|---|
| React | 19.3 | Librería UI (TypeScript) |
| Vite | 8.3 | Bundler y dev server |
| React Router | 8.4 | Rutas (con carga diferida por página) |
| PrimeReact | 10.9 | Componentes UI (tema `lara-light-blue`) |
| Tailwind CSS | 4.3 | Estilos |
| Iconify | — | Íconos vía `@iconify/tailwind4` (`icon-[ic--twotone-home]`) |
| Zustand | 5 | Estado global |
| vite-plugin-pwa | 2.0 | PWA |

> PrimeVue y PrimeReact se mantienen a propósito en la última versión con licencia MIT (PrimeVue 4.x y PrimeReact 10.x): PrimeVue 5 y PrimeReact 11 cambiaron a una licencia comercial que requiere license key.

### Despliegue
- **Backend**: AWS SAM + Lambda + HTTP API Gateway
- **Frontend**: Cloudflare Workers (Wrangler)

## 🏗️ Arquitectura

### Backend (arquitectura en capas)

```
Routes → Services → Repositories → Models
   ↓         ↓
Schemas   Core (config, database, auth)
```

- **Routes**: endpoints HTTP (reciben Form Data)
- **Services**: lógica de negocio
- **Repositories**: acceso a datos
- **Models**: entidades SQLAlchemy
- **Schemas**: validación y serialización con Pydantic
- **Core**: configuración, conexión a BD y autenticación JWT

### Frontend

```
Vue:   Pages → Composables → Stores (Pinia)
React: Pages → Hooks → Stores (Zustand)
  ↓
Components (AppHeader, AppNavigation, NavSection)
```

## 📁 Estructura del Proyecto

```
mvp-base/
├── back/                         # Backend (FastAPI)
│   ├── src/
│   │   ├── core/                 # config.py, database.py, auth.py
│   │   ├── models/               # Modelos SQLAlchemy
│   │   ├── repositories/         # Acceso a datos
│   │   ├── routes/               # Endpoints
│   │   ├── schemas/              # Schemas Pydantic
│   │   ├── services/             # Lógica de negocio
│   │   └── main.py               # App FastAPI (CORS, health, routers)
│   ├── sql/init.sql              # Script SQL inicial (opcional)
│   ├── lambda_handler.py         # Handler de AWS Lambda (Mangum)
│   ├── template.yaml             # Template SAM/CloudFormation
│   ├── deploy.sh                 # Genera requirements.txt, build y deploy
│   ├── pyproject.toml            # Dependencias (Poetry)
│   └── .env.example              # Variables de entorno de ejemplo
│
├── front-vue/                    # Frontend Vue (Nuxt 4) → queda como front/ tras el setup
│   ├── app/
│   │   ├── assets/
│   │   │   ├── css/main.css      # Tailwind + PrimeUI + Iconify
│   │   │   └── themes/theme.js   # Preset del tema PrimeVue
│   │   ├── components/
│   │   │   ├── AppHeader.vue     # Header global (avatar, menú usuario)
│   │   │   ├── AppNavigation.vue # Sidebar desktop + barra mobile + drawer
│   │   │   └── NavSection.vue    # Sección del menú (tooltips al estar comprimido)
│   │   ├── composables/
│   │   │   └── useSidebar.ts     # Estado del sidebar (persistido en localStorage)
│   │   ├── layouts/default.vue   # Header + navegación + contenido
│   │   └── pages/                # index, demo, docs, settings, login-1, login-2
│   ├── nuxt.config.ts
│   └── package.json
│
├── front-react/                  # Frontend React (Vite) → queda como front/ tras el setup
│   ├── src/
│   │   ├── assets/css/main.css   # Tailwind + PrimeReact (en su propia capa) + Iconify
│   │   ├── components/           # AppHeader, AppNavigation, NavSection (.tsx)
│   │   ├── hooks/useToast.tsx    # Toast global de PrimeReact
│   │   ├── stores/sidebar.ts     # Estado del sidebar (Zustand, persistido en localStorage)
│   │   ├── layouts/DefaultLayout.tsx
│   │   ├── pages/                # Index, Demo, Docs, Settings, Login1, Login2
│   │   ├── router.tsx            # Rutas (React Router)
│   │   └── main.tsx
│   ├── vite.config.ts
│   ├── wrangler.jsonc            # Deploy como SPA en Cloudflare Workers
│   └── package.json
│
├── dev.sh                        # Levanta back + front con logs prefijados
├── setup-project.sh              # Personaliza el template
└── README.md
```

## 💻 Desarrollo

### Todo junto

```bash
./dev.sh
```

Levanta `uvicorn --reload` (back) y `bun run dev` (front) en paralelo. Cada log sale con su prefijo de color (`[back]` / `[front]`). Con `Ctrl+C` se cierran ambos.

Usa `front/`. En el template, mientras aún existen los dos frontends, usa `front-vue/` por defecto; con `./dev.sh react` usa `front-react/`.

### Por separado

```bash
# Backend
cd back
poetry install
poetry run uvicorn src.main:app --reload --port 8000

# Frontend
cd front
bun install        # o npm install
bun run dev        # o npm run dev
```

Las tablas se crean automáticamente al iniciar el backend si hay conexión a la BD (`Base.metadata.create_all`). También puedes usar `back/sql/init.sql`.

### Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/` | Mensaje de bienvenida |
| `GET` | `/health` | Estado del servicio y de la BD (`healthy` / `degraded`) |
| `POST` | `/auth/register` | Registro (Form Data: `email`, `password`, `name`) |
| `POST` | `/auth/login` | Login (Form Data: `email`, `password`) → JWT |
| `GET` | `/auth/me` | Usuario actual (`Authorization: Bearer <token>`) |

```bash
curl -X POST http://localhost:8000/auth/login \
  -F email=user@example.com -F password=secreto123
```

### Agregar opciones al menú

Los ítems del menú están en `AppNavigation` (`front/app/components/AppNavigation.vue` en Vue, `front/src/components/AppNavigation.tsx` en React), agrupados por sección:

```ts
const mainNavItems = [
  { to: '/demo', label: 'Dashboard Demo', icon: 'icon-[ic--twotone-dashboard]' },
  { to: '#', label: 'Reportes', icon: 'icon-[ic--twotone-bar-chart]' }, // '#' = deshabilitado
]
```

Busca íconos en [Iconify (ic twotone)](https://icon-sets.iconify.design/ic/?keyword=twotone).

## 🚢 Despliegue

### Backend (AWS Lambda)

Requisitos: AWS CLI configurado y AWS SAM CLI.

1. Crea `back/.env.production` con los valores de producción:

```bash
cd back
cp .env.example .env.production
# DATABASE_URL de tu BD en la nube y JWT_SECRET_KEY con: openssl rand -hex 32
```

2. Despliega:

```bash
./deploy.sh                  # usa .env.production (o .env si no existe)
./deploy.sh .env.staging     # o un archivo específico
```

`deploy.sh` genera `requirements.txt`, corre `sam build` y `sam deploy`. Le pasa las variables del `.env` como parámetros `NoEcho` del template, así que `template.yaml` no tiene credenciales. Falla si falta `DATABASE_URL`/`JWT_SECRET_KEY` o si el secret es el de ejemplo.

La URL del API aparece en los outputs del stack (`MvpBaseApi`).

### Frontend (Cloudflare Workers)

Requisitos: Wrangler autenticado (`npx wrangler login`).

```bash
cd front
npm run deploy           # build + wrangler deploy
npm run preview          # probar el build localmente con wrangler
```

En React, el nombre del worker está en `front/wrangler.jsonc` y se sirve como SPA (rutas desconocidas → `index.html`).

## ⚙️ Configuración

### Backend — `back/.env`

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mvp_base
DEBUG=True
JWT_SECRET_KEY=change-this-secret-key-in-production
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=10080   # 7 días
```

Se leen con `pydantic-settings` en `back/src/core/config.py`.

### Frontend

- **Vue** — `front/nuxt.config.ts`: módulos `@primevue/nuxt-module` y `@pinia/nuxt`, el tema de PrimeVue en `app/assets/themes/theme.js` y Tailwind vía `@tailwindcss/vite`.
- **React** — `front/vite.config.ts`: plugins de React, Tailwind y PWA (puerto 3000). El tema de PrimeReact se importa en `src/assets/css/main.css`, dentro de la capa `primereact` para que las utilidades de Tailwind lo sobrescriban.

## 🔐 Seguridad

- ✅ Autenticación JWT y contraseñas con bcrypt
- ✅ Validación de entrada con Pydantic
- ✅ Secrets en variables de entorno (`.env` está en `.gitignore`)
- ⚠️ Usa un `JWT_SECRET_KEY` propio en producción (`openssl rand -hex 32`)
- ⚠️ CORS permite todos los orígenes (`allow_origins=["*"]` en `back/src/main.py`). Restríngelo a tu dominio en producción.
- ✅ `template.yaml` no tiene credenciales: se inyectan desde el `.env` al desplegar (parámetros `NoEcho`)

## 📝 Convenciones de Código

- **Backend**: PEP 8, type hints, docstrings en funciones públicas y snake_case.
- **Frontend Vue**: `<script setup lang="ts">`, composables para lógica reutilizable, camelCase para variables y PascalCase para componentes.
- **Frontend React**: componentes funcionales en `.tsx`, hooks para lógica reutilizable, stores de Zustand para estado global, camelCase para variables y PascalCase para componentes.

## 📄 Licencia

ISC

## 👤 Autor

**Edinson Mendoza**
- Email: emmendoza2794@gmail.com
