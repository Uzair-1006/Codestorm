const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Application = require('../models/application');
const User = require('../models/User');
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
const upload = multer({ storage });

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
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

// @route   GET /api/hr/
// @desc    Get all jobs posted by HR
// @access  Private (HR)
router.get('/jobs', verifyToken, requireHR, async (req, res) => {
    try {
      // Fetch the jobs posted by the HR using the HR ID from the token
      const jobs = await Job.find({ postedBy: req.user.userId })
        .populate('postedBy', 'name email')  // Populate HR details (optional)
        .sort({ createdAt: -1 });  // Sort jobs by creation date (newest first)
      
      res.json(jobs);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  
// @route   GET /api/hr/dashboard
// @desc    Get HR dashboard data
// @access  Private (HR)
router.get('/dashboard', verifyToken, requireHR, async (req, res) => {
  try {
    const hrId = req.user.userId;
    const jobs = await Job.find({ postedBy: hrId }).populate('postedBy', 'name email').sort({ createdAt: -1 });
    const jobIds = jobs.map(job => job._id);
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('user', 'name email profileImage')
      .populate('job', 'title company')
      .sort({ createdAt: -1 });

    res.json({ jobs, applications });
  } catch (err) {
    console.error('Error fetching HR dashboard data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/hr/candidates
// @desc    Get all candidates who have applied to HR's jobs
// @access  Private (HR)
router.get('/candidates', verifyToken, requireHR, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.userId });
    const jobIds = jobs.map(job => job._id);
    const candidates = await Application.find({ job: { $in: jobIds } })
      .populate('user', 'name email profileImage')
      .populate('job', 'title company')
      .sort({ createdAt: -1 });

    res.json(candidates);
  } catch (err) {
    console.error('Error fetching candidates:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/hr/candidates/:id/download-resume
// @desc    Download resume of a candidate
// @access  Private (HR)
router.get('/candidates/:id/download-resume', verifyToken, requireHR, async (req, res) => {
  try {
    // Find the candidate application by ID
    const application = await Application.findById(req.params.id).populate('user');
    
    // If no application or resume is missing
    if (!application || !application.resumeUrl) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Extract filename from stored resume URL (assuming resumeUrl contains the file path)
    const filename = application.resumeUrl.split('/').pop();
    const resumePath = path.join(__dirname, '..', 'uploads', filename);

    // Send the file as a download
    res.download(resumePath, filename);
  } catch (err) {
    console.error('Error downloading resume:', err);
    res.status(500).json({ message: 'Error downloading resume' });
  }
});

// @route   GET /api/hr/jobs/:jobId/candidates
// @desc    Get all candidates who have applied to a specific job
// @access  Private (HR)
router.get('/jobs/:jobId/candidates', verifyToken, requireHR, async (req, res) => {
    try {
      const jobId = req.params.jobId;
  
      // Step 1: Validate the job exists and belongs to the HR
      const job = await Job.findById(jobId);
      if (!job || job.postedBy.toString() !== req.user.userId) {
        return res.status(404).json({ message: 'Job not found or access denied' });
      }
  
      // Step 2: Fetch all applications for the specified job
      const candidates = await Application.find({ job: jobId })
        .populate('user', 'name email profileImage') // Populate user details
        .populate('job', 'title company')           // Populate job details
        .sort({ createdAt: -1 });                   // Sort by application date
  
      // Step 3: Transform the data to match the frontend's expectations
      const formattedCandidates = candidates.map(candidate => ({
        _id: candidate._id,
        name: candidate.user.name,
        email: candidate.user.email,
        resumeUrl: candidate.resumeUrl, // Assuming this is stored in the Application model
        status: candidate.status        // e.g., "Applied", "Shortlisted", "Selected", "Rejected"
      }));
  
      // Step 4: Send the response
      res.json(formattedCandidates);
    } catch (err) {
      console.error('Error fetching candidates for job:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });


  router.get('/applications', verifyToken, async (req, res) => {
    try {
      const userId = req.user.userId; // Extracted from the token
  
      // Fetch all applications for the user
      const applications = await Application.find({ user: userId })
        .populate('job', 'title company') // Populate job details
        .sort({ createdAt: -1 }); // Sort by application date
  
      res.json(applications);
    } catch (error) {
      console.error("Error fetching user applications:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
module.exports = router;
