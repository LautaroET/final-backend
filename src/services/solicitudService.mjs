import SolicitudRepository from '../repositories/SolicitudRepository.mjs';
const repo = new SolicitudRepository();

export const obtenerSolicitudes = () => repo.obtenerTodos();
export const crearSolicitud = (data) => repo.crear(data);
export const obtenerSolicitudPorId = (id) => repo.obtenerPorId(id);
export const actualizarSolicitud = (id, data) => repo.actualizarPorId(id, data);
export const eliminarSolicitud = (id) => repo.eliminarPorId(id);
export const obtenerSolicitudesPorRefugio = (refugioId) => repo.obtenerPorRefugio(refugioId);
export const obtenerSolicitudesPorUsuario = (usuarioId) => repo.obtenerPorUsuario(usuarioId);