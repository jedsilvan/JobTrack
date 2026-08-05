from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter(prefix="/tags", tags=["tags"])

COMMON_TERMS = [
    "python", "javascript", "react", "nodejs", "django",
    "fastapi", "sql", "database", "aws", "docker", "kubernetes",
]


class JobDescriptionIn(BaseModel):
    job_description: str = Field(..., min_length=1)


@router.post("/extract", response_model=dict)
def extract_tags(payload: JobDescriptionIn):
    """Extract known keywords/tags from a job description."""
    job_lower = payload.job_description.lower()
    tags = [term for term in COMMON_TERMS if term in job_lower]

    return {
        "tags": tags,
        "confidence_score": round(len(tags) / len(COMMON_TERMS) * 100, 2),
    }