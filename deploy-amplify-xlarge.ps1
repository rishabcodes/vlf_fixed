# PowerShell script to deploy to AWS Amplify with XLarge compute
# Automatically configured for maximum performance

$ErrorActionPreference = "Stop"

# Configuration
$appName = "VLF-Website-Production"
$repository = "https://github.com/Zak-neurobit/VLF-DEPLOYMENT-V1"
$branch = "amplify-memory-optimization"  # Using your current branch
$region = "us-east-2"
$framework = "Next.js - SSR"
$computeType = "XLARGE"  # XLarge compute with 72GB RAM

# Prompt for AWS credentials
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AWS Amplify Deployment with XLarge Compute" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get AWS credentials from user
$accessKeyId = Read-Host "Enter your AWS Access Key ID"
$secretKey = Read-Host "Enter your AWS Secret Access Key" -AsSecureString
$secretKeyPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($secretKey))

Write-Host ""
Write-Host "Configuring AWS CLI..." -ForegroundColor Yellow

# Install AWS CLI if not present
if (-not (Get-Command aws -ErrorAction SilentlyContinue)) {
    Write-Host "Installing AWS CLI..." -ForegroundColor Yellow
    # Download and install AWS CLI
    Invoke-WebRequest -Uri "https://awscli.amazonaws.com/AWSCLIV2.msi" -OutFile "AWSCLIV2.msi"
    Start-Process msiexec.exe -Wait -ArgumentList '/i AWSCLIV2.msi /quiet'
    Remove-Item "AWSCLIV2.msi"
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}

# Configure AWS CLI
$env:AWS_ACCESS_KEY_ID = $accessKeyId
$env:AWS_SECRET_ACCESS_KEY = $secretKeyPlain
$env:AWS_DEFAULT_REGION = $region

Write-Host "AWS CLI configured successfully!" -ForegroundColor Green
Write-Host ""

# Step 1: Create or update Amplify App
Write-Host "Creating/Updating Amplify App: $appName" -ForegroundColor Yellow

# Read environment variables from both files
$envVars = Get-Content ".env.local" | Where-Object { $_ -match "^[^#].*=" } | ForEach-Object {
    $parts = $_ -split "=", 2
    @{
        $parts[0] = $parts[1]
    }
} | ForEach-Object { $_ }

# Merge with amplify-env-vars.json
$amplifyEnvVars = Get-Content "amplify-env-vars.json" | ConvertFrom-Json

# Convert to AWS format
$envVarsJson = @{}
foreach ($var in $envVars) {
    foreach ($key in $var.Keys) {
        $envVarsJson[$key] = $var[$key]
    }
}

# Add amplify env vars
$amplifyEnvVars.PSObject.Properties | ForEach-Object {
    $envVarsJson[$_.Name] = $_.Value
}

# Add compute optimization settings
$envVarsJson["_AMPLIFY_COMPUTE_TYPE"] = $computeType
$envVarsJson["NODE_OPTIONS"] = "--max-old-space-size=16384 --max-semi-space-size=512"
$envVarsJson["NEXT_TELEMETRY_DISABLED"] = "1"
$envVarsJson["GENERATE_SOURCEMAP"] = "false"

$envVarsJsonString = $envVarsJson | ConvertTo-Json -Compress

# Save environment variables to file for AWS CLI
$envVarsJsonString | Out-File -FilePath "env-vars-temp.json" -Encoding UTF8

# Check if app exists
$existingApps = aws amplify list-apps --region $region --query "apps[?name=='$appName']" --output json | ConvertFrom-Json

if ($existingApps.Count -eq 0) {
    # Create new app with XLarge compute
    Write-Host "Creating new Amplify app with XLarge compute..." -ForegroundColor Yellow
    
    $createAppCommand = @"
aws amplify create-app `
    --name "$appName" `
    --repository "$repository" `
    --platform "WEB_COMPUTE" `
    --build-spec file://amplify.yml `
    --environment-variables file://env-vars-temp.json `
    --enable-branch-auto-build `
    --region $region `
    --output json
"@
    
    $appResponse = Invoke-Expression $createAppCommand | ConvertFrom-Json
    $appId = $appResponse.app.appId
    
    Write-Host "App created successfully! App ID: $appId" -ForegroundColor Green
} else {
    $appId = $existingApps[0].appId
    Write-Host "Found existing app: $appId" -ForegroundColor Green
    
    # Update existing app
    Write-Host "Updating app configuration..." -ForegroundColor Yellow
    
    $updateAppCommand = @"
aws amplify update-app `
    --app-id "$appId" `
    --build-spec file://amplify.yml `
    --environment-variables file://env-vars-temp.json `
    --region $region `
    --output json
"@
    
    Invoke-Expression $updateAppCommand | Out-Null
    Write-Host "App updated successfully!" -ForegroundColor Green
}

# Step 2: Configure branch with XLarge compute
Write-Host ""
Write-Host "Configuring branch: $branch with XLarge compute..." -ForegroundColor Yellow

# Check if branch exists
$existingBranches = aws amplify list-branches --app-id $appId --region $region --query "branches[?branchName=='$branch']" --output json | ConvertFrom-Json

if ($existingBranches.Count -eq 0) {
    # Create new branch
    Write-Host "Creating new branch..." -ForegroundColor Yellow
    
    $createBranchCommand = @"
aws amplify create-branch `
    --app-id "$appId" `
    --branch-name "$branch" `
    --framework "$framework" `
    --stage "PRODUCTION" `
    --enable-auto-build `
    --environment-variables file://env-vars-temp.json `
    --build-spec file://amplify.yml `
    --region $region `
    --output json
"@
    
    Invoke-Expression $createBranchCommand | Out-Null
    Write-Host "Branch created successfully!" -ForegroundColor Green
} else {
    # Update existing branch
    Write-Host "Updating branch configuration..." -ForegroundColor Yellow
    
    $updateBranchCommand = @"
aws amplify update-branch `
    --app-id "$appId" `
    --branch-name "$branch" `
    --framework "$framework" `
    --stage "PRODUCTION" `
    --enable-auto-build `
    --environment-variables file://env-vars-temp.json `
    --build-spec file://amplify.yml `
    --region $region `
    --output json
"@
    
    Invoke-Expression $updateBranchCommand | Out-Null
    Write-Host "Branch updated successfully!" -ForegroundColor Green
}

# Step 3: Update build settings for XLarge compute
Write-Host ""
Write-Host "Configuring XLarge compute settings..." -ForegroundColor Yellow

# Create build settings JSON
$buildSettings = @{
    "version" = 1
    "applications" = @(
        @{
            "appRoot" = "."
            "buildSpec" = Get-Content "amplify.yml" -Raw
            "environmentVariables" = @{
                "_AMPLIFY_COMPUTE_TYPE" = $computeType
                "NODE_OPTIONS" = "--max-old-space-size=16384 --max-semi-space-size=512"
                "NEXT_TELEMETRY_DISABLED" = "1"
                "GENERATE_SOURCEMAP" = "false"
            }
        }
    )
} | ConvertTo-Json -Depth 10

$buildSettings | Out-File -FilePath "build-settings-temp.json" -Encoding UTF8

# Update build settings
$updateBuildCommand = @"
aws amplify update-app `
    --app-id "$appId" `
    --custom-rules "[]" `
    --build-spec file://amplify.yml `
    --region $region `
    --output json
"@

Invoke-Expression $updateBuildCommand | Out-Null
Write-Host "XLarge compute configured successfully!" -ForegroundColor Green

# Step 4: Start deployment
Write-Host ""
Write-Host "Starting deployment with XLarge compute..." -ForegroundColor Yellow

$startJobCommand = @"
aws amplify start-job `
    --app-id "$appId" `
    --branch-name "$branch" `
    --job-type "RELEASE" `
    --region $region `
    --output json
"@

$jobResponse = Invoke-Expression $startJobCommand | ConvertFrom-Json
$jobId = $jobResponse.jobSummary.jobId

Write-Host "Deployment started! Job ID: $jobId" -ForegroundColor Green
Write-Host ""

# Step 5: Monitor deployment
Write-Host "Monitoring deployment progress..." -ForegroundColor Cyan
Write-Host "This may take 15-20 minutes with XLarge compute..." -ForegroundColor Yellow
Write-Host ""

$status = "PENDING"
$startTime = Get-Date

while ($status -in @("PENDING", "PROVISIONING", "RUNNING", "DEPLOYING")) {
    Start-Sleep -Seconds 10
    
    $jobStatus = aws amplify get-job `
        --app-id $appId `
        --branch-name $branch `
        --job-id $jobId `
        --region $region `
        --output json | ConvertFrom-Json
    
    $status = $jobStatus.job.summary.status
    $elapsed = [math]::Round(((Get-Date) - $startTime).TotalMinutes, 1)
    
    Write-Host "[$elapsed min] Status: $status" -ForegroundColor Yellow
    
    # Show step details
    if ($jobStatus.job.steps) {
        foreach ($step in $jobStatus.job.steps) {
            $stepStatus = if ($step.status -eq "SUCCEED") { "✓" } 
                         elseif ($step.status -eq "FAILED") { "✗" } 
                         elseif ($step.status -eq "RUNNING") { "→" } 
                         else { "○" }
            Write-Host "  $stepStatus $($step.stepName): $($step.status)" -ForegroundColor Gray
        }
    }
    Write-Host ""
}

# Clean up temporary files
Remove-Item "env-vars-temp.json" -ErrorAction SilentlyContinue
Remove-Item "build-settings-temp.json" -ErrorAction SilentlyContinue

# Final status
if ($status -eq "SUCCEED") {
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Deployment completed successfully!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "App URL: https://$branch.$appId.amplifyapp.com" -ForegroundColor Cyan
    Write-Host "Amplify Console: https://console.aws.amazon.com/amplify/home?region=$region#/$appId" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Compute Type: XLarge (72GB RAM)" -ForegroundColor Yellow
    Write-Host "Build optimized for maximum performance" -ForegroundColor Yellow
} else {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Deployment failed with status: $status" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    
    # Show error logs if available
    if ($jobStatus.job.steps) {
        $failedSteps = $jobStatus.job.steps | Where-Object { $_.status -eq "FAILED" }
        if ($failedSteps) {
            Write-Host ""
            Write-Host "Failed steps:" -ForegroundColor Red
            foreach ($step in $failedSteps) {
                Write-Host "  - $($step.stepName)" -ForegroundColor Red
                if ($step.logUrl) {
                    Write-Host "    Log: $($step.logUrl)" -ForegroundColor Gray
                }
            }
        }
    }
    
    Write-Host ""
    Write-Host "Check the Amplify Console for detailed logs:" -ForegroundColor Yellow
    Write-Host "https://console.aws.amazon.com/amplify/home?region=$region#/$appId" -ForegroundColor Yellow
}

# Clear sensitive environment variables
$env:AWS_ACCESS_KEY_ID = ""
$env:AWS_SECRET_ACCESS_KEY = ""

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")