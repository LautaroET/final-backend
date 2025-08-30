import SolicitudDePublicacionRepository from '../repositories/SolicitudDePublicacionRepository.mjs';
const repo = new SolicitudDePublicacionRepository();

export const obtenerSolicitudes = (filters, options) => repo.obtenerTodos(filters, options);
export const crearSolicitud = (data) => repo.crear(data);
export const obtenerSolicitudPorId = (id) => repo.obtenerPorId(id);
export const actualizarSolicitud = (id, data) => repo.actualizarPorId(id, data);
export const eliminarSolicitud = (id) => repo.eliminarPorId(id);
export const obtenerSolicitudesPorRefugio = (refugioId) => repo.obtenerPorRefugio(refugioId);
export const obtenerSolicitudesPorUsuario = (usuarioId) => repo.obtenerPorUsuario(usuarioId);