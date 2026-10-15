@echo off
setlocal EnableExtensions

rem Levanta back + front en la misma consola (Windows)
rem Uso: dev.bat            (usa front\, o front-vue\ si aun no corriste setup-project.bat)
rem      dev.bat react      (en el template, usa front-react\)
rem
rem El back corre en segundo plano y el front en primer plano. Ctrl+C detiene ambos
rem (si cmd pregunta "Terminar el trabajo por lotes (S/N)?", responde S).

set "ROOT_DIR=%~dp0"
set "BACK_DIR=%ROOT_DIR%back"

set "VARIANT=%~1"
if not defined VARIANT set "VARIANT=vue"
set "FRONT_DIR=%ROOT_DIR%front-%VARIANT%"
if exist "%ROOT_DIR%front\package.json" set "FRONT_DIR=%ROOT_DIR%front"

if not exist "%FRONT_DIR%\package.json" goto missing_front

echo [dev] Levantando back (uvicorn)...
start "" /b /d "%BACK_DIR%" cmd /c poetry run uvicorn src.main:app --reload

for %%d in ("%FRONT_DIR%") do set "FRONT_NAME=%%~nxd"
echo [dev] Levantando front (bun run dev en %FRONT_NAME%)...
echo [dev] Ambos procesos corriendo. Ctrl+C para detener.
cd /d "%FRONT_DIR%"
call bun run dev

echo [dev] Listo.
exit /b 0

:missing_front
echo [dev] No existe %FRONT_DIR%
exit /b 1
