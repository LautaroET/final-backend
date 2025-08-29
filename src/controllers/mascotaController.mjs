import * as mascotaService from '../services/mascotaService.mjs';

export async function obtenerMascotasController(req, res) {
  try {
    const mascotas = await mascotaService.obtenerMascotas();
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener mascotas', error: error.message });
  }
}

export async function crearMascotaController(req, res) {
  try {
    const nueva = await mascotaService.crearMascota(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear mascota', error: error.message });
  }
}

export async function obtenerMascotaPorIdController(req, res) {
  try {
    const mascota = await mascotaService.obtenerMascotaPorId(req.params.id);
    if (!mascota) return res.status(404).json({ mensaje: 'Mascota no encontrada' });
    res.json(mascota);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener mascota', error: error.message });
  }
}

export async function actualizarMascotaController(req, res) {
  try {
    const actualizada = await mascotaService.actualizarMascota(req.params.id, req.body);
    if (!actualizada) return res.status(404).json({ mensaje: 'Mascota no encontrada' });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar mascota', error: error.message });
  }
}

export async function eliminarMascotaController(req, res) {
  try {
    const eliminada = await mascotaService.eliminarMascota(req.params.id);
    if (!eliminada) return res.status(404).json({ mensaje: 'Mascota no encontrada' });
    res.json({ mensaje: 'Mascota eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar mascota', error: error.message });
  }
}

export async function obtenerMascotasPorRefugioController(req, res) {
  try {
    const { refugioId } = req.params;
    const mascotas = await mascotaService.obtenerMascotasPorRefugio(refugioId);
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener mascotas del refugio', error: error.message });
  }
}