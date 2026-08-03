# Deployment Guide

This project has three parts, each deployed separately:

1. **Database** — MongoDB
2. **Backend** — FastAPI app in `/backend`
3. **Frontend** — React app in `/frontend`

---

## 1. Database (MongoDB Atlas — free tier works fine)

1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Create a database user (username + password)
3. Under **Network Access**, allow access from anywhere (`0.0.0.0/0`) — or your backend host's IP once you know it
4. Copy the connection string, it looks like:
   ```
   mongodb+srv://<user>:<password>@<cluster>.mongodb.net
   ```

---

## 2. Backend (FastAPI) — e.g. Render, Railway, Fly.io

1. Copy `backend/.env.example` to `backend/.env` and fill in:
   ```
   MONGO_URL=<your Atlas connection string>
   DB_NAME=twinlakes
   ```
2. Deploy settings (Render/Railway example):
   - **Root directory:** `backend`
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - **Environment variables:** `MONGO_URL`, `DB_NAME` (paste the same values from your `.env`)
3. Once deployed, note the public URL, e.g. `https://twinlakes-api.onrender.com`
4. Test it: visiting `https://twinlakes-api.onrender.com/api/` should return `{"message": "Twin Lakes API"}`

---

## 3. Frontend (React) — e.g. Vercel, Netlify

1. Copy `frontend/.env.example` to `frontend/.env` and set:
   ```
   REACT_APP_BACKEND_URL=https://twinlakes-api.onrender.com
   ```
   (use the backend URL from step 2, **no trailing slash**)
2. Deploy settings:
   - **Root directory:** `frontend`
   - **Build command:** `npm run build` (or `yarn build`)
   - **Output directory:** `build`
   - **Environment variable:** `REACT_APP_BACKEND_URL` set to your backend URL (must be added in the hosting dashboard too, not just the `.env` file, since most hosts don't read `.env` files at build time)

---

## Local development (to test before deploying)

```bash
# Backend
cd backend
pip install -r requirements.txt
cp .env.example .env   # then edit .env with your local Mongo URL
uvicorn server:app --reload --port 8000

# Frontend (in a separate terminal)
cd frontend
npm install
cp .env.example .env   # then edit .env if needed
npm start
```

Frontend runs at `http://localhost:3000`, backend at `http://localhost:8000`.

---

## Checklist before going live

- [ ] MongoDB Atlas cluster created, connection string copied
- [ ] Backend deployed with `MONGO_URL` and `DB_NAME` set as real environment variables (not just in a local `.env` file — most hosts need them entered in their dashboard)
- [ ] Backend URL tested directly (`/api/` returns a JSON message)
- [ ] Frontend deployed with `REACT_APP_BACKEND_URL` pointing at the live backend URL
- [ ] Test a real booking / contact form submission end-to-end on the live site
