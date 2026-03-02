const express = require('express');
const router = express.Router();
const { register, login, logout, getCurrentUser } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/logout', verifyToken, logout);
router.get('/me', verifyToken, getCurrentUser);

module.exports = router;
