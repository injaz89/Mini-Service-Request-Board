# Mini-Service Request Board

A full-stack web application for managing mini service requests.

---

## Overview

<!-- TODO: Describe the purpose of the application, its target users, and the problem it solves. -->

---

## Tech Stack

**Frontend:**
- <!-- TODO: e.g. React, Vite, TailwindCSS -->

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## Project Structure

```
Mini-Service/
├── backend/          # Node.js + Express API
│   ├── src/
│   │   └── server.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── frontend/         # Frontend application
│   └── .gitignore
└── README.md
```

---

## Setup

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- MongoDB Atlas account (or local MongoDB)

### Installation

```bash
# Clone the repository
git clone https://github.com/injaz89/Mini-Service-Request-Board.git
cd Mini-Service-Request-Board

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
# TODO: add install command once frontend is scaffolded
```

---

## Environment Variables

Copy the example env file and fill in your values:

```bash
cd backend
cp .env.example .env
```

| Variable    | Description                        | Example                          |
|-------------|------------------------------------|----------------------------------|
| `MONGO_URI` | MongoDB connection string          | `mongodb+srv://user:pass@...`    |
| `PORT`      | Port the backend server listens on | `5000`                           |

---

## Run Instructions

### Backend (Development)

```bash
cd backend
npm run dev
```

### Backend (Production)

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
# TODO: add run command once frontend is scaffolded
```

---

## API Endpoints

<!-- TODO: Document API routes once backend controllers are built. -->

---

## License

ISC
