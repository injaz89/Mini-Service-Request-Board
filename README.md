# 🔧 Mini-Service Request Board

A full-stack web application where homeowners can post local service job requests and tradespeople can view, manage, and update them.

---

## Overview

**Mini-Service Request Board** is a lightweight job management platform built for local service work. Homeowners submit requests with details like job title, description, category, location, and contact information. Tradespeople can browse all open listings, view full job details, update the job status as work progresses, and delete completed or cancelled listings.

The app features a clean, responsive interface built with Next.js 14 App Router and Tailwind CSS, backed by a RESTful Express API connected to MongoDB Atlas.

---

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | Next.js 14 (App Router), React 18       |
| Styling    | Tailwind CSS                            |
| Backend    | Node.js, Express.js                     |
| Database   | MongoDB Atlas (Mongoose ODM)            |
| Validation | express-validator                       |
| Dev Tools  | nodemon                                 |

---

## Project Structure

```
Mini-Service/
├── backend/                    # Node.js + Express REST API
│   ├── middleware/
│   │   └── errorHandler.js     # Global error handler
│   ├── models/
│   │   └── JobRequest.js       # Mongoose schema & model
│   ├── routes/
│   │   └── jobs.js             # All /api/jobs route handlers
│   ├── db.js                   # MongoDB connection
│   ├── seed.js                 # Sample data seeder
│   ├── server.js               # Express app entry point
│   ├── .env.example
│   └── package.json
│
├── frontend/                   # Next.js 14 App Router
│   ├── app/
│   │   ├── components/
│   │   │   ├── CategoryFilter.js   # Client-side filter dropdown
│   │   │   ├── Navbar.jsx          # Active-link aware navbar
│   │   │   └── StatusBadge.jsx     # Reusable status pill
│   │   ├── jobs/
│   │   │   ├── [id]/
│   │   │   │   ├── page.js             # Server component — fetches job
│   │   │   │   └── JobDetailClient.jsx # Client component — edit & delete
│   │   │   └── new/
│   │   │       └── page.js         # Post a new job form
│   │   ├── globals.css
│   │   ├── layout.js           # Root layout with Navbar
│   │   ├── loading.js          # Route-level loading UI
│   │   └── page.js             # Home page — job listings
│   ├── lib/
│   │   └── api.js              # All fetch calls to the backend
│   ├── .env.local.example
│   └── package.json
│
└── README.md
```

---

## Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A **MongoDB Atlas** account (free tier works) — or a locally running MongoDB instance

---

## Environment Variables

### Backend — `backend/.env`

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

| Variable       | Description                              | Example                                  |
|----------------|------------------------------------------|------------------------------------------|
| `MONGODB_URI`  | Full MongoDB connection string           | `mongodb+srv://user:pass@cluster0.../db` |
| `PORT`         | Port the Express server listens on       | `5000`                                   |
| `NODE_ENV`     | Environment mode                         | `development`                            |

### Frontend — `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

| Variable                | Description                       |
|-------------------------|-----------------------------------|
| `NEXT_PUBLIC_API_URL`   | Base URL of the Express backend   |

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/injaz89/Mini-Service-Request-Board.git
cd Mini-Service-Request-Board
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment

```bash
# Copy the example file and fill in your MongoDB URI
cp .env.example .env
```

Edit `backend/.env` and set your `MONGODB_URI`.

> **MongoDB Atlas IP Whitelist** — make sure your current IP address is whitelisted in your Atlas cluster under **Security → Network Access**.

### 4. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 5. Configure frontend environment

```bash
cp .env.local.example .env.local
```

The default value (`http://localhost:5000`) works as-is for local development.

### 6. Seed the database (optional)

```bash
cd ../backend
npm run seed
```

This populates the database with a set of sample job listings so the app isn't empty on first run.

---

## Running the App

You need **two terminals running simultaneously**.

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

> Starts the Express server with `nodemon` on **http://localhost:5000**  
> You should see: `Server running on port 5000`

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

> Starts the Next.js dev server on **http://localhost:3000**

Open **http://localhost:3000** in your browser.

---

## API Endpoints

Base URL: `http://localhost:5000`

| Method   | Endpoint           | Description                        |
|----------|--------------------|------------------------------------|
| `GET`    | `/api/jobs`        | Get all job listings (supports `?category=` and `?status=` query params) |
| `GET`    | `/api/jobs/:id`    | Get a single job by ID             |
| `POST`   | `/api/jobs`        | Create a new job request           |
| `PATCH`  | `/api/jobs/:id`    | Update the status of a job         |
| `DELETE` | `/api/jobs/:id`    | Delete a job listing               |

### Example: POST `/api/jobs`

```json
{
  "title": "Fix leaking kitchen tap",
  "description": "The cold water tap in the kitchen has been dripping for a week.",
  "category": "Plumbing",
  "location": "Glasgow",
  "contactName": "John Smith",
  "contactEmail": "john@example.com"
}
```

### Example: PATCH `/api/jobs/:id`

```json
{
  "status": "In Progress"
}
```

Valid status values: `Open` | `In Progress` | `Closed`

---

## Features

- **Browse job listings** — View all service requests in a responsive grid (1 / 2 / 3 columns)
- **Filter by category** — Instantly filter jobs by trade category without a page reload
- **Post a job** — Submit a new service request via a validated form
- **Job detail page** — View all fields for a specific job in a clean card layout
- **Update job status** — Change status via dropdown with live `Updating…` / success / error feedback
- **Delete a job** — Remove a listing with a confirmation prompt; redirects home on success
- **Loading UI** — Animated spinner shown automatically during server-side data fetching
- **Friendly error states** — Detects backend connectivity issues and shows actionable messages
- **Active nav highlighting** — Navbar reflects the current route using `usePathname`
- **Fully responsive** — Works on mobile, tablet, and desktop

---

## License

ISC
