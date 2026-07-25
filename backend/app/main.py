# backend/app/main.py
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field
from typing import Optional, List
import re
from datetime import datetime

app = FastAPI()

class Application(BaseModel):
    id: int
    company: str = Field(..., min_length=1)
    role: str = Field(..., min_length=1)
    status: str = Field(...)  # applied | interview | offer | rejected
    salary: Optional[float] = None
    notes: Optional[str] = None
    applied_date: Optional[datetime] = None

# In-memory database (replace with SQLAlchemy later)
db: List[Application] = []

@app.get("/applications", response_model=List[Application])
def list_applications(
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    """Get all applications, optionally filtered by status or search term."""
    results = db.copy()
    
    if status:
        results = [app for app in results if app.status == status]
    
    if search:
        search_lower = search.lower()
        results = [
            app for app in results 
            if search_lower in app.company.lower() or 
               search_lower in app.role.lower() or
               search_lower in (app.notes or "").lower()
        ]
    
    return results

@app.post("/applications", response_model=Application, status_code=201)
def create_application(app_data: Application):
    """Create a new application record."""
    # Generate unique ID if not provided
    app_data.id = len(db) + 1
    
    db.append(app_data)
    
    return app_data

@app.patch("/applications/{application_id}", response_model=Application)
def update_application(application_id: int, app_data: Application):
    """Update an existing application."""
    for i, app in enumerate(db):
        if app.id == application_id:
            db[i] = app_data
            return app_data
    
    raise HTTPException(status_code=404, detail="Application not found")

@app.delete("/applications/{application_id}", response_model=dict)
def delete_application(application_id: int):
    """Delete an application."""
    for i, app in enumerate(db):
        if app.id == application_id:
            deleted = db.pop(i)
            return {"message": "Application deleted", "deleted_app": deleted}
    
    raise HTTPException(status_code=404, detail="Application not found")

@app.get("/stats", response_model=dict)
def get_stats():
    """Get analytics statistics."""
    if not db:
        return {
            "total_applications": 0,
            "applications_by_status": {},
            "conversion_rate": 0.0
        }
    
    total = len(db)
    status_counts = {}
    for app in db:
        status_counts[app.status] = status_counts.get(app.status, 0) + 1
    
    # Calculate conversion rate (interview to offer)
    interview_count = status_counts.get("interview", 0)
    offer_count = status_counts.get("offer", 0)
    
    return {
        "total_applications": total,
        "applications_by_status": status_counts,
        "conversion_rate": round((offer_count / interview_count * 100), 2) if interview_count > 0 else 0.0
    }

@app.post("/tags/extract", response_model=dict)
def extract_tags(job_description: str):
    """Extract keywords/tags from job description."""
    # Simple keyword extraction (replace with ML later)
    tags = []
    
    # Common industry terms
    common_terms = [
        "python", "javascript", "react", "nodejs", "django", 
        "fastapi", "sql", "database", "aws", "docker", "kubernetes"
    ]
    
    job_lower = job_description.lower()
    
    for term in common_terms:
        if term in job_lower:
            tags.append(term)
    
    # Extract company names (basic pattern)
    company_pattern = r'\b[a-zA-Z]+\s+[a-zA-Z]+\s+\d{4}\b'  # Simple placeholder
    companies = re.findall(company_pattern, job_description.lower())
    
    return {
        "tags": tags,
        "companies": companies,
        "confidence_score": len(tags) / max(len(common_terms), 1) * 100
    }

# Error handler for missing application ID
@app.get("/applications/{application_id}", response_model=Application)
def get_application(application_id: int):
    """Get a single application by ID."""
    for app in db:
        if app.id == application_id:
            return app
    
    raise HTTPException(status_code=404, detail="Application not found")

# Health check endpoint
@app.get("/health", response_model=dict)
def health_check():
    return {"status": "healthy"}
