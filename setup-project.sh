#!/usr/bin/env bash

# Script de inicialización para personalizar el proyecto creado desde MVP Base
# Uso: ./setup-project.sh

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

info()  { echo -e "${BLUE}›${NC} $1"; }
ok()    { echo -e "${GREEN}✔${NC} $1"; }
warn()  { echo -e "${YELLOW}⚠${NC}  $1"; }
fail()  { echo -e "${RED}✖${NC} $1"; exit 1; }

# sed -i portable (GNU sed en Linux, BSD sed en macOS)
if sed --version >/dev/null 2>&1; then
    sed_i() { sed -i "$@"; }
else
    sed_i() { sed -i '' "$@"; }
fi

# Escapa un texto para usarlo como reemplazo en sed (/, & y \)
escape() { printf '%s' "$1" | sed -e 's/[\/&\\]/\\&/g'; }

# Reemplaza literalmente $1 por $2 en los archivos indicados
replace() {
    local from to
    from="$(printf '%s' "$1" | sed -e 's/[]\/$*.^[]/\\&/g')"
    to="$(escape "$2")"
    shift 2
    for file in "$@"; do
        [ -f "$file" ] && sed_i "s/${from}/${to}/g" "$file"
    done
    return 0
}

ask() {
    local prompt="$1" default="${2:-}" answer
    if [ -n "$default" ]; then
        read -r -p "$prompt [$default]: " answer
        echo "${answer:-$default}"
    else
        read -r -p "$prompt: " answer
        echo "$answer"
    fi
}

echo ""
echo "🚀 MVP Base - Setup del Proyecto"
echo "=================================="
echo ""

# Validaciones previas
[ -f back/pyproject.toml ] && [ -f front/package.json ] || fail "Ejecuta este script desde la raíz del proyecto."

if ! grep -q '^name = "mvp-base"' back/pyproject.toml; then
    warn "Parece que el proyecto ya fue configurado (back/pyproject.toml no se llama 'mvp-base')."
    CONTINUE="$(ask "¿Continuar de todas formas? (s/N)" "N")"
    [[ "$CONTINUE" =~ ^[sSyY]$ ]] || exit 0
fi

# Datos del proyecto
while true; do
    PROJECT_NAME="$(ask "📦 Nombre del proyecto en minúsculas y con guiones (ej: mi-app)")"
    if [[ "$PROJECT_NAME" =~ ^[a-z][a-z0-9-]*[a-z0-9]$ ]]; then
        break
    fi
    warn "Usa solo minúsculas, números y guiones (debe empezar con letra)."
done

# mi-app -> "Mi App", "MiApp", "mi_app"
DEFAULT_DISPLAY="$(echo "$PROJECT_NAME" | tr '-' ' ' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)} 1')"
DISPLAY_NAME="$(ask "🏷️  Nombre visible en la app" "$DEFAULT_DISPLAY")"
PASCAL_NAME="$(echo "$DEFAULT_DISPLAY" | tr -d ' ')"
SNAKE_NAME="${PROJECT_NAME//-/_}"

DESCRIPTION="$(ask "📝 Descripción del proyecto")"
AUTHOR_NAME="$(ask "👤 Nombre del autor" "$(git config user.name 2>/dev/null || true)")"
AUTHOR_EMAIL="$(ask "📧 Email del autor" "$(git config user.email 2>/dev/null || true)")"

echo ""
echo "Resumen:"
echo "  Proyecto:     $PROJECT_NAME"
echo "  Nombre:       $DISPLAY_NAME"
echo "  Base de datos: $SNAKE_NAME"
echo "  Lambda:       $PROJECT_NAME-backend"
echo "  Autor:        ${AUTHOR_NAME:-(sin cambios)} ${AUTHOR_EMAIL:+<$AUTHOR_EMAIL>}"
echo ""
CONFIRM="$(ask "¿Aplicar cambios? (S/n)" "S")"
[[ "$CONFIRM" =~ ^[sSyY]$ ]] || { echo "Cancelado."; exit 0; }

echo ""

# 1. Reemplazar nombres del template en todos los archivos versionados
info "Renombrando 'MVP Base' → '$DISPLAY_NAME' en el código..."
FILES=()
while IFS= read -r file; do
    FILES+=("$file")
done < <(git ls-files 2>/dev/null | grep -v -E '(^setup-project\.sh$|\.lock$|package-lock\.json$)' \
    | while IFS= read -r f; do [ -f "$f" ] && grep -Il -E 'MVP Base|mvp-base|mvp_base|MvpBase' "$f" 2>/dev/null || true; done)

if [ ${#FILES[@]} -gt 0 ]; then
    replace "MVP Base" "$DISPLAY_NAME" "${FILES[@]}"
    replace "mvp-base" "$PROJECT_NAME" "${FILES[@]}"
    replace "mvp_base" "$SNAKE_NAME" "${FILES[@]}"
    replace "MvpBase" "$PASCAL_NAME" "${FILES[@]}"
fi
ok "${#FILES[@]} archivos actualizados"

# 2. Backend: pyproject.toml
info "Actualizando back/pyproject.toml..."
[ -n "$DESCRIPTION" ] && sed_i "s/^description = \".*\"/description = \"$(escape "$DESCRIPTION")\"/" back/pyproject.toml
[ -n "$AUTHOR_NAME" ] && sed_i "s/{name = \"[^\"]*\"/{name = \"$(escape "$AUTHOR_NAME")\"/" back/pyproject.toml
[ -n "$AUTHOR_EMAIL" ] && sed_i "s/email = \"[^\"]*\"}/email = \"$(escape "$AUTHOR_EMAIL")\"}/" back/pyproject.toml

# 3. Frontend: package.json y lockfiles
info "Actualizando front/package.json..."
replace '"name": "front"' "\"name\": \"$PROJECT_NAME-front\"" front/package.json front/package-lock.json front/bun.lock
[ -n "$DESCRIPTION" ] && sed_i "s/\"description\": \"[^\"]*\"/\"description\": \"$(escape "$DESCRIPTION")\"/" front/package.json
[ -n "$AUTHOR_NAME" ] && sed_i "s/\"author\": \"[^\"]*\"/\"author\": \"$(escape "$AUTHOR_NAME")\"/" front/package.json

# 4. README: descripción y autor
info "Actualizando README.md..."
[ -n "$DESCRIPTION" ] && sed_i "1,5s/^> .*/> $(escape "$DESCRIPTION")/" README.md
[ -n "$AUTHOR_NAME" ] && replace "Edinson Mendoza" "$AUTHOR_NAME" README.md
[ -n "$AUTHOR_EMAIL" ] && replace "emmendoza2794@gmail.com" "$AUTHOR_EMAIL" README.md

# 5. Variables de entorno del backend con JWT secret aleatorio
JWT_SECRET="$(openssl rand -hex 32 2>/dev/null || python3 -c "import secrets; print(secrets.token_hex(32))")"
if [ ! -f back/.env ]; then
    info "Creando back/.env..."
    cp back/.env.example back/.env
    sed_i "s/^JWT_SECRET_KEY=.*/JWT_SECRET_KEY=$JWT_SECRET/" back/.env
    ok "back/.env creado con un JWT_SECRET_KEY aleatorio"
else
    warn "back/.env ya existe, no se modificó"
fi

ok "¡Proyecto configurado!"
echo ""

# 6. Instalar dependencias (opcional)
INSTALL="$(ask "📦 ¿Instalar dependencias ahora? (poetry + bun/npm) (S/n)" "S")"
if [[ "$INSTALL" =~ ^[sSyY]$ ]]; then
    if command -v poetry >/dev/null 2>&1; then
        info "Instalando backend (poetry install)..."
        (cd back && poetry install --no-root)
    else
        warn "Poetry no está instalado: https://python-poetry.org/docs/#installation"
    fi

    if command -v bun >/dev/null 2>&1; then
        info "Instalando frontend (bun install)..."
        (cd front && bun install)
    elif command -v npm >/dev/null 2>&1; then
        info "Instalando frontend (npm install)..."
        (cd front && npm install)
    else
        warn "No se encontró bun ni npm para instalar el frontend"
    fi
fi

echo ""
echo "📋 Siguientes pasos:"
echo ""
echo "  1. Configura DATABASE_URL en back/.env"
echo "     (crea la base de datos: createdb $SNAKE_NAME)"
echo "  2. Levanta back y front juntos:"
echo "     ./dev.sh"
echo "  3. Abre http://localhost:3000 (front) y http://localhost:8000/docs (API)"
echo ""
echo "  Para desplegar: crea back/.env.production con los valores de producción y corre back/deploy.sh"
echo ""
echo "📚 Consulta README.md para más información"
echo ""
