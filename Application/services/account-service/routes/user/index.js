const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// routes
router.get('/', userController.getUsers); // Get all users

module.exports = router;
