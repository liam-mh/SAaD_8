const express = require('express');
const handleRoutes = require('../../utils/routeHandler');
const router = express.Router();

// Define resources for this service
const resources = ['member', 'employee', 'member-subscriptions', 'subscription', 'payment'];

// Use the route handler for account-service
handleRoutes(router, 'account-service', resources);

module.exports = router;

