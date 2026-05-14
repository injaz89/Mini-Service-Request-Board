require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./db');
const jobRoutes = require('./routes/jobs');
const errorHandler = require('./middleware/errorHandler');

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB();

// ─── App Setup ────────────────────────────────────────────────────────────────
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.use('/api/jobs', jobRoutes);

// ─── Error Handling ───────────────────────────────────────────────────────────
// Must be registered after all routes
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
