const express = require('express');
const userRoutes = require('./routes');
const app = express();

app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 4001; // Different port for each service
app.listen(PORT, () => console.log(`Account Service running on port ${PORT}`));