import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';
import ErrorHelper from '../helper/errorHelper.js';

const styles = {
  bodyFontFamily: "'Verdana', Helvetica, Arial, sans-serif",
  bodyBackground: "#f4f4f4",
  containerBackground: "#ffffff",
  containerPadding: "20px",
  containerBorderRadius: "8px",
  containerBoxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  headingColor: "#01b3e9",
  headingMarginBottom: "20px",
  textColor: "#333333",
  textFontSize: "16px",
  textMarginBottom: "30px",
  buttonPadding: "12px 24px",
  buttonBackground: "#01b3e9",
  buttonTextColor: "#fff",
  buttonBorderRadius: "4px",
  buttonFontSize: "16px",
  buttonTransition: "background-color 0.3s",
  h2Color: "#222222",
  h3Color: "#444444",
  h4Color: "#666666",
  h2MarginBottom: "10px",
  h3MarginBottom: "10px",
  h4MarginBottom: "10px",
};

let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS,
    },
});

class EmailService {
  static async sendNewContactNotification(data) {
    const mailOptions = {
      from: `"${data.name}" <${process.env.EMAIL_AUTH_USER}>`,
      to: process.env.EMAIL_ADMIN,
      subject: "Dobili ste novi upit!",
      text: `Imate novi upit iz kontakt forme od ${data.name}`,
      html: `
        <html lang="sr">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Novi upit</title>
        </head>
        <body style="font-family: ${styles.bodyFontFamily}; background-color: ${styles.bodyBackground}; text-align: center; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: ${styles.containerBackground}; padding: ${styles.containerPadding}; border-radius: ${styles.containerBorderRadius}; box-shadow: ${styles.containerBoxShadow};">
            <h1 style="color: ${styles.headingColor}; margin-bottom: 20px;">Novi upit!</h1>
            <h2 style="color: ${styles.h2Color}; margin-bottom: ${styles.h2MarginBottom};">Imate novi upit od ${data.name} (Email: ${data.email})</h2>
            <h3 style="color: ${styles.h3Color}; margin-bottom: ${styles.h3MarginBottom};">Naslov: ${data.title}</h3>
            <h4 style="color: ${styles.h4Color}; margin-bottom: ${styles.h4MarginBottom};">Telefon: ${data.phone}</h4>
            <p style="color: ${styles.textColor}; font-size: ${styles.textFontSize}; margin-bottom: ${styles.textMarginBottom};">${data.message}</p>
          </div>
        </body>
        </html>
      `,
    };

    try {
      let info = await transporter.sendMail(mailOptions);
        if (!info) {
          return false;
        }

        return true;
    } catch (error) {
      return false;
    }
  }
}

export default EmailService;
