import SolicitudAdopcion from '../models/SolicitudAdopcion.mjs';
import IRepository from './IRepository.mjs';

class SolicitudAdopcionRepository extends IRepository {
  async obtenerTodos() {
    return await SolicitudAdopcion.find().populate('usuario mascota');
  }

  async crear(data) {
    return await SolicitudAdopcion.create(data);
  }

  async actualizarPorId(id, data) {
    return await SolicitudAdopcion.findByIdAndUpdate(id, data, { new: true });
  }

  async obtenerPorRefugio(refugioId) {
    return await SolicitudAdopcion.find()
      .populate({
        path: 'mascota',
        match: { refugio: refugioId }
      })
      .populate('usuario');
  }
}

export default SolicitudAdopcionRepository;