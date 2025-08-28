import jwt from 'jsonwebtoken';
import { AuthRepository } from '../repositories/AuthRepository.mjs';

const repo = new AuthRepository();

export const registrar = async (data) => {
  const existe = await repo.buscarPorEmail(data.email);
  if (existe) throw new Error('Email ya registrado');
  return await repo.crear(data);
};

export const login = async (email, password) => {
  const user = await repo.buscarPorEmail(email);
  if (!user) throw new Error('Usuario no encontrado');
  const ok = await repo.compararPassword(password, user.password);
  if (!ok) throw new Error('Contraseña incorrecta');
  const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return { token, usuario: { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol } };
};