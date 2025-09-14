const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/CategoryController');

// Create a new category
router.post('/', categoryController.addNewCategory);

// Get all categories
router.get('/', categoryController.fetchCategories);

// Get a single category by ID
router.get('/:id', categoryController.getCategoryDetails);

// Update a category by ID
router.put('/:id', categoryController.editCategory);
router.delete('/:id',categoryController.deleteCategory)

module.exports = router;
