// controllers/solicitudController.mjs
import * as solicitudService from '../services/solicitudService.mjs';

export async function obtenerSolicitudesController(req, res) {
  try {
    const solicitudes = await solicitudService.obtenerSolicitudes();
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener solicitudes', error: error.message });
  }
}

export async function crearSolicitudController(req, res) {
  try {
    const nueva = await solicitudService.crearSolicitud(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear solicitud', error: error.message });
  }
}

export async function obtenerSolicitudPorIdController(req, res) {
  try {
    const solicitud = await solicitudService.obtenerSolicitudPorId(req.params.id);
    if (!solicitud) return res.status(404).json({ mensaje: 'Solicitud no encontrada' });
    res.json(solicitud);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener solicitud', error: error.message });
  }
}

export async function actualizarSolicitudController(req, res) {
  try {
    const actualizada = await solicitudService.actualizarSolicitud(req.params.id, req.body);
    if (!actualizada) return res.status(404).json({ mensaje: 'Solicitud no encontrada' });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar solicitud', error: error.message });
  }
}

export async function eliminarSolicitudController(req, res) {
  try {
    const eliminada = await solicitudService.eliminarSolicitud(req.params.id);
    if (!eliminada) return res.status(404).json({ mensaje: 'Solicitud no encontrada' });
    res.json({ mensaje: 'Solicitud eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar solicitud', error: error.message });
  }
}

export async function obtenerSolicitudesPorRefugioController(req, res) {
  try {
    const solicitudes = await solicitudService.obtenerSolicitudesPorRefugio(req.params.refugioId);
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener solicitudes del refugio', error: error.message });
  }
}

export async function obtenerSolicitudesPorUsuarioController(req, res) {
  try {
    const solicitudes = await solicitudService.obtenerSolicitudesPorUsuario(req.params.usuarioId);
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener solicitudes del usuario', error: error.message });
  }
}