import MascotaRepository from '../repositories/MascotaRepository.mjs';
const repo = new MascotaRepository();

export const obtenerMascotas = (filters, options) => repo.obtenerTodos(filters, options);
export const crearMascota = (data) => repo.crear(data);
export const obtenerMascotaPorId = (id) => repo.obtenerPorId(id);
export const actualizarMascota = (id, data) => repo.actualizarPorId(id, data);
export const eliminarMascota = (id) => repo.eliminarPorId(id);
export const obtenerMascotasPorRefugio = (refugioId) => repo.obtenerPorRefugio(refugioId);