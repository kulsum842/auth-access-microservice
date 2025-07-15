// Import Nodemailer for sending emails
const nodemailer = require('nodemailer');

// sendEmail: utility function to send an email
const sendEmail = async (to, subject, html) => {
  try {
    // Create a transporter object using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Can be replaced with 'Mailgun', 'SendGrid', etc. for production
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address (from .env)
        pass: process.env.EMAIL_PASS  // App-specific password (NOT your Gmail login password)
      }
    });

    // Define the email options
    const mailOptions = {
      from: `"Auth Microservice" <${process.env.EMAIL_USER}>`, // Sender label
      to,                                                      // Recipient email
      subject,                                                 // Email subject
      html                                                     // HTML email body
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Export the utility to be used in other modules
module.exports = sendEmail;
