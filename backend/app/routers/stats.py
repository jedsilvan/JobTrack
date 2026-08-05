from fastapi import APIRouter
from ..db import db

router = APIRouter(prefix="/stats", tags=["stats"])

@router.get("/", response_model=dict)
def get_stats():
    """Get analytics statistics."""
    if not db:
        return {
            "total_applications": 0,
            "applications_by_status": {},
            "conversion_rate": 0.0
        }
    
    total = len(db)
    status_counts = {}
    for app in db:
        status_counts[app.status] = status_counts.get(app.status, 0) + 1
    
    # Calculate conversion rate (interview to offer)
    interview_count = status_counts.get("interview", 0)
    offer_count = status_counts.get("offer", 0)
    
    return {
        "total_applications": total,
        "applications_by_status": status_counts,
        "conversion_rate": round((offer_count / interview_count * 100), 2) if interview_count > 0 else 0.0
    }