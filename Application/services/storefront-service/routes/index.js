const express = require('express');
const handleRoutes = require('../../utils/routeHandler');
const router = express.Router();

// Define resources for this service
const resources = ['branch', 'media', 'media-history', 'new-media-request', 'wishlist'];

// Use the route handler for account-service
handleRoutes(router, 'storefront-service', resources);

module.exports = router;

