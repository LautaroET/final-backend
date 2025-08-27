import IRepository from './IRepository.mjs';
import Refugio from '../models/Refugio.mjs';

class RefugioRepository extends IRepository {
    async obtenerTodos() {
        return await Refugio.find({ creador: 'Tapia Lautaro' }).sort({ nombre: 1 });
    }

    async obtenerPorId(id) {
        return await Refugio.findById(id);
    }

    async crear(data) {
        return await Refugio.create(data);
    }

    async actualizarPorId(id, datos) {
        return await Refugio.findByIdAndUpdate(id, datos, { new: true });
    }

    async eliminarPorId(id) {
        return await Refugio.findByIdAndDelete(id);
    }
}

export default RefugioRepository;