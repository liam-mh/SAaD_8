const express = require('express');
const axios = require('axios');
const config = require('../config');
const router = express.Router();
// const apiController = require('../controllers/apiController');

router.use('/account', async (req, res) => {
    try {
        const originalUrl = req.originalUrl.replace('/api/account', '')
        const forwardUrl = config.ACCOUNT_SERVICE_API + originalUrl;
        console.log(`Forwarding request to: ${forwardUrl}`);

        console.log(originalUrl);
        console.log(config.ACCOUNT_SERVICE_API);

        const response = await axios({
            method: req.method,
            url: forwardUrl,
            data: req.body,
            headers: req.headers
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

// router.use('/account', require('../services/account-service/routes')); // Redirect to account service routes
// router.use('/notification', require('../services/notification-service/routes/notificationRoutes')); // Redirect to notification service routes
// router.use('/procurement', require('../services/procurement-service/routes/procurementRoutes')); // Redirect to procurement service routes
// router.use('/storefront', require('../services/storefront-service/routes/storefrontRoutes')); // Redirect to storefront service routes

module.exports = router;