from fastapi import FastAPI

from . import models
from .db import engine
from .routers import applications, stats, tags

# Creates tables if they don't exist. For real projects, use Alembic
# migrations instead of relying on this in production.
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="JobTrack API", version="1.0.0", redirect_slashes=False)

app.include_router(applications.router)
app.include_router(stats.router)
app.include_router(tags.router)
