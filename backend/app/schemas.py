from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Application(BaseModel):
    id: int
    company: str = Field(..., min_length=1)
    role: str = Field(..., min_length=1)
    status: str = Field(...)  # applied | interview | offer | rejected
    salary: Optional[float] = None
    notes: Optional[str] = None
    applied_date: Optional[datetime] = None