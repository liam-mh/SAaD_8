#!/bin/bash

# account service
osascript -e 'tell application "Terminal"
    do script "cd /Users/liam/Documents/GitHub/SAaD_8/Application/services/account-service && npm install && node app.js"
end tell'

# API gateway
osascript -e 'tell application "Terminal"
    do script "cd /Users/liam/Documents/GitHub/SAaD_8/Application/api-gateway && npm install && node app.js"
end tell'

# front end
osascript -e 'tell application "Terminal"
    do script "cd /Users/liam/Documents/GitHub/SAaD_8/Application/client && npm install && npm start"
end tell'