import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

//Send Email function

// Configure your SMTP server details
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // e.g., smtp.gmail.com for Gmail
    port: 465, // e.g., 465 for Gmail with SSL
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
    },
    // authMethod: 'PLAIN',
    //       tls: {
    //           rejectUnauthorized: true,
    //       }
});

export const sendMail = async (to, subject, text, html) => {
    console.log("entered nodemailer");
    const mailOptions = {
        from: process.env.SENDER_EMAIL, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // HTML body content
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

