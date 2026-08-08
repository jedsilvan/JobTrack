import random
from datetime import date, timedelta

from faker import Faker

from app.db import SessionLocal, engine, Base
from app import models

fake = Faker()

ROLES = [
    "Backend Engineer", "Frontend Engineer", "Full Stack Engineer",
    "Data Engineer", "DevOps Engineer", "Machine Learning Engineer",
    "Product Manager", "Engineering Manager", "QA Engineer",
    "Site Reliability Engineer",
]

TAGS_POOL = [
    "react", "typescript", "python", "fastapi", "django", "postgresql",
    "docker", "kubernetes", "aws", "graphql", "node", "go", "remote",
    "hybrid", "startup", "enterprise",
]

# Weighted so "applied" is most common and "offer" is rarest — mimics a real funnel
STATUS_WEIGHTS = [
    ("applied", 50),
    ("interview", 25),
    ("rejected", 20),
    ("offer", 5),
]


def random_status() -> str:
    statuses, weights = zip(*STATUS_WEIGHTS)
    return random.choices(statuses, weights=weights, k=1)[0]


def random_applied_date() -> date:
    days_ago = random.randint(0, 180)
    return date.today() - timedelta(days=days_ago)


def random_tags() -> list[str]:
    return random.sample(TAGS_POOL, k=random.randint(0, 4))


def make_fake_application() -> models.Application:
    status = random_status()
    applied_date = random_applied_date()

    # Offer-specific fields only make sense once a card has reached "offer" —
    # mirrors the offer-modal flow (offer_date is on/after applied_date,
    # response_deadline is a couple weeks after the offer).
    salary = None
    offer_date = None
    response_deadline = None
    if status == "offer":
        salary = round(random.uniform(90_000, 190_000), -3)
        offer_date = applied_date + timedelta(days=random.randint(7, 45))
        response_deadline = offer_date + timedelta(days=random.randint(7, 14))

    return models.Application(
        company=fake.company(),
        role=random.choice(ROLES),
        status=status,
        job_link=fake.url() if random.random() < 0.7 else None,
        applied_date=applied_date,
        salary=int(salary) if salary is not None else None,
        offer_date=offer_date,
        response_deadline=response_deadline,
        tags=random_tags(),
    )


def seed(count: int = 25):
    # NOTE: for schema changes going forward, prefer Alembic migrations over
    # create_all — this is only here as a convenience for local seeding so
    # the table exists even if you haven't run migrations yet.
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        existing_count = db.query(models.Application).count()
        if existing_count > 0:
            print(f"DB already has {existing_count} application(s) — skipping seed.")
            return

        applications = [make_fake_application() for _ in range(count)]
        db.add_all(applications)
        db.commit()
        print(f"Seeded {count} fake applications.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()