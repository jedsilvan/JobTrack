from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

from .models import Status  # re-export the same enum used by the ORM model


class ApplicationBase(BaseModel):
    company: str = Field(..., min_length=1)
    role: str = Field(..., min_length=1)
    status: Status = Status.applied
    salary: Optional[float] = None
    notes: Optional[str] = None
    applied_date: Optional[datetime] = None


class ApplicationCreate(ApplicationBase):
    """Fields needed to create an application. No id — the DB assigns it."""
    pass


class ApplicationUpdate(BaseModel):
    """All fields optional — used for PATCH, only send what changed."""
    company: Optional[str] = Field(None, min_length=1)
    role: Optional[str] = Field(None, min_length=1)
    status: Optional[Status] = None
    salary: Optional[float] = None
    notes: Optional[str] = None
    applied_date: Optional[datetime] = None


class Application(ApplicationBase):
    id: int

    model_config = ConfigDict(from_attributes=True)