const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');

// ─── GET / — List all jobs (supports ?category= and ?status= filters) ─────────
router.get('/', async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) filter.category = req.query.category;
    if (req.query.status)   filter.status   = req.query.status;

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ─── GET /:id — Single job ────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job request not found' });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ─── POST / — Create a new job ────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate required fields explicitly before hitting mongoose
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required',
      });
    }

    const job = await JobRequest.create(req.body);

    res.status(201).json({ success: true, data: job });
  } catch (error) {
    // Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ─── PATCH /:id — Update status only ─────────────────────────────────────────
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status field is required' });
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job request not found' });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ─── DELETE /:id — Delete a job ───────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job request not found' });
    }

    res.status(200).json({ success: true, message: 'Job request deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
