// Import core dependencies
const express = require('express');        // Web framework to create the API
require('dotenv').config();                // Load environment variables from .env file
const cors = require('cors');              // Middleware to handle Cross-Origin Resource Sharing (CORS)
const connectDB = require('./config/db');  // Function to connect to MongoDB
const morgan = require('morgan');     // HTTP request logger
const helmet = require('helmet');     // Security middleware

// Connect to MongoDB
connectDB(); // Calls the database connection function

// Initialize Express application
const app = express();

// Middleware
app.use(express.json()); // Allows Express to parse JSON request bodies
app.use(cors());         // Enables CORS to allow cross-domain requests
app.use(helmet());                  // Adds security headers
app.use(morgan('dev'));             // Logs HTTP requests in the console

// Routes
const userRoutes = require('./Routes/User');         // User-related routes
app.use('/api/users', userRoutes);

const categoryRoutes = require('./Routes/Category'); // Category-related routes
app.use('/api/categories', categoryRoutes);

const bookRoutes = require('./Routes/Book');         // Book-related routes
app.use('/api/books', bookRoutes);

// Define the port
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
