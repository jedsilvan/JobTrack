# Agent Context & Project Summary (JobTrack)

## 🎯 Goal
To build a Kanban-style Job Application Tracker allowing users to manage their job search pipeline.

## ✨ Core Features
*   **Kanban Board:** Status tracking (Applied → Interview → Offer → Rejected).
*   **Data Points:** Track company, role, link, salary, notes, and applied date per application card.
*   **Search/Filter:** Ability to search across applications.
*   **Keyword Tagging:** Automatically extract keywords/tags from pasted job descriptions (using ML/regex).
*   **Analytics:** Stats view (applications per week, conversion rate by stage).

## 💻 Tech Stack Overview
| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite, dnd-kit, Tailwind CSS, Recharts | User Interface and visualization. Handles drag-and-drop state. |
| **Backend (API)** | FastAPI, Pydantic, SQLAlchemy, Alembic | REST API handling business logic, data validation, and persistence. |
| **Database** | SQLite (Dev) / PostgreSQL (Prod) | Data storage for application records. |

## 🏗 Architecture Flow
1.  **Client to Server:** React SPA makes JSON requests to FastAPI endpoints (`/applications`, `/stats`, `/tags/extract`).
2.  **API Logic:** FastAPI receives the request, validates it using Pydantic schemas.
3.  **Data Persistence:** SQLAlchemy models interact with the database (PostgreSQL/SQLite).
4.  **State Change Example:** Dragging a card updates the `status` field via a `PATCH /applications/:id` call.

## 📂 Project Structure Quick Reference
*   `jobtrack/backend/app/main.py`: FastAPI entrypoint.
*   `jobtrack/backend/app/models.py`: SQLAlchemy ORM definitions.
*   `jobtrack/backend/app/schemas.py`: Pydantic validation models.
*   `jobtrack/frontend/src/*`: React components and client logic.

## 💡 Key Development Notes
*   **Data Flow:** All communication is RESTful API (JSON over HTTPS).
*   **Tagging:** The keyword extraction process is critical; it runs a lightweight algorithm (regex/TF-IDF) on pasted job descriptions.
*   **Deployment:** Use `docker-compose.yml` for local environment setup.

---
*(This file serves as a persistent reference for the project context.)*