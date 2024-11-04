const express = require('express');
const router = express.Router();
const memberController = require('../../controllers/memberController');

// CREATE
router.post('/createRecord', memberController.createRecord);

// READ
// router.get('/', memberController.getMembers); 

router.get('/readRecord', memberController.readRecord);

// UPDATE


// DELETE

module.exports = router;
