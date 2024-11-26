const express = require('express');
const emailRoutes = require('./routes/email');
const app = express();

app.use(express.json());
app.use('/api/email', emailRoutes);

const PORT = process.env.NOTIFICATION_SERVICE_PORT || 4002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
