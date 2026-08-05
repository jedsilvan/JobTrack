from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Swap this for postgresql://user:pass@localhost/dbname in production
SQLALCHEMY_DATABASE_URL = "sqlite:///./jobtrack.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    # only needed for SQLite
    connect_args={"check_same_thread": False},
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