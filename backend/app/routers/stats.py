from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from .. import models
from ..db import get_db

router = APIRouter(prefix="/stats", tags=["stats"])


@router.get("", response_model=dict)
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

    
VALID_GRANULARITIES = {"week", "month", "year"}

@router.get("/over-time")
def get_stats_over_time(
    db: Session = Depends(get_db),
    granularity: str = "month",
):
    """Get stats over time for Recharts use."""
    if granularity not in VALID_GRANULARITIES:
        raise HTTPException(
            status_code=400,
            detail=f"granularity must be one of {sorted(VALID_GRANULARITIES)}",
        )
 
    # ── POSTGRES ─────────────────────────────────────────────────────
    # Uncomment this block and comment out the SQLITE block below when
    # running against Postgres (prod, or docker-compose with a `db` service).
    #
    period = func.date_trunc(granularity, models.Application.applied_date)
    
    rows = (
        db.query(period.label("period"), func.count(models.Application.id).label("count"))
        .group_by(period)
        .order_by(period)
        .all()
    )
    
    return [
        {"period": r.period.date().isoformat(), "count": r.count}
        for r in rows
        if r.period is not None
    ]
 
    # ── SQLITE ───────────────────────────────────────────────────────
    # Active by default for local dev without a Postgres container.
    # Note: "week" uses %Y-%W (year + week number), which is NOT
    # ISO-8601 week numbering — weeks may drift a day or two vs. Postgres.
    # sqlite_fmt = {
    #     "week": "%Y-%W",
    #     "month": "%Y-%m",
    #     "year": "%Y",
    # }[granularity]
 
    # period = func.strftime(sqlite_fmt, models.Application.applied_date)
 
    # rows = (
    #     db.query(period.label("period"), func.count(models.Application.id).label("count"))
    #     .group_by(period)
    #     .order_by(period)
    #     .all()
    # )
 
    # return [
    #     {"period": r.period, "count": r.count}
    #     for r in rows
    #     if r.period is not None
    # ]
