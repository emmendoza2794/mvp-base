#!/bin/bash

# Levanta back + front con logs prefijados
# Uso: ./dev.sh            (usa front/, o front-vue/ si aún no corriste setup-project.sh)
#      ./dev.sh react      (en el template, usa front-react/)

# Colores para distinguir logs
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BACK_COLOR=$BLUE
FRONT_COLOR=$GREEN

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACK_DIR="$ROOT_DIR/back"
if [ -d "$ROOT_DIR/front" ]; then
    FRONT_DIR="$ROOT_DIR/front"
else
    FRONT_DIR="$ROOT_DIR/front-${1:-vue}"
fi
[ -d "$FRONT_DIR" ] || { echo -e "${RED}[dev]${NC} No existe $FRONT_DIR"; exit 1; }

# Función para prefijar logs
prefix_logs() {
    local prefix="$1"
    local color="$2"
    while IFS= read -r line; do
        echo -e "${color}${prefix}${NC} $line"
    done
}

# Limpieza al salir
cleanup() {
    echo -e "\n${YELLOW}[dev]${NC} Cerrando procesos..."
    kill "$BACK_PID" "$FRONT_PID" 2>/dev/null
    wait "$BACK_PID" "$FRONT_PID" 2>/dev/null
    echo -e "${YELLOW}[dev]${NC} Listo."
    exit 0
}

trap cleanup SIGINT SIGTERM

echo -e "${YELLOW}[dev]${NC} Levantando back (uvicorn)..."
cd "$BACK_DIR"
poetry run uvicorn src.main:app --reload 2>&1 | prefix_logs "[back]" "$BACK_COLOR" &
BACK_PID=$!

echo -e "${YELLOW}[dev]${NC} Levantando front (bun run dev en $(basename "$FRONT_DIR"))..."
cd "$FRONT_DIR"
bun run dev 2>&1 | prefix_logs "[front]" "$FRONT_COLOR" &
FRONT_PID=$!

echo -e "${YELLOW}[dev]${NC} Ambos procesos corriendo. Ctrl+C para detener."

# Esperar a que alguno muera
wait "$BACK_PID" "$FRONT_PID"
