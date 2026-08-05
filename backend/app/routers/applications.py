from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from .. import crud, schemas, models
from ..db import get_db

router = APIRouter(prefix="/applications", tags=["applications"])


@router.get("/", response_model=List[schemas.Application])
def list_applications(
    status: Optional[models.Status] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """Get all applications, optionally filtered by status or search term."""
    return crud.get_applications(db, status=status, search=search)


@router.get("/{application_id}", response_model=schemas.Application)
def get_application(application_id: int, db: Session = Depends(get_db)):
    """Get a single application by ID."""
    db_app = crud.get_application(db, application_id)
    if db_app is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return db_app


@router.post("/", response_model=schemas.Application, status_code=201)
def create_application(app_data: schemas.ApplicationCreate, db: Session = Depends(get_db)):
    """Create a new application record."""
    return crud.create_application(db, app_data)


@router.patch("/{application_id}", response_model=schemas.Application)
def update_application(
    application_id: int, app_data: schemas.ApplicationUpdate, db: Session = Depends(get_db)
):
    """Partially update an application — only fields you send are changed."""
    db_app = crud.get_application(db, application_id)
    if db_app is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return crud.update_application(db, db_app, app_data)


@router.delete("/{application_id}", response_model=dict)
def delete_application(application_id: int, db: Session = Depends(get_db)):
    """Delete an application."""
    db_app = crud.get_application(db, application_id)
    if db_app is None:
        raise HTTPException(status_code=404, detail="Application not found")

    deleted = schemas.Application.model_validate(db_app)
    crud.delete_application(db, db_app)
    return {"message": "Application deleted", "deleted_app": deleted}