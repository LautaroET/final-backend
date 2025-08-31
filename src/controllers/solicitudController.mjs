// controllers/solicitudController.mjs
import * as solicitudService from '../services/solicitudService.mjs';
import Mascota from '../models/Mascota.mjs';
import Refugio from '../models/Refugio.mjs';

export const obtenerSolicitudesController = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', estado } = req.query;
    const filters = {};
    if (estado) filters.estado = estado;
    const results = await solicitudService.obtenerSolicitudes(filters, { page, limit, sortBy, sortOrder });
    res.json(results);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener solicitudes', error: error.message });
  }
};

export const crearSolicitudController = async (req, res) => {
  try {
    // 1. Usuario-refugio no puede enviar solicitudes
    const refugio = await Refugio.findOne({ usuarioId: req.user.id });
    if (refugio) {
      return res.status(403).json({ mensaje: 'Los refugios no pueden enviar solicitudes de adopción' });
    }

    const nueva = await solicitudService.crearSolicitud(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear solicitud', error: error.message });
  }
};

export const obtenerSolicitudPorIdController = async (req, res) => {
  try {
    const solicitud = await solicitudService.obtenerSolicitudPorId(req.params.id);
    if (!solicitud) return res.status(404).json({ mensaje: 'Solicitud no encontrada' });
    res.json(solicitud);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener solicitud', error: error.message });
  }
};

export const actualizarSolicitudController = async (req, res) => {
  try {
    const actualizada = await solicitudService.actualizarSolicitud(req.params.id, req.body);
    if (!actualizada) return res.status(404).json({ mensaje: 'Solicitud no encontrada' });

    // 2. Si se acepta la solicitud marcar la mascota como adoptada
    if (req.body.estado === 'aceptada') {
      await Mascota.findByIdAndUpdate(actualizada.mascota, { isAdopted: true });
    }

    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar solicitud', error: error.message });
  }
};

export const eliminarSolicitudController = async (req, res) => {
  try {
    const eliminada = await solicitudService.eliminarSolicitud(req.params.id);
    if (!eliminada) return res.status(404).json({ mensaje: 'Solicitud no encontrada' });
    res.json({ mensaje: 'Solicitud eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar solicitud', error: error.message });
  }
};

export const obtenerSolicitudesPorRefugioController = async (req, res) => {
  try {
    const solicitudes = await solicitudService.obtenerSolicitudesPorRefugio(req.params.refugioId);
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener solicitudes del refugio', error: error.message });
  }
};

export const obtenerSolicitudesPorUsuarioController = async (req, res) => {
  try {
    const solicitudes = await solicitudService.obtenerSolicitudesPorUsuario(req.params.usuarioId);
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener solicitudes del usuario', error: error.message });
  }
};