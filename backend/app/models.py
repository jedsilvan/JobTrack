import enum
from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Enum as SAEnum

from .db import Base


class Status(str, enum.Enum):
    applied = "applied"
    interview = "interview"
    offer = "offer"
    rejected = "rejected"


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String, nullable=False, index=True)
    role = Column(String, nullable=False)
    status = Column(SAEnum(Status), nullable=False, default=Status.applied, index=True)
    salary = Column(Float, nullable=True)
    notes = Column(Text, nullable=True)
    applied_date = Column(DateTime, nullable=True)