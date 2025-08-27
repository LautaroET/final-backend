import IRepository from './IRepository.mjs';
import Usuario from '../models/Usuario.mjs';

class UsuarioRepository extends IRepository {
    async obtenerTodos() {
        return await Usuario.find({ creador: 'Tapia Lautaro' }).sort({ nombre: 1 });
    }

    async obtenerPorId(id) {
        return await Usuario.findById(id);
    }

    async crear(data) {
        return await Usuario.create(data);
    }

    async actualizarPorId(id, datos) {
        return await Usuario.findByIdAndUpdate(id, datos, { new: true });
    }

    async eliminarPorId(id) {
        return await Usuario.findByIdAndDelete(id);
    }
}

export default UsuarioRepository;