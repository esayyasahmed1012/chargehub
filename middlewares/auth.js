const jwt = require('jsonwebtoken');

// Middleware to check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.header('Authorization');

  // Check if the Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Check if the token starts with 'Bearer '
  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Bearer token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Add decoded token data to req.user
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Checking if the user is an admin
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};
