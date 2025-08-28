import * as mascotaService from '../services/mascotaService.mjs';

export const obtenerMascotasController = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'asc',
      ...filters
    } = req.query;

    const query = {};

    // Filtros simples
    if (filters.breed) query.breed = new RegExp(filters.breed, 'i');
    if (filters.size) query.size = filters.size;
    if (filters.gender) query.gender = filters.gender;
    if (filters.status) query.status = filters.status;
    if (filters.ageMin || filters.ageMax) {
      query.age = {};
      if (filters.ageMin) query.age.$gte = Number(filters.ageMin);
      if (filters.ageMax) query.age.$lte = Number(filters.ageMax);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const mascotas = await mascotaService.obtenerMascotasPaginados(query, skip, Number(limit), sort, order);
    const total = await mascotaService.contarMascotas(query);

    res.json({
      data: mascotas,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener mascotas', error: err.message });
  }
};

export const crearMascotaController = async (req, res) => {
  try {
    const nueva = await mascotaService.crearMascota(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear mascota', error: err.message });
  }
};

export const obtenerMascotaPorIdController = async (req, res) => {
  try {
    const mascota = await mascotaService.obtenerMascotaPorId(req.params.id);
    if (!mascota) return res.status(404).json({ mensaje: 'Mascota no encontrada' });
    res.json(mascota);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener mascota', error: err.message });
  }
};

export const actualizarMascotaController = async (req, res) => {
  try {
    const actualizada = await mascotaService.actualizarMascota(req.params.id, req.body);
    if (!actualizada) return res.status(404).json({ mensaje: 'Mascota no encontrada' });
    res.json(actualizada);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar mascota', error: err.message });
  }
};

export const eliminarMascotaController = async (req, res) => {
  try {
    const eliminada = await mascotaService.eliminarMascota(req.params.id);
    if (!eliminada) return res.status(404).json({ mensaje: 'Mascota no encontrada' });
    res.json({ mensaje: 'Mascota eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar mascota', error: err.message });
  }
};

/* extra: listar mascotas de un refugio */
export const obtenerMascotasPorRefugioController = async (req, res) => {
  try {
    const mascotas = await mascotaService.obtenerMascotasPorRefugio(req.params.refugioId);
    res.json(mascotas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener mascotas del refugio', error: err.message });
  }
};
