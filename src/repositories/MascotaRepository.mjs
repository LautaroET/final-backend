import IRepository from './IRepository.mjs';
import Mascota from '../models/Mascota.mjs';
import { buildQuery } from '../../utils/paginate.js';

class MascotaRepository extends IRepository {
    async obtenerTodos(filters = {}, options = {}) {
    const { skip, limit, sort, filter } = buildQuery(filters, options);
    const [data, total] = await Promise.all([
      Mascota.find(filter).sort(sort).skip(skip).limit(limit).populate('refugio', 'name address'),
      Mascota.countDocuments(filter)
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