# Book2Resell

Modern full-stack app for buying/selling second-hand books.

## Tech Stack
- Frontend: React + Vite + TailwindCSS
- Backend: FastAPI (Python)
- DB: SQLite by default (can switch to PostgreSQL)
- Auth: JWT

## Structure
- `backend/` FastAPI app (entry: `backend/app/main.py`)
- `frontend/` React app (Vite)

## Backend Setup
1. Create and activate a virtualenv (recommended)
2. Install deps:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Configure environment (optional). Defaults are fine for local:
   - SECRET_KEY
   - DATABASE_URL (default: `sqlite:///./book2resell.db`)
   - ADMIN_EMAIL, ADMIN_PASSWORD
4. Run server:
   ```bash
   uvicorn app.main:app --reload --app-dir backend
   ```
5. API will be on `http://127.0.0.1:8000`. Docs: `http://127.0.0.1:8000/docs`

Notes:
- On first run, DB tables are created and seed data is inserted (admin + demo user + sample books).

## Frontend Setup
1. Install deps:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Frontend runs at `http://127.0.0.1:5173` and proxies `/api` to backend.

## Features
- Signup/Login (JWT)
- Sell Book (title, author, category, price, description, image URL)
- Explore books with search
- View details (simple modal/alert in MVP)
- Profile: manage own listings (list, delete)
- Admin: login with static credentials (default `admin@book2resell.local` / `admin123`), list users and books, delete books
- Toast notifications and skeleton loaders

## Switching to PostgreSQL
Set `DATABASE_URL` like:
```
DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/book2resell
```

## Security Notes
- Change `SECRET_KEY` in production.
- Replace the simple admin login flow with proper role-based UI handling.

## License
MIT

