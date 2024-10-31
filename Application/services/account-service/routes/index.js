const express = require('express');
const router = express.Router();

// Import user routes
router.use('/user', require('./user'));

// Add more resource routes here as needed

module.exports = router;
