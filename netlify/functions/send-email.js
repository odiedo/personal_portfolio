const nodemailer = require('nodemailer');
const querystring = require('querystring');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  // Parse form-encoded data (application/x-www-form-urlencoded)
  const formData = querystring.parse(event.body);
  const { name, email, subject, msg } = formData;

  if (!name || !email || !subject || !msg) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing fields' }),
    };
  }

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: 'odiedopaul@gmail.com',
    subject: `New message from ${name}: ${subject}`,
    text: msg,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email', error }),
    };
  }
};
