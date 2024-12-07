const nodemailer = require('nodemailer');
const config = require('../../config/env');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: config.EMAIL_USER, 
        pass: config.EMAIL_PASS
      },
    });
  }

  /**
   * Sends an email with optional HTML content and an emblem.
   *
   * @param {string} to - The recipient's email address.
   * @param {string} subject - The subject of the email.
   * @param {string} text - The plain text message of the email.
   * @returns {Promise<Object>} Resolves with information about the sent email.
   * @throws {Error} Throws an error if the email fails to send.
   */
  async sendEmail(to, subject, text) {
    try {

      const htmlContent = `
        <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #555; font-weight: bold;">${subject}</h2>
          <p style="font-size: 16px; line-height: 1.5;">${text}</p>
        </div>
      `;

      const info = await this.transporter.sendMail({
        from: config.EMAIL_USER,
        to,
        subject,
        html: htmlContent, 
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
