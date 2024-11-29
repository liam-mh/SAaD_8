@ECHO OFF

start cmd /c "echo Install Config && cd ./Application/config && npm i"

start cmd /c "echo Install Shared && cd ./Application/services/shared && npm i"

start cmd /k "echo Start Account Service && cd ./Application/services/account-service && npm i && node app.js"

start cmd /k "echo Start Storefront Service && cd ./Application/services/storefront-service && npm i && node app.js"

start cmd /k "echo Start Notification Service && cd ./Application/services/notification-service && npm i && node app.js"

start cmd /k "echo Start API Gateway && cd ./Application/api-gateway && npm i && node app.js"

start cmd /k "echo Start Client && cd ./Application/client && npm i && npm start"