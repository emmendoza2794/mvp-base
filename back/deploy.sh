#!/bin/bash

# Script para desplegar MVP Base Backend a AWS Lambda
# Uso: ./deploy.sh [archivo-env]
#   Por defecto usa .env.production si existe, si no .env

set -e

cd "$(dirname "${BASH_SOURCE[0]}")"

STACK_NAME="mvp-base-backend"

echo "🚀 Desplegando MVP Base Backend a AWS Lambda..."

# Verificar que SAM CLI esté instalado
if ! command -v sam &> /dev/null; then
    echo "❌ SAM CLI no está instalado. Por favor instálalo primero:"
    echo "   brew install aws-sam-cli"
    exit 1
fi

# Verificar que AWS CLI esté configurado
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI no está configurado. Por favor configúralo primero:"
    echo "   aws configure"
    exit 1
fi

# Elegir archivo de variables de entorno
if [ -n "$1" ]; then
    ENV_FILE="$1"
elif [ -f ".env.production" ]; then
    ENV_FILE=".env.production"
else
    ENV_FILE=".env"
fi

if [ ! -f "$ENV_FILE" ]; then
    echo "❌ No se encontró $ENV_FILE"
    echo "   cp .env.example .env.production  # y configura los valores de producción"
    exit 1
fi

echo "🔐 Cargando variables desde $ENV_FILE"

# Lee KEY=VALUE del archivo sin ejecutarlo (ignora comentarios y líneas vacías)
get_env() {
    grep -E "^[[:space:]]*$1=" "$ENV_FILE" | tail -n 1 | cut -d '=' -f 2- \
        | sed -e 's/[[:space:]]*$//' -e 's/^"\(.*\)"$/\1/' -e "s/^'\(.*\)'$/\1/"
}

DATABASE_URL="$(get_env DATABASE_URL)"
JWT_SECRET_KEY="$(get_env JWT_SECRET_KEY)"
JWT_ALGORITHM="$(get_env JWT_ALGORITHM)"
JWT_ACCESS_TOKEN_EXPIRE_MINUTES="$(get_env JWT_ACCESS_TOKEN_EXPIRE_MINUTES)"
DEBUG="$(get_env DEBUG)"

if [ -z "$DATABASE_URL" ] || [ -z "$JWT_SECRET_KEY" ]; then
    echo "❌ DATABASE_URL y JWT_SECRET_KEY son obligatorios en $ENV_FILE"
    exit 1
fi

if [[ "$DATABASE_URL" == *"localhost"* || "$DATABASE_URL" == *"127.0.0.1"* ]]; then
    echo "⚠️  DATABASE_URL apunta a localhost; Lambda no podrá conectarse a esa base de datos."
fi

if [[ "$JWT_SECRET_KEY" == change-this* ]]; then
    echo "❌ JWT_SECRET_KEY tiene el valor de ejemplo. Genera uno con: openssl rand -hex 32"
    exit 1
fi

# CloudFormation solo acepta True/False para Debug
case "$(echo "${DEBUG:-False}" | tr '[:upper:]' '[:lower:]')" in
    true|1|yes) DEBUG="True" ;;
    *) DEBUG="False" ;;
esac

PARAMS="DatabaseUrl=\"$DATABASE_URL\" JwtSecretKey=\"$JWT_SECRET_KEY\" Debug=$DEBUG"
[ -n "$JWT_ALGORITHM" ] && PARAMS="$PARAMS JwtAlgorithm=$JWT_ALGORITHM"
[ -n "$JWT_ACCESS_TOKEN_EXPIRE_MINUTES" ] && PARAMS="$PARAMS JwtAccessTokenExpireMinutes=$JWT_ACCESS_TOKEN_EXPIRE_MINUTES"

# Verificar que pip-tools esté instalado
if ! command -v pip-compile &> /dev/null; then
    echo "📦 Instalando pip-tools..."
    pip3 install pip-tools
    echo "✅ pip-tools instalado exitosamente"
fi

# Generar requirements.txt desde pyproject.toml (lo usa sam build)
echo "📋 Generando requirements.txt desde pyproject.toml..."
rm -f requirements.txt
pip-compile pyproject.toml -o requirements.txt --strip-extras --quiet
echo "✅ requirements.txt generado exitosamente"

# Build del proyecto
echo "📦 Construyendo el proyecto..."
sam build

# Deploy del proyecto
echo "🚀 Desplegando a AWS (stack: $STACK_NAME)..."
sam deploy \
    --stack-name "$STACK_NAME" \
    --resolve-s3 \
    --capabilities CAPABILITY_IAM \
    --no-confirm-changeset \
    --no-fail-on-empty-changeset \
    --parameter-overrides "$PARAMS"

echo "✅ Deployment exitoso!"
echo "🌐 Tu API está disponible en la URL mostrada arriba (output MvpBaseApi)"
