const express = require('express');
const router = express.Router();

// Example route to send an SMS
router.post('/send', (req, res) => {
  const { to, message } = req.body;

  // Your SMS logic (e.g., using Twilio)
  if (!to || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Simulate SMS sending
  console.log(`SMS sent to ${to}: "${message}"`);
  return res.status(200).json({ message: 'SMS sent successfully' });
});

module.exports = router;
