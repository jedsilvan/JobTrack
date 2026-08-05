from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from .. import models
from ..db import get_db

router = APIRouter(prefix="/stats", tags=["stats"])


@router.get("/", response_model=dict)
def get_stats(db: Session = Depends(get_db)):
    """Get analytics statistics."""
    total = db.query(func.count(models.Application.id)).scalar()

    status_counts = {status.value: 0 for status in models.Status}
    rows = (
        db.query(models.Application.status, func.count(models.Application.id))
        .group_by(models.Application.status)
        .all()
    )
    for status, count in rows:
        status_counts[status.value] = count

    interview_count = status_counts["interview"]
    offer_count = status_counts["offer"]
    conversion_rate = (
        round(offer_count / interview_count * 100, 2) if interview_count > 0 else 0.0
    )

    return {
        "total_applications": total,
        "applications_by_status": status_counts,
        "conversion_rate": conversion_rate,
    }