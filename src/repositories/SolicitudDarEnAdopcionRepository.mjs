import SolicitudDarEnAdopcion from '../models/SolicitudDarEnAdopcion.mjs';
import IRepository from './IRepository.mjs';

class SolicitudDarEnAdopcionRepository extends IRepository {
  async obtenerTodos() {
    return await SolicitudDarEnAdopcion.find().populate('usuario refugio');
  }

  async crear(data) {
    return await SolicitudDarEnAdopcion.create(data);
  }

  async actualizarPorId(id, data) {
    return await SolicitudDarEnAdopcion.findByIdAndUpdate(id, data, { new: true });
  }

  async obtenerPorRefugio(refugioId) {
    return await SolicitudDarEnAdopcion.find({ refugio: refugioId }).populate('usuario');
  }
}

export default SolicitudDarEnAdopcionRepository;