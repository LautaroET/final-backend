import IRepository from './IRepository.mjs';
import Solicitud from '../models/SolicitudDePublicacion.mjs';

class SolicitudDePublicacionRepository extends IRepository {
    async obtenerTodos() {
        return await Solicitud.find()
            .populate('usuario', 'username email')
            .populate('refugio', 'name address');
    }

    async obtenerPorId(id) {
        return await Solicitud.findById(id)
            .populate('usuario', 'username email')
            .populate('refugio', 'name address');
    }

    async crear(data) {
        return await Solicitud.create(data);
    }

    async actualizarPorId(id, datos) {
        return await Solicitud.findByIdAndUpdate(id, datos, { new: true });
    }

    async eliminarPorId(id) {
        return await Solicitud.findByIdAndDelete(id);
    }

    async obtenerPorRefugio(refugioId) {
        return await Solicitud.find({ refugio: refugioId })
            .populate('usuario', 'username email');
    }

    async obtenerPorUsuario(usuarioId) {
        return await Solicitud.find({ usuario: usuarioId })
            .populate('refugio', 'name address');
    }
}

export default SolicitudDePublicacionRepository;