import IRepository from './IRepository.mjs';
import Usuario from '../models/Usuario.mjs';

class UsuarioRepository extends IRepository {
    async obtenerTodos() {
        return await Usuario.find().select('-password');
    }

    async obtenerPorId(id) {
        return await Usuario.findById(id).select('-password');
    }

    async crear(data) {
        return await Usuario.create(data);
    }

    async actualizarPorId(id, datos) {
        return await Usuario.findByIdAndUpdate(id, datos, { new: true }).select('-password');
    }

    async eliminarPorId(id) {
        return await Usuario.findByIdAndDelete(id);
    }

    async obtenerPorEmail(email) {
        return await Usuario.findOne({ email });
    }
}

export default UsuarioRepository;