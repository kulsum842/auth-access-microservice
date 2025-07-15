const express = require('express');
const router = express.Router();

// Controllers
const {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshToken, 
  logoutUser
} = require('../controllers/authController');

// Middleware
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const { loginLimiter } = require('../middleware/rateLimiter');

// Models
const User = require('../models/User');

// ================= AUTH ROUTES =================

// Register a new user
router.post('/register', registerUser);

// Login with rate limiting
router.post('/login', loginLimiter, loginUser);

// Forgot Password → sends reset email
router.post('/forgot-password', forgotPassword);

// Reset Password using token
router.post('/reset-password', resetPassword);

// Refresh token via cookie
router.post('/refresh-token', refreshToken);

// Logout user (invalidate refresh token)
router.post('/logout', logoutUser);

// Email verification (called from email link)
router.get('/verify-email', verifyEmail);

// ================= PROTECTED ROUTES =================

// Authenticated user route
router.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'Welcome to your profile', user: req.user });
});

// Admin-only route
router.get('/admin', authenticate, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

// Authenticated route to get full user details (excluding password)
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
