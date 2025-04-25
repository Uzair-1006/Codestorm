const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const userRoutes = require("./routes/userRoutes");
const hrRoutes = require("./routes/hrRoutes");
// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Initialize router
const router = express.Router();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this for form data

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes); // All routes in userRoutes.js will be prefixed with /api
app.use('/api/hr', hrRoutes);  // Prefix '/api/hr' to all routes defined in hrRoutes


// Add this router to your app
app.use('/api/hr', router); // Prefix this route under /api/hr

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Welcome to TrueHire API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
});
