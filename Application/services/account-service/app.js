const express = require('express');
const memberRoutes = require('./routes');
const config = require('../../config/env');
const app = express();

app.use(express.json());
app.use('/api', memberRoutes);

const PORT = config.ACCOUNT_SERVICE_PORT;
app.listen(PORT, () => console.log(`Account Service running on port ${PORT}`));