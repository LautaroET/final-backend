import MascotaRepository from '../repositories/MascotaRepository.mjs';
import Mascota from '../models/Mascota.mjs';
const repo = new MascotaRepository();

export const obtenerMascotas = () => repo.obtenerTodos();
export const crearMascota = (data) => repo.crear(data);
export const obtenerMascotaPorId = (id) => repo.obtenerPorId(id);
export const actualizarMascota = (id, data) => repo.actualizarPorId(id, data);
export const eliminarMascota = (id) => repo.eliminarPorId(id);
export const obtenerMascotasPorRefugio = (refugioId) => repo.obtenerPorRefugio(refugioId);
export const obtenerMascotasConFiltros = (filtros) => {
  return Mascota.find(filtros).populate('refugio', 'name address');
};
export const obtenerMascotasPaginados = (query, skip, limit, sort, order) => {
  return Mascota.find(query)
    .populate('refugio', 'name address')
    .sort({ [sort]: order === 'desc' ? -1 : 1 })
    .skip(skip)
    .limit(limit);
};

export const contarMascotas = (query) => {
  return Mascota.countDocuments(query);
};