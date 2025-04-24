const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); // adjust if your model is located elsewhere
const Application = require('../models/application');
const User = require('../models/User'); // Assuming you have this model
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to check if user is HR
const requireHR = (req, res, next) => {
  if (req.user.role !== 'hr') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

// @route   GET /api/jobs
// @desc    Get all jobs (posted by HR)
// @access  Private (HR)
router.get('/', verifyToken, requireHR, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get a single job
// @access  Private (HR)
router.get('/:id', verifyToken, requireHR, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/jobs
// @desc    Create a new job
// @access  Private (HR)
router.post('/', verifyToken, requireHR, upload.single('companyImage'), async (req, res) => {
  try {
    console.log('Received job data:', req.body);
    console.log('Received file:', req.file);
    
    const { title, company, description } = req.body;
    const companyImage = req.file ? `/uploads/${req.file.filename}` : null;

    const job = new Job({
      title,
      company,
      description,
      companyImage,
      postedBy: req.user.id,
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(400).json({ message: 'Failed to create job', error: err.message });
  }
});

// @route   GET /api/jobs/:id/applications
// @desc    Get applications for a job
// @access  Private (HR)
router.get('/:id/applications', verifyToken, requireHR, async (req, res) => {
    try {
      const applications = await Application.find({ job: req.params.id })
        .populate('user', 'name email phone profileImage') // only select needed fields
        .sort({ createdAt: -1 });
  
      res.json(applications);
    } catch (err) {
      console.error("Error fetching applications:", err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;
