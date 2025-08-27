import * as mascotaService from '../services/mascotaService.mjs';

export const obtenerMascotasController = async (req, res) => {
  try {
    const filtros = {};

    if (req.query.breed) filtros.breed = new RegExp(req.query.breed, 'i');
    if (req.query.ubicacion) filtros['refugio.address'] = new RegExp(req.query.ubicacion, 'i');
    if (req.query.size) filtros.size = req.query.size;
    if (req.query.gender) filtros.gender = req.query.gender;
    if (req.query.status) filtros.status = req.query.status;
    if (req.query.ageMin) filtros.age = { ...filtros.age, $gte: Number(req.query.ageMin) };
    if (req.query.ageMax) filtros.age = { ...filtros.age, $lte: Number(req.query.ageMax) };

    const mascotas = await mascotaService.obtenerMascotasConFiltros(filtros);
    res.json(mascotas);
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
