// src/services/refugioService.mjs
import Refugio from '../models/Refugio.mjs';
import RefugioRepository from '../repositories/RefugioRepository.mjs';
import Usuario from '../models/Usuario.mjs'

const repo = new RefugioRepository();

export const obtenerRefugios = (filters, options) => repo.obtenerTodos(filters, options);
export const obtenerRefugioPorId = (id) => repo.obtenerPorId(id);

export const crearRefugio = async (data) => {
  const { usuarioId } = data;
  const existing = await Refugio.findOne({ usuarioId });
  const refugioRole = await Role.findOne({ name: 'refugio' });
  if (!refugioRole) throw new Error('Rol "refugio" no encontrado');
  await Usuario.findByIdAndUpdate(usuarioId, { role: refugioRole._id });
  if (existing) {
    throw new Error('Ya tienes un refugio registrado');
  }
  return await repo.crear(data);
};

export const actualizarRefugio = (id, data) => repo.actualizarPorId(id, data);
export const eliminarRefugio = (id) => repo.eliminarPorId(id);