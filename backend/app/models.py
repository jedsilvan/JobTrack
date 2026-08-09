import enum
from datetime import date
from sqlalchemy import Column, Integer, String, Date, Enum as SAEnum, JSON
import sqlalchemy as sa

from .db import Base


class Status(str, enum.Enum):
    applied = "applied"
    interview = "interview"
    offer = "offer"
    rejected = "rejected"


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True)
    company = Column(String, nullable=False)
    role = Column(String, nullable=False)
    status = Column(SAEnum(Status), nullable=False, default=Status.applied, index=True)
    job_link = Column(String, nullable=True)
    applied_date = Column(Date, nullable=True, default=date.today)

    # Populated when a card moves to "offer"
    salary = Column(Integer, nullable=True)
    offer_date = Column(Date, nullable=True)
    response_deadline = Column(Date, nullable=True)

    # Simple list of strings, e.g. ["react", "typescript"].
    tags = Column(JSON, nullable=False, server_default=sa.text("'[]'"))

    def __repr__(self):
        return f"<Application {self.role} @ {self.company} ({self.status})>"