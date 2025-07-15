// Import express-rate-limit to protect against brute-force attacks
const rateLimit = require('express-rate-limit');

/**
 * Global Rate Limiter
 * Applies to all routes (if used)
 * Prevents abuse by limiting number of requests per IP
 */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per IP in that window
  message: 'Too many requests, please try again later.',
});

/**
 * Login Rate Limiter
 * Specifically for /login route to protect against brute-force login attacks
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Allow max 5 login attempts per IP in 15 minutes
  message: 'Too many login attempts. Please try again in 15 minutes.',
  standardHeaders: true, // Return rate limit info in standard RateLimit-* headers
  legacyHeaders: false,  // Disable deprecated X-RateLimit-* headers
});

// Export both limiters to be used in index.js and authRoutes.js
module.exports = {
  globalLimiter,
  loginLimiter,
};
