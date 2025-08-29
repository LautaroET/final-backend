// services/solicitudAdopcionService.mjs
import SolicitudAdopcionRepository from '../repositories/SolicitudAdopcionRepository.mjs';
const repo = new SolicitudAdopcionRepository();

import Mascota from '../models/Mascota.mjs';

export const crearSolicitud = async (data) => {
  const mascota = await Mascota.findById(data.mascota);
  if (!mascota) throw new Error('Mascota no encontrada');

  return await repo.crear({ ...data, refugio: mascota.refugio });
};
export const obtenerSolicitudesPorRefugio = (refugioId) => repo.obtenerPorRefugio(refugioId);
export const actualizarEstado = (id, estado, respuesta) =>
  repo.actualizarPorId(id, { estado, respuestaDelRefugio: respuesta });