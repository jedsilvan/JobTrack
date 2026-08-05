# backend/app/main.py
from fastapi import FastAPI
from datetime import datetime

from .routers import applications, stats, tags # Import the new routers
from .schemas import Application

app = FastAPI()

# Include routers
app.include_router(applications.router)
app.include_router(stats.router)
app.include_router(tags.router)

# Health check endpoint
@app.get("/health", response_model=dict)
def health_check():
    return {"status": "healthy"}