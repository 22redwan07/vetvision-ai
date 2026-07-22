# Get the directory where this script lives
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = Split-Path -Parent $scriptDir   # one level up = project root

Write-Host "Setting up VetVision AI..." -ForegroundColor Cyan

# Backend
Set-Location "$rootDir\backend"
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Write-Host "Backend dependencies installed." -ForegroundColor Green

# Frontend
Set-Location "$rootDir\frontend"
npm install
Write-Host "Frontend dependencies installed." -ForegroundColor Green

Write-Host "Setup complete!" -ForegroundColor Green