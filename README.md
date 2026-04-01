# untocs — Toxic-Free Baby Clothing Waitlist

A landing page and waitlist app for **untocs**, a brand offering toxic-chemical-free baby clothing (ages 0–2). The site raises awareness about harmful chemicals in conventional baby clothes and captures early customer interest via a waitlist sign-up form.

---

## Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 19, Tailwind CSS, shadcn/ui, React Hook Form, Zod |
| Backend   | FastAPI, Uvicorn, Python 3                      |
| Database  | MongoDB (async via motor)                       |
| Form Data | Google Sheets (via Google Apps Script)          |

---

## Project Structure

```
untocs-fullstack/
├── frontend/       # React SPA (Create React App + Craco)
└── backend/        # FastAPI REST API
```

---

## Getting Started

### Prerequisites

- Node.js + Yarn
- Python 3.10+
- MongoDB (local or Atlas)

---

### Frontend

```bash
cd frontend
yarn install
yarn start
```

Runs on `http://localhost:3000`.

**Environment variables** — create `frontend/.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

---

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload
```

Runs on `http://localhost:8000`.

**Environment variables** — create `backend/.env`:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=untocs
CORS_ORIGINS=http://localhost:3000
```

---

## API Endpoints

| Method | Path          | Description             |
|--------|---------------|-------------------------|
| GET    | `/api/`       | Health check            |
| POST   | `/api/status` | Create a status record  |
| GET    | `/api/status` | Retrieve status records |

---

## Deployment (Free Tier)

### Frontend → Vercel

1. Import the repo on [vercel.com](https://vercel.com)
2. Set root directory to `frontend`
3. Build command: `yarn build` / Output: `build`
4. Add env var: `REACT_APP_BACKEND_URL` = your Render backend URL

### Backend → Render

1. New Web Service on [render.com](https://render.com)
2. Set root directory to `backend`
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Add env vars: `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS`

### Database → MongoDB Atlas

1. Create a free M0 cluster at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user and copy the connection string
3. Set IP allowlist to `0.0.0.0/0` (required for Render's dynamic IPs)

---

## Notes

- Waitlist form submissions go directly to **Google Sheets** via a Google Apps Script webhook — the backend is not required for this feature.
- The backend provides a simple status-check API that can be extended for future features (order tracking, admin dashboard, etc.).
