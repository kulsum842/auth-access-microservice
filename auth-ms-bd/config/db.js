// Import Mongoose for MongoDB interaction
const mongoose = require('mongoose');

// Asynchronous function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to the database using the URI stored in .env
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,       // Use new MongoDB connection string parser
      useUnifiedTopology: true     // Use new server discovery and monitoring engine
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);

    // Exit the app if database connection fails
    process.exit(1);
  }
};

// Export the connectDB function to be used in index.js
module.exports = connectDB;
