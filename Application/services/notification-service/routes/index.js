const express = require('express');
const emailRoutes = require('./email'); 
const smsRoutes = require('./sms'); 

const router = express.Router();

router.use('/email', emailRoutes); 
router.use('/sms', smsRoutes); 

module.exports = router;
