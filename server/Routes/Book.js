const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/BookController');
const upload=require('../middellware/upload')

/**
 * @route   POST /books
 * @desc    Publish (create) a new book
 * @access  Admin
 * @body    { title, author, description, price, stock, isFeatured, isOnSale, discountPercent, coverImage, category }
 * @note    Supports file upload for 'coverImage' using multer
 */
router.post('/',upload.single('coverImage'), bookController.publishBook);

/**
 * @route   GET /books
 * @desc    Fetch all books
 * @access  Public
 */
router.get('/', bookController.fetchBooks);

/**
 * @route   GET /books/:id
 * @desc    Fetch a single book by ID
 * @access  Public
 */
router.get('/:id', bookController.fetchBookDetails);

/**
 * @route   PUT /books/:id
 * @desc    Edit (update) a book by ID
 * @access  Admin
 */
router.put('/:id',upload.single('coverImage'), bookController.editBook);

/**
 * @route   DELETE /books/:id
 * @desc    Remove a book by ID
 * @access  Admin
 */
router.delete('/:id', bookController.removeBook);

module.exports = router;
