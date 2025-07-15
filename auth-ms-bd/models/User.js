// Import Mongoose
const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,       // Name is mandatory
    trim: true            // Removes leading/trailing spaces
  },
  email: {
    type: String,
    required: true,       // Email is mandatory
    unique: true,         // No two users can register with same email
    lowercase: true       // Ensures email is stored in lowercase
  },
  password: {
    type: String,
    required: true        // Hashed password
  },
  role: {
    type: String,
    enum: ['user', 'admin'],  // Only 'user' or 'admin' roles allowed
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false        // User must verify their email
  },
  verificationToken: {
    type: String          // Token sent in email to verify account
  },
  resetPasswordToken: {
    type: String          // Token sent in email for resetting password
  },
  resetPasswordExpires: {
    type: Date            // Expiry time for reset token (e.g. 15 mins)
  },
  refreshToken: {
    type: String,         // Stores refresh token for JWT-based auth
    default: null
  }
}, {
  timestamps: true         // Automatically adds createdAt and updatedAt fields
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
