const mongoose = require('mongoose');

/**
 * User Schema
 * Represents a user in the application.
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,       // Email is mandatory
    unique: true,         // Email must be unique for each user
    trim: true            // Removes whitespace from both ends
  },
  password: {
    type: String,
    required: true        // Password is mandatory
    // Note: Password should be hashed before saving to the database
  }
}, { 
  timestamps: true        // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);
