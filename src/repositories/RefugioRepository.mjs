import IRepository from './IRepository.mjs';
import Refugio from '../models/Refugio.mjs';
import { buildQuery } from '../../utils/paginate.js';

class RefugioRepository extends IRepository {
    async obtenerTodos(filters = {}, options = {}) {
    const { skip, limit, sort, filter } = buildQuery(filters, options);
    const [data, total] = await Promise.all([
        Refugio.find(filter).sort(sort).skip(skip).limit(limit),
        Refugio.countDocuments(filter)
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