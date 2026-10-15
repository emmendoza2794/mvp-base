@echo off
setlocal EnableExtensions EnableDelayedExpansion

rem Script de inicializacion para personalizar el proyecto creado desde MVP Base (Windows)
rem Uso: setup-project.bat
rem
rem Notas para editar este archivo:
rem - Los mensajes van sin tildes: cmd lee el .bat con la pagina de codigos de la consola.
rem   Lo que escribe el usuario si conserva sus tildes (viaja a PowerShell como variable de entorno).
rem - Los cambios en archivos se hacen con PowerShell (incluido en Windows) para respetar UTF-8.
rem   El codigo PowerShell va en la variable PSCODE y no puede contener comillas dobles,
rem   signos de exclamacion ni porcentajes (usa $q para una comilla doble).

cd /d "%~dp0"
set "PS=powershell -NoProfile -ExecutionPolicy Bypass -Command"

echo.
echo MVP Base - Setup del Proyecto
echo ==================================
echo.

rem Validaciones previas
if not exist "back\pyproject.toml" (
    echo [X] Ejecuta este script desde la raiz del proyecto.
    exit /b 1
)

set "FRONTEND=none"
if exist "front-vue\package.json" if exist "front-react\package.json" set "FRONTEND=pending"
rem Si front\ ya existe, el frontend fue elegido en una ejecucion anterior
if exist "front\package.json" set "FRONTEND="
if "!FRONTEND!"=="none" (
    echo [X] No se encontro el frontend: front\ o front-vue\ + front-react\
    exit /b 1
)

findstr /b /c:"name = \"mvp-base\"" "back\pyproject.toml" >nul
if errorlevel 1 (
    echo [AVISO] Parece que el proyecto ya fue configurado: back\pyproject.toml no se llama 'mvp-base'.
    call :ask CONTINUE "Continuar de todas formas? (s/N)" "N"
    call :is_yes "!CONTINUE!" || exit /b 0
)

rem Datos del proyecto
:ask_project_name
call :ask PROJECT_NAME "Nombre del proyecto en minusculas y con guiones (ej: mi-app)" ""
%PS% "if ($env:PROJECT_NAME -cmatch '^[a-z][a-z0-9-]*[a-z0-9]$') { exit 0 } else { exit 1 }"
if not errorlevel 1 goto project_name_ok
echo [AVISO] Usa solo minusculas, numeros y guiones (debe empezar con letra).
goto ask_project_name
:project_name_ok

rem mi-app -> "Mi App", "MiApp", "mi_app"
for /f "usebackq delims=" %%a in (`%PS% "($env:PROJECT_NAME -split '-').ForEach({ $_.Substring(0,1).ToUpper() + $_.Substring(1) }) -join ' '"`) do set "DEFAULT_DISPLAY=%%a"
call :ask DISPLAY_NAME "Nombre visible en la app" "!DEFAULT_DISPLAY!"
set "PASCAL_NAME=!DEFAULT_DISPLAY: =!"
set "SNAKE_NAME=!PROJECT_NAME:-=_!"

call :git_config GIT_NAME user.name
call :git_config GIT_EMAIL user.email

call :ask DESCRIPTION "Descripcion del proyecto" ""
call :ask AUTHOR_NAME "Nombre del autor" "!GIT_NAME!"
call :ask AUTHOR_EMAIL "Email del autor" "!GIT_EMAIL!"

if not "!FRONTEND!"=="pending" goto frontend_chosen
echo.
echo Frontend:
echo   1^) Vue   - Nuxt 4 + PrimeVue 4
echo   2^) React - Vite + React 19 + PrimeReact 10
:ask_frontend
call :ask FRONT_OPTION "Elige el frontend (1/2)" "1"
if /i "!FRONT_OPTION!"=="1" set "FRONTEND=vue"
if /i "!FRONT_OPTION!"=="vue" set "FRONTEND=vue"
if /i "!FRONT_OPTION!"=="2" set "FRONTEND=react"
if /i "!FRONT_OPTION!"=="react" set "FRONTEND=react"
if not "!FRONTEND!"=="pending" goto frontend_chosen
echo [AVISO] Responde 1 (Vue) o 2 (React).
goto ask_frontend
:frontend_chosen

echo.
echo Resumen:
echo   Proyecto:      !PROJECT_NAME!
echo   Nombre:        !DISPLAY_NAME!
echo   Base de datos: !SNAKE_NAME!
echo   Lambda:        !PROJECT_NAME!-backend
if defined FRONTEND echo   Frontend:      !FRONTEND! (front-!FRONTEND!\ -^> front\)
if defined AUTHOR_NAME (echo   Autor:         !AUTHOR_NAME! ^<!AUTHOR_EMAIL!^>) else (echo   Autor:         sin cambios)
echo.
call :ask CONFIRM "Aplicar cambios? (S/n)" "S"
call :is_yes "!CONFIRM!" || (
    echo Cancelado.
    exit /b 0
)

echo.

rem 0. Dejar solo el frontend elegido en front\
if not defined FRONTEND goto frontend_ready
set "OTHER_FRONTEND=vue"
if "!FRONTEND!"=="vue" set "OTHER_FRONTEND=react"
echo ^> Usando el frontend !FRONTEND! (se elimina front-!OTHER_FRONTEND!\)...
rmdir /s /q "front-!OTHER_FRONTEND!"
ren "front-!FRONTEND!" front
if errorlevel 1 (
    echo [X] No se pudo renombrar front-!FRONTEND!\ a front\. Revisa que no este abierta en otro programa.
    exit /b 1
)
echo [OK] Frontend en front\
:frontend_ready

rem 1. Reemplazar nombres del template en todos los archivos del proyecto (versionados o nuevos, sin ignorados)
echo ^> Renombrando 'MVP Base' -^> '!DISPLAY_NAME!' en el codigo...
set "PSCODE=[Console]::OutputEncoding = [Text.Encoding]::UTF8; $files = git -c core.quotepath=false ls-files --cached --others --exclude-standard; $enc = New-Object System.Text.UTF8Encoding $false; $count = 0; foreach ($f in $files) { if ($f -match '(^setup-project\.(sh|bat)$|\.lock$|package-lock\.json$)') { continue }; if (-not (Test-Path -LiteralPath $f -PathType Leaf)) { continue }; $path = (Resolve-Path -LiteralPath $f).Path; $t = [IO.File]::ReadAllText($path); if ($t -cnotmatch 'MVP Base|mvp-base|mvp_base|MvpBase') { continue }; $t = $t.Replace('MVP Base', $env:DISPLAY_NAME).Replace('mvp-base', $env:PROJECT_NAME).Replace('mvp_base', $env:SNAKE_NAME).Replace('MvpBase', $env:PASCAL_NAME); [IO.File]::WriteAllText($path, $t, $enc); $count++ }; $count"
set "UPDATED=0"
for /f "usebackq delims=" %%a in (`%PS% "Invoke-Expression $env:PSCODE"`) do set "UPDATED=%%a"
echo [OK] !UPDATED! archivos actualizados

rem 2. Backend: pyproject.toml
echo ^> Actualizando back\pyproject.toml...
set "PSCODE=if ($env:DESCRIPTION) { $t = [regex]::Replace($t, '(?m)^description = \x22[^\x22]*\x22', { 'description = ' + $q + $env:DESCRIPTION + $q }) }; if ($env:AUTHOR_NAME) { $t = [regex]::Replace($t, '\{name = \x22[^\x22]*\x22', { '{name = ' + $q + $env:AUTHOR_NAME + $q }) }; if ($env:AUTHOR_EMAIL) { $t = [regex]::Replace($t, 'email = \x22[^\x22]*\x22\}', { 'email = ' + $q + $env:AUTHOR_EMAIL + $q + '}' }) }"
call :edit_file "back\pyproject.toml"

rem 3. Frontend: package.json y lockfiles
echo ^> Actualizando front\package.json...
set "PSCODE=$t = $t.Replace($q + 'name' + $q + ': ' + $q + 'front' + $q, $q + 'name' + $q + ': ' + $q + $env:PROJECT_NAME + '-front' + $q)"
for %%f in ("front\package.json" "front\package-lock.json" "front\bun.lock") do call :edit_file %%f
set "PSCODE=if ($env:DESCRIPTION) { $t = [regex]::Replace($t, '\x22description\x22: \x22[^\x22]*\x22', { $q + 'description' + $q + ': ' + $q + $env:DESCRIPTION + $q }) }; if ($env:AUTHOR_NAME) { $t = [regex]::Replace($t, '\x22author\x22: \x22[^\x22]*\x22', { $q + 'author' + $q + ': ' + $q + $env:AUTHOR_NAME + $q }) }"
call :edit_file "front\package.json"

rem 4. README: descripcion (la cita en las 5 primeras lineas) y autor
echo ^> Actualizando README.md...
set "PSCODE=if ($env:DESCRIPTION) { $lines = $t -split '\n'; for ($i = 0; $i -lt [Math]::Min(5, $lines.Count); $i++) { if ($lines[$i] -match '^> ') { $lines[$i] = '> ' + $env:DESCRIPTION + ($lines[$i] -replace '[^\r]', '') } }; $t = $lines -join [string][char]10 }; if ($env:AUTHOR_NAME) { $t = $t.Replace('Edinson Mendoza', $env:AUTHOR_NAME) }; if ($env:AUTHOR_EMAIL) { $t = $t.Replace('emmendoza2794@gmail.com', $env:AUTHOR_EMAIL) }"
call :edit_file "README.md"

rem 5. Variables de entorno del backend con JWT secret aleatorio
if exist "back\.env" (
    echo [AVISO] back\.env ya existe, no se modifico
) else (
    echo ^> Creando back\.env...
    copy /y "back\.env.example" "back\.env" >nul
    set "PSCODE=$b = New-Object byte[] 32; [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b); $secret = -join ($b | ForEach-Object { $_.ToString('x2') }); $t = [regex]::Replace($t, '(?m)^JWT_SECRET_KEY=[^\r\n]*', { 'JWT_SECRET_KEY=' + $secret })"
    call :edit_file "back\.env"
    echo [OK] back\.env creado con un JWT_SECRET_KEY aleatorio
)

echo [OK] Proyecto configurado.
echo.

rem 6. Instalar dependencias (opcional)
call :ask INSTALL "Instalar dependencias ahora? (poetry + bun/npm) (S/n)" "S"
call :is_yes "!INSTALL!" || goto next_steps

where poetry >nul 2>&1
if errorlevel 1 (
    echo [AVISO] Poetry no esta instalado: https://python-poetry.org/docs/#installation
) else (
    echo ^> Instalando backend: poetry install...
    pushd back
    call poetry install --no-root
    popd
)

where bun >nul 2>&1
if not errorlevel 1 (
    echo ^> Instalando frontend: bun install...
    pushd front
    call bun install
    popd
    goto next_steps
)
where npm >nul 2>&1
if not errorlevel 1 (
    echo ^> Instalando frontend: npm install...
    pushd front
    call npm install
    popd
    goto next_steps
)
echo [AVISO] No se encontro bun ni npm para instalar el frontend

:next_steps
echo.
echo Siguientes pasos:
echo.
echo   1. Configura DATABASE_URL en back\.env
echo      (crea la base de datos: createdb !SNAKE_NAME!)
echo   2. Levanta back y front juntos:
echo      dev.bat
echo   3. Abre http://localhost:3000 (front) y http://localhost:8000/docs (API)
echo.
echo   Para desplegar: crea back\.env.production con los valores de produccion y corre back/deploy.sh
echo   (deploy.sh es un script bash: usalo desde Git Bash o WSL)
echo.
echo Consulta README.md para mas informacion
echo.
exit /b 0


rem ---------------------------------------------------------------------------
rem Subrutinas
rem ---------------------------------------------------------------------------

rem call :ask VARIABLE "Pregunta" "valor por defecto"
:ask
set "%~1="
set "_prompt=%~2"
if not "%~3"=="" set "_prompt=%~2 [%~3]"
set /p "%~1=!_prompt!: "
if not defined %~1 set "%~1=%~3"
exit /b 0

rem call :is_yes "respuesta"  ->  errorlevel 0 si es s/S/y/Y
:is_yes
if /i "%~1"=="s" exit /b 0
if /i "%~1"=="y" exit /b 0
exit /b 1

rem call :git_config VARIABLE clave  ->  valor de git config (respetando tildes)
:git_config
set "%~1="
set "GIT_KEY=%~2"
for /f "usebackq delims=" %%a in (`%PS% "[Console]::OutputEncoding = [Text.Encoding]::UTF8; $v = git config $env:GIT_KEY 2>$null; [Console]::OutputEncoding = [Text.Encoding]::GetEncoding([Globalization.CultureInfo]::CurrentCulture.TextInfo.OEMCodePage); $v"`) do set "%~1=%%a"
exit /b 0

rem call :edit_file "ruta"
rem Lee el archivo como UTF-8 en $t, ejecuta el codigo de PSCODE y lo guarda como UTF-8 sin BOM.
:edit_file
if not exist "%~1" exit /b 0
set "EDIT_PATH=%~f1"
%PS% "$q = [string][char]34; $t = [IO.File]::ReadAllText($env:EDIT_PATH); Invoke-Expression $env:PSCODE; [IO.File]::WriteAllText($env:EDIT_PATH, $t, (New-Object System.Text.UTF8Encoding $false))"
exit /b 0
