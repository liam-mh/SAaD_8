const express = require('express');
const router = express.Router();


router.post('/send', (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log(`SMS sent to ${to}: "${message}"`);
  return res.status(200).json({ message: 'SMS sent successfully' });
});

module.exports = router;
