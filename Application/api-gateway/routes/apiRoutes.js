const express = require('express');
const axios = require('axios');
const router = express.Router();
// const apiController = require('../controllers/apiController');


// Define routes for each microservice
const accountServicePORT = 4001;

router.use('/account', async (req, res) => {
    try {
        const originalUrl = req.originalUrl.replace('/account', '')
        const forwardUrl = `http://localhost:${accountServicePORT + originalUrl}`;
        // console.log(`Forwarding request to: ${forwardUrl}`);

        // Forward the request to the account service
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