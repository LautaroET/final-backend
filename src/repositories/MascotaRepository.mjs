import IRepository from './IRepository.mjs';
import Mascota from '../models/Mascota.mjs';

class MascotaRepository extends IRepository {
    async obtenerTodos() {
        return await Mascota.find().populate('refugio', 'name address');
    }

    async obtenerPorId(id) {
        return await Mascota.findById(id).populate('refugio', 'name address');
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
    async obtenerPorRefugio(refugioId) {
        return await Mascota.find({ refugio: refugioId }).populate('refugio', 'name address');
    }
}

export default MascotaRepository;