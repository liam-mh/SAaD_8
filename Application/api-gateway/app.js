const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const config = require('./config')
const app = express();

app.use(cors({
    origin: config.FRONTEND_ORIGIN, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));
app.use(express.json());
app.use('/api', apiRoutes);

const PORT = config.API_GATEWAY_PORT;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));