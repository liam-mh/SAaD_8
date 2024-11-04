@echo off
set ROOT_DIR=%cd%

REM front end
cd %ROOT_DIR%\Application\client
npm install
start "" npm start

REM account service
cd %ROOT_DIR%\Application\services\account-service
npm install
start "" node app.js

REM API gateway
cd %ROOT_DIR%\Application\api-gateway
npm install
start "" node app.js

pause
