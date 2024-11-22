const express = require('express');
const handleRoutes = require('../../utils/routeHandler');
const router = express.Router();

// Define resources for the account service
const resources = ['member', 'employee', 'member-subscription', 'subscription', 'payment'];

// Use the route handler utility to dynamically register routes.
handleRoutes(router, 'account-service', resources);

module.exports = router;