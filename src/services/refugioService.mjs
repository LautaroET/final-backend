import RefugioRepository from '../repositories/RefugioRepository.mjs';
const repo = new RefugioRepository();

export const obtenerRefugios =  (filters, options) => repo.obtenerTodos(filters, options);
export const crearRefugio = (data) => repo.crear(data);
export const obtenerRefugioPorId = (id) => repo.obtenerPorId(id);
export const actualizarRefugio = (id, data) => repo.actualizarPorId(id, data);
export const eliminarRefugio = (id) => repo.eliminarPorId(id);