require('dotenv').config();
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY});


async function sendEmail(to, subject, text, html) {
  const data = {
    from: 'umorudavido@gmail.com',
    to: to,
    subject,
    text,
    html,
  };

  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email', error);
  }
}

module.exports = {
  sendEmail,
};
