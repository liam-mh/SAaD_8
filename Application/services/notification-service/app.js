const express = require('express');
const routes = require('./routes'); 
const config = require('../../config/env');
const app = express();

app.use(express.json()); 
app.use('/api', routes); 

const PORT = config.NOTIFICATION_SERVICE_PORT;

app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});

