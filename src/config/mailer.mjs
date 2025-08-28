import nodemailer from 'nodemailer';

// Configuración básica con Gmail (podes usar otros servicios)
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // tu email
    pass: process.env.EMAIL_PASS  // contraseña de aplicación
  }
});