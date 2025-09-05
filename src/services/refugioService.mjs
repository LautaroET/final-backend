import RefugioRepository from '../repositories/RefugioRepository.mjs';
import UserRepository from '../repositories/UserRepository.mjs';
import RoleRepository from '../repositories/RoleRepository.mjs';

class RefugioService {
  async crearRefugio(data, userId) {
    const user = await UserRepository.findById(userId);
    if (!user || user.tipo !== 'comun') throw new Error('Solo usuarios comunes pueden crear refugio');

    if (await RefugioRepository.findByUsuario(userId))
      throw new Error('Ya tienes un refugio registrado');

    const refugio = await RefugioRepository.create({ ...data, usuario: userId });

    const refugioRole = await RoleRepository.findByName('refugio');
    user.role = refugioRole._id;
    user.tipo = 'refugio';
    await UserRepository.update(user._id, { role: refugioRole._id, tipo: 'refugio' });

    return refugio;
  }

  async eliminarRefugio(userId) {
    const refugio = await RefugioRepository.findByUsuario(userId);
    if (!refugio) throw new Error('No tienes un refugio asociado');

    await RefugioRepository.delete(refugio._id);

    const comunRole = await RoleRepository.findByName('comun');
    await UserRepository.update(userId, { role: comunRole._id, tipo: 'comun' });

    return { message: 'Refugio eliminado y usuario vuelto a común' };
  }

  async listarRefugios() {
    return await RefugioRepository.findAll({}, { populate: 'usuario' });
  }

  async findByUsuario(usuarioId) {
    const refugio = await this.model.findOne({ usuario: usuarioId });
    console.log("🔍 Buscando refugio para usuario:", usuarioId);
    console.log("🔍 Refugio encontrado:", refugio?._id);
    return refugio;
  }

  async actualizarMiRefugio(data, userId) {
    const refugio = await RefugioRepository.findByUsuario(userId);
    if (!refugio) throw new Error('No tienes un refugio asociado');
    return await RefugioRepository.update(refugio._id, data);
  }
}

export default new RefugioService();
