const mongoose = require('mongoose');

/**
 * Book Schema
 * Represents a book in the bookstore.
 */
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,      // Title is mandatory
    trim: true           // Removes whitespace from both ends
  },
  author: {
    type: String,
    required: true,      // Author name is mandatory
    trim: true
  },
  description: {  
    type: String,
    trim: true           // Optional short description of the book
  },
  price: {
    type: Number,
    required: true       // Price is mandatory
  },
  stock: {
    type: Number,
    required: true       // Number of books available in stock
  },
  isFeatured: {
    type: Boolean,
    default: false       // Indicates if the book is featured
  },
  isOnSale: {   
    type: Boolean,
    default: false       // Indicates if the book is currently on sale
  },
  discountPercent: {
    type: Number,  
    default: 0           // Discount percentage if the book is on sale
  },
  coverImage: {
    type: String,  
    trim: true           // URL of the book’s cover image
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",     // Reference to the Category model
  }
}, { 
  timestamps: true       // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Book', BookSchema);
