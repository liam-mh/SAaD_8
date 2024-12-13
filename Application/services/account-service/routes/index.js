const express = require('express');
const {handleRoutes} = require("shared");
const router = express.Router();

/**
 * Defines resources for the account service.
 * Use the route handler utility to dynamically register routes.
 * 
 * @author Guy Nicklin
 */

const resources = ['member', 'employee', 'member-subscription', 'subscription', 'payment'];
handleRoutes(router, 'account-service', resources);

module.exports = router;