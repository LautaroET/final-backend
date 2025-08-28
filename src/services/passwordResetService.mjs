import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { PasswordResetTokenRepository } from '../repositories/PasswordResetTokenRepository.mjs';
import { AuthRepository } from '../repositories/AuthRepository.mjs';
import { enviarEmail } from '../services/emailService.mjs';

const tokenRepo = new PasswordResetTokenRepository();
const authRepo = new AuthRepository();

export const solicitarReset = async (email) => {
  const user = await authRepo.buscarPorEmail(email);
  if (!user) throw new Error("Usuario no encontrado");

  await tokenRepo.deleteByUser(user._id);

  const token = crypto.randomBytes(32).toString('hex');
  await tokenRepo.createToken(user._id, token);

  const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
  await enviarEmail({
    to: email,
    subject: 'Restablecer contraseña',
    text: `Hola ${user.nombre}, haz clic aquí para restablecer tu contraseña: ${resetUrl}`
  });

  return { message: 'Email enviado' };
};

export const resetPassword = async (token, newPassword) => {
  const record = await tokenRepo.findByToken(token);
  if (!record || record.expiresAt < Date.now()) throw new Error("Token inválido o expirado");

  const hashed = await bcrypt.hash(newPassword, 10);
  await authRepo.actualizarPassword(record.user._id, hashed);
  await tokenRepo.deleteByUser(record.user._id);

  return { message: 'Contraseña actualizada' };
};