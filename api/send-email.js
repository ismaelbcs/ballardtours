// api/send-email.js
const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { to, subject, html, text } = body;

    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({
        error: 'Faltan parámetros requeridos (to, subject, html/text)',
      });
    }

    const emailUser = process.env.EMAIL_USER || 'reservationballard@gmail.com';
    const emailPass = process.env.EMAIL_PASS || 'rdtmmazjsjolpbwm';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: `"Ballard Tours Los Cabos" <${emailUser}>`,
      to,
      subject,
      html,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado con éxito:', info.messageId);

    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error al enviar correo vía Nodemailer:', error);
    return res.status(500).json({
      error: 'Error al enviar el correo',
      details: error.message,
    });
  }
};

