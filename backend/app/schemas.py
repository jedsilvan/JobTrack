import enum
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Status(str, enum.Enum):
    applied = "applied"
    interview = "interview"
    offer = "offer"
    rejected = "rejected"

class Application(BaseModel):
    id: int
    company: str = Field(..., min_length=1)
    role: str = Field(..., min_length=1)
    status: Status = Field(...)
    salary: Optional[float] = None
    notes: Optional[str] = None
    applied_date: Optional[datetime] = None