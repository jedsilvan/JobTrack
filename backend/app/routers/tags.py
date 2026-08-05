from fastapi import APIRouter
import re

router = APIRouter(prefix="/tags", tags=["tags"])

@router.post("/extract", response_model=dict)
def extract_tags(job_description: str):
    """Extract keywords/tags from job description."""
    # Simple keyword extraction (replace with ML later)
    tags = []
    
    # Common industry terms
    common_terms = [
        "python", "javascript", "react", "nodejs", "django", 
        "fastapi", "sql", "database", "aws", "docker", "kubernetes"
    ]
    
    job_lower = job_description.lower()
    
    for term in common_terms:
        if term in job_lower:
            tags.append(term)
    
    # Extract company names (basic pattern)
    company_pattern = r'\b[a-zA-Z]+\s+[a-zA-Z]+\s+\d{4}\b'  # Simple placeholder
    companies = re.findall(company_pattern, job_description.lower())
    
    return {
        "tags": tags,
        "companies": companies,
        "confidence_score": len(tags) / max(len(common_terms), 1) * 100
    }