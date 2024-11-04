const express = require('express');
const router = express.Router();

// Import user routes
router.use('/', require('./member'));

// Add more resource routes here as needed

module.exports = router;
