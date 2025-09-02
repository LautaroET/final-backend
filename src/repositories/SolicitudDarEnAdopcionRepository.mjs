import IRepository from './IRepository.mjs';
import SolicitudDarEnAdopcion from '../models/SolicitudDarEnAdopcion.mjs';

class SolicitudDarEnAdopcionRepository extends IRepository {
  constructor() {
    super(SolicitudDarEnAdopcion);
  }

  // Obtener todas las solicitudes "dar en adopción" de un refugio específico
  async findByRefugio(refugioId) {
    return this.model
      .find({ refugio: refugioId })
      .populate('usuario', 'username email');
  }

  // Obtener todas las solicitudes "dar en adopción" de un usuario específico
  async findByUsuario(usuarioId) {
    return this.model
      .find({ usuario: usuarioId })
      .populate('refugio', 'nombre email');
  }

  // Verificar si ya existe una solicitud pendiente para este usuario y refugio
  async existeSolicitudPendiente(usuarioId, refugioId) {
    return this.model.findOne({
      usuario: usuarioId,
      refugio: refugioId,
      estado: 'pendiente'
    });
  }
}

export default new SolicitudDarEnAdopcionRepository();