// userRoutes.js
const express = require('express');
const router = express.Router();

// Dummy job data (replace with real database data or business logic)
const jobs = [
  { id: 1, title: 'Software Engineer', company: 'Company A', description: 'Detailed job description for Software Engineer...'},
  { id: 2, title: 'Product Manager', company: 'Company B', description: 'Detailed job description for Product Manager...'},
  { id: 3, title: 'Data Scientist', company: 'Company C', description: 'Detailed job description for Data Scientist...'},
  { id: 4, title: 'UI/UX Designer', company: 'Company D', description: 'Detailed job description for UI/UX Designer...'},
];

// Route to fetch all jobs
router.get('/jobs', (req, res) => {
  try {
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Route to fetch a single job by ID (for viewing full job description)
router.get('/jobs/:id', (req, res) => {
  const jobId = parseInt(req.params.id); // Get the job ID from the URL parameter
  const job = jobs.find(j => j.id === jobId); // Find the job with the matching ID

  if (job) {
    res.json(job); // Return the full job details
  } else {
    res.status(404).json({ error: 'Job not found' }); // Return error if job not found
  }
});

module.exports = router;
