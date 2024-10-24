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
      user: 'odiedopaul@gmail.com',
      pass: 'oeor ibwd ewpn erqq'
    },
  });

  const mailOptions = {
    from: email,
    to: 'odiedopaul@gmail.com',
    subject: `Message from ${name}: ${subject}`,
    text: `${msg} <br> ${email} `,
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
