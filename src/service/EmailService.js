import dotenv from 'dotenv';
import nodeMailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import logger from '/logger';

dotenv.config();

const mailTransporter = nodeMailer.createTransport(
  smtpTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  }),
);

class EmailService {
  /**
   * @param {import('/dto').EmailSendRequestDTO} payload
   * @return {Promise<void>}
   */
  async sendEmail(payload) {
    const { to, title, body, from } = payload;
    try {
      await mailTransporter.sendMail({
        to,
        from,
        subject: title,
        html: body,
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

const instance = new EmailService();

export default instance;