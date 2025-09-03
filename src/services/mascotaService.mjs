import MascotaRepository from '../repositories/MascotaRepository.mjs';
import RefugioRepository from '../repositories/RefugioRepository.mjs';

class MascotaService {
  async listarMascotas(refugioId = null) {
    if (refugioId) return await MascotaRepository.findByRefugio(refugioId);
    return await MascotaRepository.findAll();
  }

  async obtenerMascota(id) {
    const mascota = await MascotaRepository.findById(id);
    if (!mascota) throw new Error('Mascota no encontrada');
    return mascota;
  }

  async crearMascota(data, userId) {
    const refugio = await RefugioRepository.findByUsuario(userId);
    if (!refugio) throw new Error('No tienes un refugio registrado');
    return await MascotaRepository.create({ ...data, refugio: refugio._id });
  }

  async actualizarMascota(id, data, userId) {
    const refugio = await RefugioRepository.findByUsuario(userId);
    const mascota = await MascotaRepository.findById(id);
    if (!mascota || mascota.refugio.toString() !== refugio._id.toString())
      throw new Error('No autorizado para actualizar esta mascota');
    return await MascotaRepository.update(id, data);
  }

  async eliminarMascota(id, userId) {
    const refugio = await RefugioRepository.findByUsuario(userId);
    const mascota = await MascotaRepository.findById(id);
    if (!mascota || mascota.refugio.toString() !== refugio._id.toString())
      throw new Error('No autorizado para eliminar esta mascota');
    return await MascotaRepository.delete(id);
  }
}

export default new MascotaService();