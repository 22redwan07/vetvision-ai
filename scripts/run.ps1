# Get the directory where this script lives
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = Split-Path -Parent $scriptDir   # one level up = project root

Write-Host "Starting VetVision AI..." -ForegroundColor Cyan

# Backend (in a new PowerShell window)
Set-Location "$rootDir\backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", ".\venv\Scripts\Activate.ps1; python run.py"

# Frontend (in current window)
Set-Location "$rootDir\frontend"
npm run dev

Write-Host "Backend running on http://localhost:8000" -ForegroundColor Green
Write-Host "Frontend running on http://localhost:3000" -ForegroundColor Green