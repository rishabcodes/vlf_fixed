@echo off
setlocal enabledelayedexpansion

REM Deploy to AWS Amplify using AWS CLI
REM Requires AWS CLI to be installed

echo.
echo ====================================
echo  AWS Amplify Deployment Script
echo  XLarge Compute Configuration
echo ====================================
echo.

REM Configuration
set APP_NAME=VLF-Website-Production
set REPOSITORY=https://github.com/Zak-neurobit/VLF-DEPLOYMENT-V1
set BRANCH=master
set REGION=us-east-2
set FRAMEWORK=Next.js - SSR

REM Check if AWS CLI is available
where aws >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: AWS CLI is not installed or not in PATH
    echo.
    echo Please install AWS CLI from:
    echo https://aws.amazon.com/cli/
    echo.
    echo Or run: msiexec /i AWSCLIV2.msi
    exit /b 1
)

echo AWS CLI found.
aws --version
echo.

REM Set AWS credentials from existing config
set AWS_CONFIG_FILE=%USERPROFILE%\.aws\config
set AWS_SHARED_CREDENTIALS_FILE=%USERPROFILE%\.aws\credentials

REM Step 1: Create Amplify App
echo Creating Amplify App: %APP_NAME%
echo.

REM Create app
aws amplify create-app ^
    --name "%APP_NAME%" ^
    --repository "%REPOSITORY%" ^
    --platform "WEB_COMPUTE" ^
    --build-spec file://amplify.yml ^
    --environment-variables file://amplify-env-vars.json ^
    --enable-branch-auto-build ^
    --region %REGION% > app-response.json 2>&1

REM Check if app was created or already exists
findstr /C:"ResourceAlreadyExistsException" app-response.json >nul
if %errorlevel% equ 0 (
    echo App already exists, fetching app ID...
    for /f "tokens=*" %%a in ('aws amplify list-apps --region %REGION% --query "apps[?name=='%APP_NAME%'].appId" --output text') do set APP_ID=%%a
) else (
    for /f "tokens=*" %%a in ('type app-response.json ^| findstr /R "\"appId\":.*\"" ^| sed "s/.*\"appId\": \"\(.*\)\".*/\1/"') do set APP_ID=%%a
)

if "!APP_ID!"=="" (
    echo ERROR: Could not create or find app
    type app-response.json
    exit /b 1
)

echo App ID: !APP_ID!
echo.

REM Step 2: Configure XLarge compute
echo Configuring XLarge compute type...

aws amplify update-app ^
    --app-id "!APP_ID!" ^
    --build-spec file://amplify.yml ^
    --environment-variables file://amplify-env-vars.json ^
    --region %REGION%

echo.

REM Step 3: Create/Update Branch
echo Configuring branch: %BRANCH%

aws amplify create-branch ^
    --app-id "!APP_ID!" ^
    --branch-name "%BRANCH%" ^
    --framework "%FRAMEWORK%" ^
    --stage "PRODUCTION" ^
    --enable-auto-build ^
    --environment-variables file://amplify-env-vars.json ^
    --build-spec file://amplify.yml ^
    --region %REGION% > branch-response.json 2>&1

findstr /C:"ResourceAlreadyExistsException" branch-response.json >nul
if %errorlevel% equ 0 (
    echo Branch already exists, updating...
    aws amplify update-branch ^
        --app-id "!APP_ID!" ^
        --branch-name "%BRANCH%" ^
        --framework "%FRAMEWORK%" ^
        --stage "PRODUCTION" ^
        --enable-auto-build ^
        --environment-variables file://amplify-env-vars.json ^
        --build-spec file://amplify.yml ^
        --region %REGION%
)

echo.

REM Step 4: Create webhook for GitHub
echo Setting up GitHub webhook...

aws amplify create-webhook ^
    --app-id "!APP_ID!" ^
    --branch-name "%BRANCH%" ^
    --region %REGION% > webhook-response.json 2>&1

findstr /C:"ResourceAlreadyExistsException" webhook-response.json >nul
if %errorlevel% neq 0 (
    for /f "tokens=*" %%a in ('type webhook-response.json ^| findstr /R "\"webhookUrl\":.*\"" ^| sed "s/.*\"webhookUrl\": \"\(.*\)\".*/\1/"') do set WEBHOOK_URL=%%a
    echo Webhook URL: !WEBHOOK_URL!
    echo Please add this webhook URL to your GitHub repository settings
)

echo.

REM Step 5: Start deployment
echo Starting deployment...

aws amplify start-job ^
    --app-id "!APP_ID!" ^
    --branch-name "%BRANCH%" ^
    --job-type "RELEASE" ^
    --region %REGION% > job-response.json

for /f "tokens=*" %%a in ('type job-response.json ^| findstr /R "\"jobId\":.*\"" ^| sed "s/.*\"jobId\": \"\(.*\)\".*/\1/"') do set JOB_ID=%%a

if "!JOB_ID!"=="" (
    echo ERROR: Could not start deployment
    type job-response.json
    exit /b 1
)

echo Deployment started! Job ID: !JOB_ID!
echo.

REM Step 6: Monitor deployment
echo Monitoring deployment progress...
echo.

:monitor_loop
timeout /t 10 /nobreak >nul

aws amplify get-job ^
    --app-id "!APP_ID!" ^
    --branch-name "%BRANCH%" ^
    --job-id "!JOB_ID!" ^
    --region %REGION% > job-status.json

for /f "tokens=*" %%a in ('type job-status.json ^| findstr /R "\"status\":.*\"" ^| sed "s/.*\"status\": \"\(.*\)\".*/\1/"') do set STATUS=%%a

echo Status: !STATUS!

if "!STATUS!"=="SUCCEED" (
    echo.
    echo ====================================
    echo  Deployment completed successfully!
    echo ====================================
    echo.
    echo App URL: https://%BRANCH%.!APP_ID!.amplifyapp.com
    echo Amplify Console: https://console.aws.amazon.com/amplify/home?region=%REGION%#/!APP_ID!
    goto :end
)

if "!STATUS!"=="FAILED" (
    echo.
    echo ERROR: Deployment failed
    echo Check the Amplify Console for details
    exit /b 1
)

if "!STATUS!"=="CANCELLED" (
    echo.
    echo Deployment was cancelled
    exit /b 1
)

goto :monitor_loop

:end
echo.
echo Deployment complete!

REM Cleanup temporary files
del app-response.json 2>nul
del branch-response.json 2>nul
del webhook-response.json 2>nul
del job-response.json 2>nul
del job-status.json 2>nul

endlocal