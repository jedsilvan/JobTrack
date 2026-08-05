import random
from datetime import datetime, timedelta

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

# Weighted so "applied" is most common and "offer" is rarest — mimics a real funnel
STATUS_WEIGHTS = [
    (models.Status.applied, 50),
    (models.Status.interview, 25),
    (models.Status.rejected, 20),
    (models.Status.offer, 5),
]


def random_status():
    statuses, weights = zip(*STATUS_WEIGHTS)
    return random.choices(statuses, weights=weights, k=1)[0]


def random_applied_date():
    days_ago = random.randint(0, 180)
    return datetime.now() - timedelta(days=days_ago)


def make_fake_application() -> models.Application:
    status = random_status()
    return models.Application(
        company=fake.company(),
        role=random.choice(ROLES),
        status=status,
        # only filled in if there's an offer on the table
        salary=round(random.uniform(90_000, 190_000), -3) if status == models.Status.offer else None,
        notes=fake.sentence(nb_words=10) if random.random() < 0.6 else None,
        applied_date=random_applied_date(),
    )


def seed(count: int = 25):
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if db.query(models.Application).count() > 0:
            print("DB already has data — skipping seed.")
            return

        applications = [make_fake_application() for _ in range(count)]
        db.add_all(applications)
        db.commit()
        print(f"Seeded {count} fake applications.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()