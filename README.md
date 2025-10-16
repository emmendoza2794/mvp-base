# MVP Base

> Full-stack boilerplate siguiendo principios de arquitectura limpia, diseñado para despliegue serverless en AWS Lambda y Cloudflare Workers.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Arquitectura](#-arquitectura)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Desarrollo](#-desarrollo)
- [Despliegue](#-despliegue)
- [Configuración](#-configuración)

## 🎯 Descripción

**MVP Base** es un proyecto base para construcción rápida de MVPs siguiendo mejores prácticas de desarrollo. Incluye:

- ✅ Backend con arquitectura limpia (Clean Architecture)
- ✅ Frontend moderno con Nuxt 4
- ✅ Sistema de autenticación JWT
- ✅ Base de datos PostgreSQL con SQLAlchemy
- ✅ UI components con PrimeVue y Tailwind CSS
- ✅ Listo para despliegue serverless
- ✅ TypeScript en frontend
- ✅ Gestión de estado con Pinia
- ✅ Soporte PWA

## 🏗️ Arquitectura

### Backend (Clean Architecture)

```
Routes → Services → Repositories → Models
   ↓         ↓
Schemas   Core (Config, DB, Utils)
```

**Capas:**
- **Routes**: Manejo de requests/responses HTTP
- **Services**: Lógica de negocio
- **Repositories**: Acceso a datos y operaciones de BD
- **Models**: Definición de entidades (SQLAlchemy)
- **Schemas**: Validación y serialización (Pydantic)
- **Core**: Configuración y utilidades compartidas

### Frontend (Nuxt 4 + PrimeVue)

```
Pages → Composables → Stores (Pinia)
  ↓           ↓
Components   Utils
```

## 🛠️ Stack Tecnológico

### Backend
- **Framework**: FastAPI 0.115.x
- **ORM**: SQLAlchemy 2.0.x
- **Validación**: Pydantic 2.x
- **Base de datos**: PostgreSQL (psycopg2-binary)
- **Autenticación**: JWT (PyJWT) + bcrypt
- **Server**: Uvicorn (desarrollo) / Mangum (AWS Lambda)
- **Python**: 3.12+

### Frontend
- **Framework**: Nuxt 4.1.x
- **UI Library**: PrimeVue 4.3.x
- **Estilos**: Tailwind CSS 4.x + TailwindCSS PrimeUI
- **Iconos**: @iconify/json
- **Estado**: Pinia 3.x
- **PWA**: @vite-pwa/nuxt
- **TypeScript**: Soporte completo

### DevOps & Deployment
- **Backend**: AWS SAM + Lambda
- **Frontend**: Cloudflare Workers (Wrangler)
- **Package Manager Backend**: Poetry
- **Package Manager Frontend**: npm

## 📁 Estructura del Proyecto

```
mvp-base/
├── back/                      # Backend (FastAPI)
│   ├── src/
│   │   ├── core/             # Configuración y base de datos
│   │   │   ├── config.py     # Settings (env vars, JWT, etc)
│   │   │   ├── database.py   # Database connection
│   │   │   └── __init__.py
│   │   ├── models/           # SQLAlchemy models
│   │   ├── repositories/     # Data access layer
│   │   ├── routes/           # API endpoints
│   │   ├── schemas/          # Pydantic schemas (DTOs)
│   │   ├── services/         # Business logic
│   │   └── main.py           # FastAPI app
│   ├── sql/                  # Scripts SQL
│   ├── lambda_handler.py     # AWS Lambda handler
│   ├── pyproject.toml        # Poetry dependencies
│   ├── requirements.txt      # Pip dependencies
│   ├── samconfig.toml        # SAM configuration
│   ├── template.yaml         # SAM/CloudFormation template
│   ├── deploy.sh             # Deployment script
│   └── README.md
│
├── front/                     # Frontend (Nuxt)
│   ├── app/
│   │   ├── assets/
│   │   │   ├── css/
│   │   │   │   └── main.css  # Tailwind imports
│   │   │   └── themes/
│   │   │       └── theme.js  # PrimeVue theme
│   │   └── pages/
│   │       ├── index.vue     # Home page
│   │       └── demo.vue      # Demo page
│   ├── nuxt.config.ts        # Nuxt configuration
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md                  # Este archivo
```

## 📋 Requisitos

### Backend
- Python 3.12 o superior
- PostgreSQL 14+
- Poetry (opcional) o pip

### Frontend
- Node.js 18+ / Bun
- npm, pnpm, yarn o bun

### Despliegue
- AWS CLI + SAM CLI (para backend)
- Wrangler CLI (para frontend)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd mvp-base
```

### 2. Backend Setup

```bash
cd back

# Con Poetry (recomendado)
poetry install

# O con pip
pip install -r requirements.txt
```

**Configurar variables de entorno:**

Crear archivo `.env` en `/back`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mvp_base

# Application
DEBUG=True

# JWT
JWT_SECRET_KEY=your-super-secret-key-change-in-production
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

### 3. Frontend Setup

```bash
cd front

# Instalar dependencias
npm install
# o
pnpm install
# o
yarn install
# o
bun install
```

## 💻 Desarrollo

### Backend

```bash
cd back

# Iniciar servidor de desarrollo
uvicorn src.main:app --reload --port 8000

# Con Poetry
poetry run uvicorn src.main:app --reload --port 8000
```

API disponible en: `http://localhost:8000`
Docs interactiva: `http://localhost:8000/docs`

### Frontend

```bash
cd front

# Iniciar servidor de desarrollo
npm run dev

# O con otros package managers
pnpm dev
yarn dev
bun run dev
```

App disponible en: `http://localhost:3000`

## 🚢 Despliegue

### Backend (AWS Lambda)

**Prerrequisitos:**
- AWS CLI configurado
- AWS SAM CLI instalado

**Desplegar:**

```bash
cd back

# Build y deploy
sam build
sam deploy --guided

# O usar el script
./deploy.sh
```

**Configurar variables en template.yaml** antes del despliegue:
- `DATABASE_URL`: Connection string de PostgreSQL
- `JWT_SECRET_KEY`: Secret key para JWT
- `DEBUG`: false en producción

### Frontend (Cloudflare Workers)

**Prerrequisitos:**
- Wrangler CLI instalado y autenticado

**Desplegar:**

```bash
cd front

# Build y deploy
npm run deploy

# O manualmente
npm run build
wrangler deploy .output/server/index.mjs --assets .output/public
```

**Preview local:**

```bash
npm run preview
```

## ⚙️ Configuración

### Backend Configuration

Archivo: `back/src/core/config.py`

```python
class Settings(BaseSettings):
    # Database
    DATABASE_URL: str

    # Application
    DEBUG: bool

    # JWT
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 días
```

### Frontend Configuration

Archivo: `front/nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  modules: [
    '@primevue/nuxt-module',
    '@pinia/nuxt',
  ],

  primevue: {
    importTheme: { from: '~/assets/themes/theme.js' },
  },

  // ... más configuración
})
```

### Database Migration

```bash
cd back

# Crear migraciones (cuando implementes Alembic)
alembic revision --autogenerate -m "descripcion"

# Aplicar migraciones
alembic upgrade head
```

## 📝 Convenciones de Código

### Backend (Python)
- PEP 8 style guide
- Type hints en funciones
- Docstrings en clases y funciones públicas
- Nombres descriptivos en snake_case

### Frontend (TypeScript)
- ESLint + Prettier
- Composables para lógica reutilizable
- Componentes SFC (Single File Components)
- camelCase para variables, PascalCase para componentes

## 🔐 Seguridad

- ✅ Autenticación JWT
- ✅ Hash de contraseñas con bcrypt
- ✅ Validación de entrada con Pydantic
- ✅ Variables de entorno para secrets
- ⚠️ **IMPORTANTE**: Cambiar `JWT_SECRET_KEY` en producción

## 📄 Licencia

ISC

## 👤 Autor

**Edinson Mendoza**
- Email: emmendoza2794@gmail.com

---

**Nota**: Este es un proyecto base. Personaliza según tus necesidades específicas.
