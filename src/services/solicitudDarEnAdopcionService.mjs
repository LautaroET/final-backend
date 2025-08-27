import SolicitudDarEnAdopcionRepository from '../repositories/SolicitudDarEnAdopcionRepository.mjs';
const repo = new SolicitudDarEnAdopcionRepository();

export const crearSolicitud = (data) => repo.crear(data);
export const obtenerSolicitudesPorRefugio = (refugioId) => repo.obtenerPorRefugio(refugioId);
export const actualizarEstado = (id, estado, respuesta) =>
  repo.actualizarPorId(id, { estado, respuestaDelRefugio: respuesta });