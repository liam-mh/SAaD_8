const express = require('express');
const router = express.Router();
const NotificationService = require('../services/notificationService');
const config = require('../../config/env'); // Load your config

// Initialize the NotificationService with configuration
const notificationService = new NotificationService({
  email: {
    service: 'gmail',
    auth: { user: config.EMAIL_USER, pass: config.EMAIL_PASS },
  },
  twilio: {
    accountSid: config.TWILIO_ACCOUNT_SID,
    authToken: config.TWILIO_AUTH_TOKEN,
    phoneNumber: config.TWILIO_PHONE_NUMBER,
  },
});

// Route to send an email
router.post('/send', async (req, res) => {
  const { to, subject, message } = req.body;

  // Input validation
  if (!to || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Use NotificationService to send an email
    const result = await notificationService.sendEmail(to, subject, message);
    return res.status(200).json({ message: 'Email sent successfully', result });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
