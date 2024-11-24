const express = require('express');
const {handleRoutes} = require("shared");
const router = express.Router();

// Define resources for storefront service
const resources = ['branch', 'media', 'media-history', 'new-media-request', 'wishlist'];

// Use the route handler utility.
handleRoutes(router, 'storefront-service', resources);

module.exports = router;

