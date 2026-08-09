from datetime import date
from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict

from .models import Status  # re-export the same enum used by the ORM model


class ApplicationBase(BaseModel):
    company: str = Field(..., min_length=1)
    role: str = Field(..., min_length=1)
    status: Status = Status.applied
    job_link: Optional[str] = None
    applied_date: Optional[date] = None
    salary: Optional[int] = None
    offer_date: Optional[date] = None
    response_deadline: Optional[date] = None
    tags: List[str] = Field(default_factory=list)


class ApplicationCreate(ApplicationBase):
    """Fields needed to create an application. No id — the DB assigns it."""
    pass


class ApplicationUpdate(BaseModel):
    """All fields optional — used for PATCH, only send what changed."""
    company: Optional[str] = Field(None, min_length=1)
    role: Optional[str] = Field(None, min_length=1)
    status: Optional[Status] = None
    job_link: Optional[str] = None
    salary: Optional[int] = None
    tags: Optional[List[str]] = None
    applied_date: Optional[date] = None
    offer_date: Optional[date] = None
    response_deadline: Optional[date] = None


class Application(ApplicationBase):
    id: int

    model_config = ConfigDict(from_attributes=True)