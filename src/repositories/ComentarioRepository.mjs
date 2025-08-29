import Comentario from '../models/Comentario.mjs';

export class ComentarioRepository {
  async crear(data) {
    return await Comentario.create(data);
  }

  async obtenerPorRefugio(refugioId) {
    return await Comentario.find({ refugio: refugioId })
      .populate('usuario', 'nombre email')
      .sort({ fecha: -1 });
  }

  async eliminar(id) {
    return await Comentario.findByIdAndDelete(id);
  }
}