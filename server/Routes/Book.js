const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/BookController');

// Create a new book
router.post('/', bookController.publishBook);

// Get all books
router.get('/', bookController.fetchBooks);

// Get a single book by ID
router.get('/:id', bookController.fetchBookDetails);

// Update a book by ID
router.put('/:id', bookController.editBook);

// Delete a book by ID
router.delete('/:id', bookController.removeBook);

module.exports = router;
