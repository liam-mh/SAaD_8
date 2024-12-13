// services/notificationService.js
const twilio = require('twilio');
const nodemailer = require('nodemailer');

/**
 * !!INACTIVE!!
 * TWILLO Notification service for sending emails and SMS.
 * @author Guy Nicklin
 */
class NotificationService {
  constructor(config) {
    this.smsClient = twilio(config.twilio.accountSid, config.twilio.authToken);
    this.emailTransporter = nodemailer.createTransport(config.email);
  }

  // Method to send an email
  async sendEmail(to, subject, text) {
    try {
      const result = await this.emailTransporter.sendMail({
        from: this.emailTransporter.options.auth.user,
        to,
        subject,
        text,
      });
      return result;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

  // Method to send an SMS
  async sendSMS(to, message) {
    try {
      const result = await this.smsClient.messages.create({
        to,
        body: message,
        from: config.twilio.phoneNumber,
      });
      return result;
    } catch (error) {
      console.error('Failed to send SMS:', error);
      throw error;
    }
  }
}

module.exports = NotificationService;
