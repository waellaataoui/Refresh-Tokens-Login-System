'use strict';
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
export const sendMail = async (email, subject, body) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'leonel.greenfelder0@ethereal.email',
      pass: 'vd9mHTgEqzugsvN94S',
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'leonel.greenfelder0@ethereal.email', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: body, // html body
  });

  console.log('Message sent: %s', info.messageId);

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
