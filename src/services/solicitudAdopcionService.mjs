// services/solicitudAdopcionService.mjs
import SolicitudAdopcionRepository from '../repositories/SolicitudAdopcionRepository.mjs';
const repo = new SolicitudAdopcionRepository();

export const crearSolicitud = (data) => repo.crear(data);
export const obtenerSolicitudesPorRefugio = (refugioId) => repo.obtenerPorRefugio(refugioId);
export const actualizarEstado = (id, estado, respuesta) =>
  repo.actualizarPorId(id, { estado, respuestaDelRefugio: respuesta });