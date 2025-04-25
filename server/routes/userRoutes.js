const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); // Import the Job model
const Application = require('../models/application'); // Import the Application model
const verifyToken = require('../middleware/auth'); // Middleware to verify JWT token
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads (e.g., resumes)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Route to fetch all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find(); // Fetch all jobs from the database
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Route to fetch a single job by ID
router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// Route to apply for a job
router.post('/apply/:jobId', verifyToken, upload.single('resume'), async (req, res) => {
    try {
      const userId = req.user.userId; // Extracted from the token
      const jobId = req.params.jobId;
  
      // Validate jobId format
      if (!/^[a-f\d]{24}$/i.test(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }
  
      // Check if the job exists
      const job = await Job.findById(jobId); // Use _id to find the job
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      // Check if the user has already applied to this job
      const existingApplication = await Application.findOne({ user: userId, job: jobId });
      if (existingApplication) {
        return res.status(400).json({ message: "You have already applied to this job" });
      }
  
      // Create a new application
      const newApplication = new Application({
        user: userId,
        job: jobId,
        resumeUrl: req.file ? `/uploads/${req.file.filename}` : null, // Store the resume URL
      });
  
      // Save the application
      const savedApplication = await newApplication.save();
  
      // Add the application reference to the job's applications array
      job.applications.push(savedApplication._id);
      await job.save();
  
      res.status(201).json({ message: "Application submitted successfully", application: savedApplication });
    } catch (error) {
      console.error("Error submitting application:", error);
      res.status(500).json({ message: "Server error" });
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
    console.error('Error fetching user applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;