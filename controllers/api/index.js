const express = require('express');
const router = express.Router();

// Import the API route files
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');

// Use the API route files
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;