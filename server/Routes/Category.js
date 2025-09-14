const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/CategoryController');

/**
 * @route   POST /categories
 * @desc    Create a new category
 * @access  Public/Admin
 * @body    { name: String }
 */
router.post('/', categoryController.addNewCategory);

/**
 * @route   GET /categories
 * @desc    Retrieve all categories
 * @access  Public
 */
router.get('/', categoryController.fetchCategories);

/**
 * @route   GET /categories/:id
 * @desc    Retrieve a single category by its ID
 * @access  Public
 * @params  id - Category ID
 */
router.get('/:id', categoryController.getCategoryDetails);

/**
 * @route   PUT /categories/:id
 * @desc    Update a category by its ID
 * @access  Admin
 * @body    { name: String }
 * @params  id - Category ID
 */
router.put('/:id', categoryController.editCategory);

/**
 * @route   DELETE /categories/:id
 * @desc    Delete a category by its ID
 * @access  Admin
 * @params  id - Category ID
 */
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
