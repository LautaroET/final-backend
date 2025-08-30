import IRepository from './IRepository.mjs';
import Usuario from '../models/Usuario.mjs';
import { buildQuery } from '../../utils/paginate.js';

class UsuarioRepository extends IRepository {
    async obtenerTodos(filters = {}, options = {}) {
    const { skip, limit, sort, filter } = buildQuery(filters, options);
    const [data, total] = await Promise.all([
      Usuario.find(filter).select('-password').sort(sort).skip(skip).limit(limit),
      Usuario.countDocuments(filter)
    ]);
    return {
      data,
      pagination: {
        currentPage: Number(options.page) || 1,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    };
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