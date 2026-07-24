# JobTrack — Job Application Tracker

A Kanban-style job application tracker. Add applications, drag them through stages (Applied → Interview → Offer → Rejected), and keep all your job-search info in one place.

![status](https://img.shields.io/badge/status-in%20progress-yellow)
![python](https://img.shields.io/badge/python-3.11-blue)
![react](https://img.shields.io/badge/react-18-61DAFB)

## ✨ Features

- Kanban board with drag-and-drop status updates
- Track company, role, link, salary, notes, and applied date per card
- Filter/search across applications
- Simple keyword tagging pulled from pasted job descriptions
- Stats view: applications per week, conversion rate by stage

## 🛠 Tech Stack

**Frontend**
- React 18 (Vite)
- dnd-kit — drag-and-drop Kanban columns
- TanStack Query — data fetching & caching
- Tailwind CSS — styling
- Recharts — stats/analytics charts

**Backend**
- FastAPI — REST API
- SQLAlchemy + Alembic — ORM & migrations
- SQLite (dev) / PostgreSQL (prod)
- Pydantic — request/response validation
- Simple keyword extraction (regex/TF-IDF via scikit-learn) for job-description tagging

**Tooling**
- Docker + docker-compose — local dev environment
- Pytest — backend tests
- Vitest + React Testing Library — frontend tests
- GitHub Actions — CI (lint + test on push)

## 🏗 Architecture

```
┌─────────────────────┐         HTTPS/JSON        ┌──────────────────────┐
│   React (Vite SPA)  │ ─────────────────────────▶ │   FastAPI Backend    │
│                      │ ◀───────────────────────── │                      │
│  - Kanban board      │        REST API            │  - /applications     │
│  - Stats dashboard   │                             │  - /applications/:id │
│  - Application form  │                             │  - /tags/extract     │
└─────────────────────┘                             └──────────┬───────────┘
                                                                  │
                                                         SQLAlchemy ORM
                                                                  │
                                                                  ▼
                                                     ┌─────────────────────┐
                                                     │  PostgreSQL/SQLite  │
                                                     └─────────────────────┘
```

**Flow:**
1. React SPA calls the FastAPI REST API (JSON over HTTPS).
2. FastAPI validates requests with Pydantic schemas, then reads/writes via SQLAlchemy models.
3. Dragging a card to a new column sends a `PATCH /applications/:id` updating its `status` field.
4. Pasting a job description hits `/tags/extract`, which runs lightweight keyword extraction and returns suggested tags.
5. The stats dashboard aggregates data via a `/stats` endpoint (counts per stage, applications over time).

## 📂 Project Structure

```
jobtrack/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI entrypoint
│   │   ├── models.py        # SQLAlchemy models
│   │   ├── schemas.py       # Pydantic schemas
│   │   ├── routers/
│   │   │   ├── applications.py
│   │   │   ├── tags.py
│   │   │   └── stats.py
│   │   └── db.py
│   ├── alembic/              # DB migrations
│   ├── tests/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Board.tsx
│   │   │   ├── Column.tsx
│   │   │   ├── ApplicationCard.tsx
│   │   │   └── StatsPanel.tsx
│   │   ├── api/               # API client (TanStack Query hooks)
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/jobtrack.git
cd jobtrack

# Run everything with Docker
docker-compose up --build

# Frontend: http://localhost:5173
# Backend docs (Swagger): http://localhost:8000/docs
```

### Manual setup

**Backend**
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

## 🗺 Roadmap

- [ ] Browser extension to save a job posting straight into the board
- [ ] Email reminders for follow-ups
- [ ] CSV export
- [ ] Auth (multi-user support)