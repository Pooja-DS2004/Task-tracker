# TaskTracker – MERN Stack App

A full-stack Task Tracker built with MongoDB, Express.js, React, and Node.js.

## Features
- ✅ Full CRUD (Create, Read, Update, Delete)
- ✅ Form validation (frontend + backend)
- ✅ Filter by status & priority
- ✅ Sort by date, priority, title
- ✅ Search tasks
- ✅ Quick status toggle on cards
- ✅ Overdue task detection
- ✅ Stats dashboard
- ✅ Toast notifications
- ✅ Responsive UI (mobile-friendly)
- ✅ REST API with proper error handling
- ✅ Environment variables

---

## Local Setup

### 1. Clone & Install

```bash
git clone <your-repo-url>

# Backend
cd backend
npm install
cp .env.example .env   # fill in your MONGO_URI

# Frontend
cd ../frontend
npm install
cp .env.example .env   # set VITE_API_URL
```

### 2. Run Locally

```bash
# Terminal 1 – Backend
cd backend
npm run dev   # runs on http://localhost:5000

# Terminal 2 – Frontend
cd frontend
npm run dev   # runs on http://localhost:5173
```

---

## Deploy

### Backend → Render.com (Free)

1. Push code to GitHub
2. Go to https://render.com → New → Web Service
3. Connect your repo → set **Root Directory** to `backend`
4. Build: `npm install` | Start: `npm start`
5. Add environment variables:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `FRONTEND_URL` = your Vercel frontend URL
6. Copy the Render URL (e.g. `https://task-tracker-backend.onrender.com`)

### Frontend → Vercel (Free)

1. Go to https://vercel.com → New Project → Import repo
2. Set **Root Directory** to `frontend`
3. Add environment variable:
   - `VITE_API_URL` = `https://your-render-backend-url.onrender.com/api`
4. Deploy!

---

## MongoDB Atlas Setup

1. https://cloud.mongodb.com → Free M0 cluster
2. Database Access → Add user (username + password)
3. Network Access → Allow `0.0.0.0/0`
4. Connect → Drivers → Copy connection string
5. Replace `<password>` and use as `MONGO_URI`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks (supports ?status, ?priority, ?sort, ?search) |
| GET | /api/tasks/:id | Get single task |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| PATCH | /api/tasks/:id/status | Update status only |
| DELETE | /api/tasks/:id | Delete task |

## Tech Stack
- **Frontend**: React 18, Vite, Axios, react-hot-toast
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Deploy**: Vercel (frontend) + Render (backend)
