const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

/**
 * @route   POST /users/register
 * @desc    Register a new user account
 * @access  Public
 */
router.post('/register', userController.createUserAccount);

/**
 * @route   POST /users/login
 * @desc    Authenticate user and return token
 * @access  Public
 */
router.post('/login', userController.loginUser);

/**
 * @route   GET /users/:id
 * @desc    Fetch user details by ID
 * @access  Private (requires authentication)
 */
router.get('/:id', userController.fetchUserDetails);

module.exports = router;
