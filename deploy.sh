#!/bin/bash

# Install Config
echo "Install Config"
cd ./Application/config && npm i
cd - # Return to the original directory

# Install Shared
echo "Install Shared"
cd ./Application/services/shared && npm i
cd - # Return to the original directory

# Start Account Service
echo "Start Account Service"
(cd ./Application/services/account-service && npm i && node app.js) &

# Start Storefront Service
echo "Start Storefront Service"
(cd ./Application/services/storefront-service && npm i && node app.js) &

# Start Notification Service
echo "Start Notification Service"
(cd ./Application/services/notification-service && npm i && node app.js) &

# Start API Gateway
echo "Start API Gateway"
(cd ./Application/api-gateway && npm i && node app.js) &

# Start Client
echo "Start Client"
(cd ./Application/client && npm i && npm start) &