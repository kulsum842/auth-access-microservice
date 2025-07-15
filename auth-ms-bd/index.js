const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { globalLimiter } = require('./middleware/rateLimiter');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const xss = require('xss-clean'); // Optional: Uncomment if using to prevent XSS
// const mongoSanitize = require('express-mongo-sanitize'); // Optional: Prevent Mongo injection
// xss and mongosaniitize is causing errors and hence are commented out

// ================== Load Environment Variables ==================
dotenv.config();

// ================== Connect to MongoDB ==================
connectDB();

// ================== Initialize App ==================
const app = express();

// ================== CORS Setup ==================
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || [];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., Postman or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
};

// ================== Middlewares ==================
app.use(helmet()); // Adds security headers
app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // Parse JSON body
app.use(cookieParser()); // Parse cookies
app.use(globalLimiter); // Rate limiting (100 requests per 15 min)

// app.use(xss()); // 🛡 Enable this if needed for security
// app.use(mongoSanitize()); // Enable to prevent MongoDB injection

// ================== Routes ==================
app.use('/api', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Authentication Microservice is running');
});

// ================== Error Handler ==================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

// ================== Start Server ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
