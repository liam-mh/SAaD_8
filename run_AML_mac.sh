#!/bin/bash

# Get the current working directory
CURRENT_DIR=$(pwd)

# Define the relative paths to each service from the current directory
FRONTEND_DIR="$CURRENT_DIR/Application/client"
ACCOUNT_SERVICE_DIR="$CURRENT_DIR/Application/services/account-service"
API_GATEWAY_DIR="$CURRENT_DIR/Application/api-gateway"

# Function to run commands in the current terminal
run_commands() {
    local dir="$1"
    local cmd="$2"

    echo "Navigating to $dir and running commands..."
    cd "$dir" || { echo "Failed to navigate to $dir"; return; }
    eval "$cmd"
}

# Frontend Terminal
if [ -d "$FRONTEND_DIR" ]; then
    run_commands "$FRONTEND_DIR" "npm install; npm start"
else
    echo "Directory $FRONTEND_DIR does not exist."
fi

# Backend Terminal 1: Account Service
if [ -d "$ACCOUNT_SERVICE_DIR" ]; then
    run_commands "$ACCOUNT_SERVICE_DIR" "npm install; node app.js"
else
    echo "Directory $ACCOUNT_SERVICE_DIR does not exist."
fi

# Backend Terminal 2: API Gateway
if [ -d "$API_GATEWAY_DIR" ]; then
    run_commands "$API_GATEWAY_DIR" "npm install; node app.js"
else
    echo "Directory $API_GATEWAY_DIR does not exist."
fi
