const express = require('express');
const router = express.Router();

// Import member routes
router.use('/member', require('./member'));

//Import Employee routes
//router.use('/employee', require('./employee'))

// Add more resource routes here as needed

module.exports = router;
