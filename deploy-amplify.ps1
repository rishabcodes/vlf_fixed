# PowerShell script to deploy to AWS Amplify using REST API
# Uses AWS credentials from ~/.aws/credentials

$ErrorActionPreference = "Stop"

# Configuration
$appName = "VLF-Website-Production"
$repository = "https://github.com/Zak-neurobit/VLF-DEPLOYMENT-V1"
$branch = "master"
$region = "us-east-2"
$framework = "Next.js - SSR"

# Read AWS credentials
$credFile = "$env:USERPROFILE\.aws\credentials"
$configFile = "$env:USERPROFILE\.aws\config"

if (-not (Test-Path $credFile)) {
    Write-Error "AWS credentials file not found at $credFile"
    exit 1
}

# Parse credentials
$credentials = Get-Content $credFile | Out-String
$accessKeyId = [regex]::Match($credentials, 'aws_access_key_id\s*=\s*(.+)').Groups[1].Value.Trim()
$secretKey = [regex]::Match($credentials, 'aws_secret_access_key\s*=\s*(.+)').Groups[1].Value.Trim()

if (-not $accessKeyId -or -not $secretKey) {
    Write-Error "Could not parse AWS credentials"
    exit 1
}

Write-Host "AWS Credentials loaded successfully" -ForegroundColor Green
Write-Host "Region: $region" -ForegroundColor Cyan
Write-Host ""

# Function to sign AWS requests
function Get-AWSSignature {
    param(
        [string]$method,
        [string]$uri,
        [string]$queryString,
        [string]$payload,
        [string]$region,
        [string]$service,
        [string]$accessKey,
        [string]$secretKey
    )
    
    $date = (Get-Date).ToUniversalTime().ToString("yyyyMMdd'T'HHmmss'Z'")
    $dateStamp = (Get-Date).ToUniversalTime().ToString("yyyyMMdd")
    
    # Create canonical request
    $canonicalUri = $uri
    $canonicalQueryString = $queryString
    $canonicalHeaders = "host:amplify.$region.amazonaws.com`nx-amz-date:$date`n"
    $signedHeaders = "host;x-amz-date"
    $payloadHash = [System.BitConverter]::ToString([System.Security.Cryptography.SHA256]::Create().ComputeHash([System.Text.Encoding]::UTF8.GetBytes($payload))).Replace("-","").ToLower()
    
    $canonicalRequest = "$method`n$canonicalUri`n$canonicalQueryString`n$canonicalHeaders`n$signedHeaders`n$payloadHash"
    
    # Create string to sign
    $algorithm = "AWS4-HMAC-SHA256"
    $credentialScope = "$dateStamp/$region/$service/aws4_request"
    $canonicalRequestHash = [System.BitConverter]::ToString([System.Security.Cryptography.SHA256]::Create().ComputeHash([System.Text.Encoding]::UTF8.GetBytes($canonicalRequest))).Replace("-","").ToLower()
    
    $stringToSign = "$algorithm`n$date`n$credentialScope`n$canonicalRequestHash"
    
    # Calculate signature
    $kSecret = [System.Text.Encoding]::UTF8.GetBytes("AWS4$secretKey")
    $kDate = [System.Security.Cryptography.HMACSHA256]::new($kSecret).ComputeHash([System.Text.Encoding]::UTF8.GetBytes($dateStamp))
    $kRegion = [System.Security.Cryptography.HMACSHA256]::new($kDate).ComputeHash([System.Text.Encoding]::UTF8.GetBytes($region))
    $kService = [System.Security.Cryptography.HMACSHA256]::new($kRegion).ComputeHash([System.Text.Encoding]::UTF8.GetBytes($service))
    $kSigning = [System.Security.Cryptography.HMACSHA256]::new($kService).ComputeHash([System.Text.Encoding]::UTF8.GetBytes("aws4_request"))
    
    $signature = [System.BitConverter]::ToString([System.Security.Cryptography.HMACSHA256]::new($kSigning).ComputeHash([System.Text.Encoding]::UTF8.GetBytes($stringToSign))).Replace("-","").ToLower()
    
    # Create authorization header
    $authorization = "$algorithm Credential=$accessKey/$credentialScope, SignedHeaders=$signedHeaders, Signature=$signature"
    
    return @{
        Authorization = $authorization
        XAmzDate = $date
    }
}

# Step 1: Create Amplify App
Write-Host "Creating Amplify App: $appName" -ForegroundColor Yellow

$createAppBody = @{
    name = $appName
    repository = $repository
    platform = "WEB_COMPUTE"
    buildSpec = Get-Content "amplify.yml" -Raw
    environmentVariables = Get-Content "amplify-env-vars.json" -Raw | ConvertFrom-Json
    autoBranchCreationConfig = @{
        stage = "PRODUCTION"
        framework = $framework
        enableAutoBuild = $true
        enablePerformanceMode = $false
        buildSpec = Get-Content "amplify.yml" -Raw
    }
} | ConvertTo-Json -Depth 10

$headers = Get-AWSSignature -method "POST" -uri "/apps" -queryString "" -payload $createAppBody -region $region -service "amplify" -accessKey $accessKeyId -secretKey $secretKey

try {
    $response = Invoke-RestMethod -Uri "https://amplify.$region.amazonaws.com/apps" `
        -Method POST `
        -Headers @{
            "Authorization" = $headers.Authorization
            "X-Amz-Date" = $headers.XAmzDate
            "Content-Type" = "application/x-amz-json-1.1"
            "X-Amz-Target" = "Amplify.CreateApp"
        } `
        -Body $createAppBody
    
    $appId = $response.app.appId
    Write-Host "App created successfully! App ID: $appId" -ForegroundColor Green
    
} catch {
    if ($_.Exception.Response.StatusCode -eq "Conflict") {
        Write-Host "App already exists, fetching existing app..." -ForegroundColor Yellow
        
        # List apps to find existing one
        $listHeaders = Get-AWSSignature -method "GET" -uri "/apps" -queryString "" -payload "" -region $region -service "amplify" -accessKey $accessKeyId -secretKey $secretKey
        
        $apps = Invoke-RestMethod -Uri "https://amplify.$region.amazonaws.com/apps" `
            -Method GET `
            -Headers @{
                "Authorization" = $listHeaders.Authorization
                "X-Amz-Date" = $listHeaders.XAmzDate
            }
        
        $app = $apps.apps | Where-Object { $_.name -eq $appName }
        if ($app) {
            $appId = $app.appId
            Write-Host "Found existing app: $appId" -ForegroundColor Green
        } else {
            Write-Error "Could not find app"
            exit 1
        }
    } else {
        Write-Error "Failed to create app: $_"
        exit 1
    }
}

# Step 2: Create/Update Branch
Write-Host "`nConfiguring branch: $branch" -ForegroundColor Yellow

$branchBody = @{
    branchName = $branch
    framework = $framework
    stage = "PRODUCTION"
    enableAutoBuild = $true
    environmentVariables = Get-Content "amplify-env-vars.json" -Raw | ConvertFrom-Json
    buildSpec = Get-Content "amplify.yml" -Raw
} | ConvertTo-Json -Depth 10

$branchHeaders = Get-AWSSignature -method "POST" -uri "/apps/$appId/branches" -queryString "" -payload $branchBody -region $region -service "amplify" -accessKey $accessKeyId -secretKey $secretKey

try {
    $branchResponse = Invoke-RestMethod -Uri "https://amplify.$region.amazonaws.com/apps/$appId/branches" `
        -Method POST `
        -Headers @{
            "Authorization" = $branchHeaders.Authorization
            "X-Amz-Date" = $branchHeaders.XAmzDate
            "Content-Type" = "application/x-amz-json-1.1"
            "X-Amz-Target" = "Amplify.CreateBranch"
        } `
        -Body $branchBody
    
    Write-Host "Branch configured successfully!" -ForegroundColor Green
    
} catch {
    if ($_.Exception.Response.StatusCode -eq "Conflict") {
        Write-Host "Branch already exists, updating..." -ForegroundColor Yellow
        
        $updateHeaders = Get-AWSSignature -method "POST" -uri "/apps/$appId/branches/$branch" -queryString "" -payload $branchBody -region $region -service "amplify" -accessKey $accessKeyId -secretKey $secretKey
        
        $updateResponse = Invoke-RestMethod -Uri "https://amplify.$region.amazonaws.com/apps/$appId/branches/$branch" `
            -Method POST `
            -Headers @{
                "Authorization" = $updateHeaders.Authorization
                "X-Amz-Date" = $updateHeaders.XAmzDate
                "Content-Type" = "application/x-amz-json-1.1"
                "X-Amz-Target" = "Amplify.UpdateBranch"
            } `
            -Body $branchBody
        
        Write-Host "Branch updated successfully!" -ForegroundColor Green
    } else {
        Write-Error "Failed to create branch: $_"
    }
}

# Step 3: Start Deployment
Write-Host "`nStarting deployment..." -ForegroundColor Yellow

$deployBody = @{
    jobType = "RELEASE"
} | ConvertTo-Json

$deployHeaders = Get-AWSSignature -method "POST" -uri "/apps/$appId/branches/$branch/jobs" -queryString "" -payload $deployBody -region $region -service "amplify" -accessKey $accessKeyId -secretKey $secretKey

try {
    $jobResponse = Invoke-RestMethod -Uri "https://amplify.$region.amazonaws.com/apps/$appId/branches/$branch/jobs" `
        -Method POST `
        -Headers @{
            "Authorization" = $deployHeaders.Authorization
            "X-Amz-Date" = $deployHeaders.XAmzDate
            "Content-Type" = "application/x-amz-json-1.1"
            "X-Amz-Target" = "Amplify.StartJob"
        } `
        -Body $deployBody
    
    $jobId = $jobResponse.jobSummary.jobId
    Write-Host "Deployment started! Job ID: $jobId" -ForegroundColor Green
    
    # Monitor deployment
    Write-Host "`nMonitoring deployment progress..." -ForegroundColor Cyan
    
    $status = "PENDING"
    while ($status -in @("PENDING", "PROVISIONING", "RUNNING", "DEPLOYING")) {
        Start-Sleep -Seconds 10
        
        $statusHeaders = Get-AWSSignature -method "GET" -uri "/apps/$appId/branches/$branch/jobs/$jobId" -queryString "" -payload "" -region $region -service "amplify" -accessKey $accessKeyId -secretKey $secretKey
        
        $jobStatus = Invoke-RestMethod -Uri "https://amplify.$region.amazonaws.com/apps/$appId/branches/$branch/jobs/$jobId" `
            -Method GET `
            -Headers @{
                "Authorization" = $statusHeaders.Authorization
                "X-Amz-Date" = $statusHeaders.XAmzDate
            }
        
        $status = $jobStatus.job.summary.status
        Write-Host "Status: $status" -ForegroundColor Yellow
        
        if ($jobStatus.job.steps) {
            foreach ($step in $jobStatus.job.steps) {
                Write-Host "  - $($step.stepName): $($step.status)" -ForegroundColor Gray
            }
        }
    }
    
    if ($status -eq "SUCCEED") {
        Write-Host "`nDeployment completed successfully!" -ForegroundColor Green
        Write-Host "App URL: https://$branch.$appId.amplifyapp.com" -ForegroundColor Cyan
    } else {
        Write-Host "`nDeployment failed with status: $status" -ForegroundColor Red
    }
    
} catch {
    Write-Error "Failed to start deployment: $_"
    exit 1
}