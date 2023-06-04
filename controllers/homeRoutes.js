const express = require('express');
const router = express.Router();

// GET route for home page
router.get('/', (req, res) => {
  res.render('home'); // Render the 'home' view
});

// GET route for about page
router.get('/about', (req, res) => {
  res.render('about'); // Render the 'about' view
});

module.exports = router;