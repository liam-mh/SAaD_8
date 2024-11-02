const express = require('express');
const router = express.Router();

// Import user routes
router.use('/member', require('./member'));

// Add more resource routes here as needed

module.exports = router;
