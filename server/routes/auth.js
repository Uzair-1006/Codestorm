const express = require('express');
const router = express.Router();
const {
  register,
  login,
  uploadResume,
} = require('../controllers/authController');

// Register route with file upload middleware
router.post('/register', uploadResume, register);

// Login route
router.post('/login', login);

module.exports = router;
