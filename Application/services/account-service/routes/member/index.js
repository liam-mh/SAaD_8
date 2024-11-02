const express = require('express');
const router = express.Router();
const memberController = require('../../controllers/memberController');

// routes
router.get('/', memberController.getMembers); // Get all members

module.exports = router;
