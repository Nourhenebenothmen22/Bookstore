const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Register a new user
router.post('/register', userController.createUserAccount);

// Login an existing user
router.post('/login', userController.loginUser);

module.exports = router;
