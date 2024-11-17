const express = require('express');
const axios = require('axios');
const config = require('../config');
const router = express.Router();
const { forwardRequest } = require('../middleware/forwardRequestMiddleware')
// const apiController = require('../controllers/apiController');

router.use('/account', forwardRequest(config.ACCOUNT_SERVICE_API, true));
router.use('/storefront', forwardRequest(config.STOREFRONT_SERVICE_API, true));
router.use('/notification', forwardRequest(config.NOTIFICATION_SERVICE_API, true));
router.use('/procurement', forwardRequest(config.PROCUREMENT_SERVICE_API, true));

module.exports = router;