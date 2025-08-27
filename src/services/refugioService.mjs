import RefugioRepository from '../repositories/RefugioRepository.mjs';
const repo = new RefugioRepository();

export const obtenerRefugios = () => repo.obtenerTodos();
export const crearRefugio = (data) => repo.crear(data);
export const obtenerRefugioPorId = (id) => repo.obtenerPorId(id);
export const actualizarRefugio = (id, data) => repo.actualizarPorId(id, data);
export const eliminarRefugio = (id) => repo.eliminarPorId(id);