@echo off
echo ========================================
echo Zak's Backup Restoration Script
echo ========================================
echo.
echo This will restore all deleted files from the backup.
echo Press Ctrl+C to cancel, or any key to continue...
pause > nul

echo.
echo Restoring directories...

REM Restore complete directories
if exist "Zaks-backup-20250829-201309\agents" (
    echo Restoring src/agents...
    xcopy /E /I /Y "Zaks-backup-20250829-201309\agents" "src\agents"
)

if exist "Zaks-backup-20250829-201309\qwik" (
    echo Restoring src/components/qwik...
    xcopy /E /I /Y "Zaks-backup-20250829-201309\qwik" "src\components\qwik"
)

if exist "Zaks-backup-20250829-201309\animations" (
    echo Restoring src/components/animations...
    xcopy /E /I /Y "Zaks-backup-20250829-201309\animations" "src\components\animations"
)

REM Restore Voice components (except MinimalRetellClient.tsx)
if exist "Zaks-backup-20250829-201309\Voice-components" (
    echo Restoring Voice components...
    for %%f in (Zaks-backup-20250829-201309\Voice-components\*.tsx) do (
        if not "%%~nxf"=="MinimalRetellClient.tsx" (
            copy /Y "%%f" "src\components\Voice\"
        )
    )
)

REM Restore scripts
if exist "Zaks-backup-20250829-201309\scripts" (
    echo Restoring scripts...
    xcopy /Y "Zaks-backup-20250829-201309\scripts\*.*" "scripts\"
)

REM Restore CSS files
if exist "Zaks-backup-20250829-201309\css" (
    echo Restoring CSS files...
    if exist "Zaks-backup-20250829-201309\css\brand.css" copy /Y "Zaks-backup-20250829-201309\css\brand.css" "src\styles\"
    if exist "Zaks-backup-20250829-201309\css\glassmorphic.css" copy /Y "Zaks-backup-20250829-201309\css\glassmorphic.css" "src\styles\"
    if exist "Zaks-backup-20250829-201309\css\theme.css" copy /Y "Zaks-backup-20250829-201309\css\theme.css" "src\design-system\styles\"
)

REM Restore documentation
if exist "Zaks-backup-20250829-201309\docs" (
    echo Restoring documentation...
    for %%f in (Zaks-backup-20250829-201309\docs\HREFLANG_*.md) do (
        copy /Y "%%f" "src\components\SEO\"
    )
    for %%f in (Zaks-backup-20250829-201309\docs\*.md) do (
        set "filename=%%~nxf"
        if "!filename:~0,8!"=="AMPLIFY_" copy /Y "%%f" "."
        if "!filename:~0,4!"=="AWS_" copy /Y "%%f" "."
        if "!filename:~0,4!"=="AWS-" copy /Y "%%f" "."
    )
)

REM Restore misc files
if exist "Zaks-backup-20250829-201309\git-remotes-backup.txt" copy /Y "Zaks-backup-20250829-201309\git-remotes-backup.txt" "."
if exist "Zaks-backup-20250829-201309\aws-deployment-config.json" copy /Y "Zaks-backup-20250829-201309\aws-deployment-config.json" "."
if exist "Zaks-backup-20250829-201309\aws-version.txt" copy /Y "Zaks-backup-20250829-201309\aws-version.txt" "."
if exist "Zaks-backup-20250829-201309\build-optimization.config.js" copy /Y "Zaks-backup-20250829-201309\build-optimization.config.js" "."
if exist "Zaks-backup-20250829-201309\page.example.tsx" copy /Y "Zaks-backup-20250829-201309\page.example.tsx" "src\app\7-proven-strategies-that-immigration-lawyers-use-to-win-complex-cases\"

echo.
echo ========================================
echo Restoration complete!
echo ========================================
echo.
echo All backed up files have been restored.
echo You may need to run 'pnpm install' if dependencies changed.
echo.
pause