'use strict';

const nodemailer = require('nodemailer');
const winston = require('./../utils/winston').logger;

// create transport object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async ({ body }) => {
  // create the message
  const message = {
    from: body.from,
    to: body.to,
    subject: body.subject,
    text: body.text,
  };

  // send mail with defined transport object
  return transporter.sendMail(message, (error, info) => {
    if (error) {
      // log with winston
      winston.error(`Error while sending logs in email ${error}`);
      return error;
    }
    // winston here
    winston.info(`Message sent to ${info.messageId}`);
    return true;
  });
};

module.exports = {
  sendEmail,
};
