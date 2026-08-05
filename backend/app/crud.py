from typing import Optional
from sqlalchemy.orm import Session

from . import models, schemas


def get_applications(
    db: Session,
    status: Optional[models.Status] = None,
    search: Optional[str] = None,
):
    query = db.query(models.Application)

    if status:
        query = query.filter(models.Application.status == status)

    if search:
        like = f"%{search.lower()}%"
        query = query.filter(
            models.Application.company.ilike(like)
            | models.Application.role.ilike(like)
            | models.Application.notes.ilike(like)
        )

    return query.all()


def get_application(db: Session, application_id: int) -> models.Application | None:
    return db.query(models.Application).filter(models.Application.id == application_id).first()


def create_application(db: Session, app_in: schemas.ApplicationCreate) -> models.Application:
    db_app = models.Application(**app_in.model_dump())
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    return db_app


def update_application(
    db: Session, db_app: models.Application, app_in: schemas.ApplicationUpdate
) -> models.Application:
    for field, value in app_in.model_dump(exclude_unset=True).items():
        setattr(db_app, field, value)
    db.commit()
    db.refresh(db_app)
    return db_app


def delete_application(db: Session, db_app: models.Application) -> None:
    db.delete(db_app)
    db.commit()