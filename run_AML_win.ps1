# Set the current working directory
$currentDir = Get-Location

# Define the relative paths to each service from the current directory
$frontendDir = Join-Path $currentDir 'Application\client'
$accountServiceDir = Join-Path $currentDir 'Application\services\account-service'
$apiGatewayDir = Join-Path $currentDir 'Application\api-gateway'

# Function to run commands in the current terminal
function Run-Commands {
    param (
        [string]$dir,
        [string]$cmd
    )

    Write-Host "Navigating to $dir and running commands..."
    if (Test-Path $dir) {
        Set-Location $dir
        Invoke-Expression $cmd
    } else {
        Write-Host "Directory $dir does not exist."
    }
}

# Frontend Terminal
Run-Commands -dir $frontendDir -cmd "npm install; npm start"

# Backend Terminal 1: Account Service
Run-Commands -dir $accountServiceDir -cmd "npm install; node app.js"

# Backend Terminal 2: API Gateway
Run-Commands -dir $apiGatewayDir -cmd "npm install; node app.js"


