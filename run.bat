@ECHO OFF

start cmd /c "echo Install Config && cd ./Application/config && npm i"

start cmd /k "echo Start Account Service && cd ./Application/services/account-service && npm i && node app.js"

start cmd /k "echo Start API Gateway && cd ./Application/api-gateway && npm i && node app.js"

start cmd /k "echo Start Client && cd ./Application/client && npm i && npm start"