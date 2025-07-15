// Import JWT for token verification
const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate user based on Bearer Token
 */
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and follows 'Bearer <token>' format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Extract token from header
  const token = authHeader.split(' ')[1];

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Attach decoded info to req.user for later use in routes
    req.user = { id: decoded.userId, role: decoded.role };
    next(); // Pass control to next middleware or route
  } catch (error) {
    console.error('JWT error:', error);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

/**
 * Middleware to authorize roles (RBAC)
 * Example usage: authorizeRoles('admin') or authorizeRoles('admin', 'manager')
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Access is denied.' });
    }
    next(); // Role is allowed
  };
};

// Export both middleware functions
module.exports = { authenticate, authorizeRoles };
