// routes/email.js
const express = require('express');
const EmailService = require('../emailService');
const router = express.Router();

const emailService = new EmailService();

router.post('/send', async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await emailService.sendEmail(to, subject, message);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
