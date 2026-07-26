# JobTrack Backend Startup Script
# Run this file to start the FastAPI backend server

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting JobTrack Backend Server..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

$VENV_PATH = ".venv"

# Check if virtual environment exists at $VENV_PATH
if (-not (Test-Path $VENV_PATH)) {
    Write-Warning "Virtual environment not found at $VENV_PATH"
    Write-Host "Please create it first with: python -m venv $VENV_PATH" -ForegroundColor Red
    exit 1
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Green
& "$VENV_PATH/Scripts/Activate.ps1"

# Wait for activation to complete (simple check)
Start-Sleep -Seconds 2

# Run uvicorn backend server
Write-Host "Starting FastAPI backend with Uvicorn..." -ForegroundColor Green
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# If script exits, deactivate venv
exit