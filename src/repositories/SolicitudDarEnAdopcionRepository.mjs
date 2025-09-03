import IRepository from './IRepository.mjs';
import SolicitudDarEnAdopcion from '../models/SolicitudDarEnAdopcion.mjs';

class SolicitudDarEnAdopcionRepository extends IRepository {
  constructor() {
    super(SolicitudDarEnAdopcion);
  }

  async findByRefugio(refugioId) {
    return this.model.find({ refugio: refugioId }).populate('usuario', 'username email');
  }

  async findByUsuario(usuarioId) {
    return this.model.find({ usuario: usuarioId }).populate('refugio', 'nombre email');
  }

  async existeSolicitudPendiente(usuarioId, refugioId) {
    return this.model.findOne({
      usuario: usuarioId,
      refugio: refugioId,
      estado: 'pendiente'
    });
  }
}

export default new SolicitudDarEnAdopcionRepository();