const express = require('express');
const axios = require('axios');
const config = require('../config');
const router = express.Router();
// const apiController = require('../controllers/apiController');

import { forwardRequest } from '../middleware/forwardRequestMiddleware';

router.use('/account', forwardRequest(config.ACCOUNT_SERVICE_API));
router.use('/notification', forwardRequest(config.NOTIFICATION_SERVICE_API));
router.use('/procurement', forwardRequest(config.PROCUREMENT_SERVICE_API));
router.use('/storefront', forwardRequest(config.STOREFRONT_SERVICE_API));

module.exports = router;