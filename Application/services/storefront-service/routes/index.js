const express = require('express');
const {handleRoutes} = require("shared");
const router = express.Router();

/**
 * Define resources for storefront service.
 * Use the route handler utility.
 * @author Guy Nicklin
 */

const resources = ['branch', 'media', 'media-history', 'new-media-request', 'wishlist'];
handleRoutes(router, 'storefront-service', resources);

module.exports = router;

