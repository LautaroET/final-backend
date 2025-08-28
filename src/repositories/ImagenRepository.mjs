import Mascota from '../models/Mascota.mjs';
import Refugio from '../models/Refugio.mjs';
import Usuario from '../models/Usuario.mjs';

export class ImagenRepository {
  async agregarImagen(modelo, id, imageUrl) {
    const entidad = await modelo.findById(id);
    if (!entidad) throw new Error('Entidad no encontrada');

    if (modelo === Mascota) {
      entidad.images.push(imageUrl);
    } else {
      entidad.image = imageUrl;
    }

    await entidad.save();
    return entidad;
  }
}