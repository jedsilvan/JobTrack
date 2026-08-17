import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Start: SQLite configuration (commented out for production PostgreSQL use)
# SQLALCHEMY_DATABASE_URL = "sqlite:///./jobtrack.db"
# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL,
#     # only needed for SQLite
#     connect_args={"check_same_thread": False},
# )
# End: SQLite configuration

SQLALCHEMY_DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql+psycopg://admin:admin@localhost:5432/jobtrack",  # fallback for local/non-Docker dev
)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """FastAPI dependency that yields a DB session and closes it after the request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
