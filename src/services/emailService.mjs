import { transporter } from '../config/mailer.mjs';

export const enviarEmail = async ({ to, subject, text }) => {
  try {
    await transporter.sendMail({
      from: `"Patitas al Rescate" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    });
  } catch (err) {
    console.error('Error al enviar email:', err.message);
  }
};