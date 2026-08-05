from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional

from ..schemas import Application
from ..db import db

router = APIRouter(prefix="/applications", tags=["applications"])

# Helper function to handle finding an application (used in update/delete)
def find_application(app_id: int) -> Application | None:
    for app in db:
        if app.id == app_id:
            return app
    return None

@router.get("/", response_model=List[Application])
def list_applications(
    status: Optional[str] = None,
    search: Optional[str] = None
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

@router.post("/", response_model=Application, status_code=201)
def create_application(app_data: Application):
    """Create a new application record."""
    # Generate unique ID if not provided
    app_data.id = len(db) + 1
    
    db.append(app_data)
    
    return app_data

@router.patch("/{application_id}", response_model=Application)
def update_application(application_id: int, app_data: Application):
    """Update an existing application."""
    for i, app in enumerate(db):
        if app.id == application_id:
            db[i] = app_data
            return app_data
    
    raise HTTPException(status_code=404, detail="Application not found")

@router.delete("/{application_id}", response_model=dict)
def delete_application(application_id: int):
    """Delete an application."""
    for i, app in enumerate(db):
        if app.id == application_id:
            deleted = db.pop(i)
            return {"message": "Application deleted", "deleted_app": deleted}
    
    raise HTTPException(status_code=404, detail="Application not found")

@router.get("/{application_id}", response_model=Application)
def get_application(application_id: int):
    """Get a single application by ID."""
    for app in db:
        if app.id == application_id:
            return app
    
    raise HTTPException(status_code=404, detail="Application not found")