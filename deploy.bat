@ECHO OFF

start cmd /c "title Install Config && cd ./Application/config && npm i"

start cmd /c "title Install Shared && cd ./Application/services/shared && npm i"

start cmd /k "title Start Account Service && cd ./Application/services/account-service && npm i && node app.js"

start cmd /k "title Start Storefront Service && cd ./Application/services/storefront-service && npm i && node app.js"

start cmd /k "title Start Notification Service && cd ./Application/services/notification-service && npm i && node app.js"

start cmd /k "title Start API Gateway && cd ./Application/api-gateway && npm i && node app.js"

start cmd /k "echo Start Client && title Start Client && cd ./Application/client && npm i && npm start"
