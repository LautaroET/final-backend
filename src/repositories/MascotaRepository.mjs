import IRepository from './IRepository.mjs';
import Mascota from '../models/Mascota.mjs';

class MascotaRepository extends IRepository {
  async obtenerTodos() {
    return await Mascota.find({ creador: 'Tapia Lautaro' }).populate('refugio', 'nombre direccion').sort({ nombre: 1 });
  }

  async obtenerPorId(id) {
    return await Mascota.findById(id).populate('refugio', 'nombre direccion');
  }

  async crear(data) {
    return await Mascota.create(data);
  }

  async actualizarPorId(id, datos) {
    return await Mascota.findByIdAndUpdate(id, datos, { new: true });
  }

  async eliminarPorId(id) {
    return await Mascota.findByIdAndDelete(id);
  }

  /* extra: listar por refugio */
  async obtenerPorRefugio(refugioId) {
    return await Mascota.find({ refugio: refugioId, creador: 'Tapia Lautaro' }).sort({ nombre: 1 });
  }
}

export default MascotaRepository;