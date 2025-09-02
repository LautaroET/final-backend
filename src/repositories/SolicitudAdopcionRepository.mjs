import IRepository from './IRepository.mjs';
import SolicitudAdopcion from '../models/SolicitudAdopcion.mjs';

class SolicitudAdopcionRepository extends IRepository {
  constructor() {
    super(SolicitudAdopcion);
  }

  // Obtener todas las solicitudes de adopción de un refugio específico
  async findByRefugio(refugioId) {
    return this.model
      .find({ refugio: refugioId })
      .populate('usuario', 'username email')
      .populate('mascota', 'nombre especie edad imagen');
  }

  // Obtener todas las solicitudes de adopción de un usuario específico
  async findByUsuario(usuarioId) {
    return this.model
      .find({ usuario: usuarioId })
      .populate('mascota', 'nombre especie edad imagen')
      .populate('refugio', 'nombre email');
  }

  // Verificar si ya existe una solicitud para esta mascota y usuario
  async existeSolicitud(usuarioId, mascotaId) {
    return this.model.findOne({ usuario: usuarioId, mascota: mascotaId });
  }
}

export default new SolicitudAdopcionRepository();