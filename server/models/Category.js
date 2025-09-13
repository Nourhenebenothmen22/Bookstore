const mongoose = require('mongoose');

/**
 * Category Schema
 * Represents a book category in the bookstore.
 */
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,      // Name of the category is mandatory
    trim: true           // Removes whitespace from both ends
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'        // References the Book model
      // This allows storing multiple books that belong to this category
    }
  ]
}, { 
  timestamps: true       // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Category', CategorySchema);
