const nodemailer = require('nodemailer');
const config = require('../../config/env');


class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: config.EMAIL_USER, // Your Gmail address
        pass: config.EMAIL_PASS // Your Gmail App Password
      },
    });
  }

  async sendEmail(to, subject, text) {
    try {
      const info = await this.transporter.sendMail({
        from: config.EMAIL_USER,
        to,
        subject,
        text,
      });
      console.log('Email sent: ', info.response);
      return info;
    } catch (error) {
      console.error('Error sending email: ', error);
      throw error;
    }
  }
}

module.exports = EmailService;
