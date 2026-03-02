const express = require('express');
const router = express.Router();
const { 
  getTrending, 
  getPopular, 
  getTopRated, 
  getPopularTV, 
  getMovieDetails 
} = require('../controllers/movieController');
const verifyToken = require('../middleware/verifyToken');

// All movie routes are protected
router.use(verifyToken);

// Movie routes
router.get('/trending', getTrending);
router.get('/popular', getPopular);
router.get('/top-rated', getTopRated);

// TV routes
router.get('/tv/popular', getPopularTV);

// Single movie details
router.get('/:id', getMovieDetails);

module.exports = router;
