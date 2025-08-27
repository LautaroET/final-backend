import * as service from '../services/solicitudDarEnAdopcionService.mjs';

export const crearSolicitud = async (req, res) => {
  try {
    const nueva = await service.crearSolicitud(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear solicitud', error: err.message });
  }
};

export const listarPorRefugio = async (req, res) => {
  try {
    const solicitudes = await service.obtenerSolicitudesPorRefugio(req.params.refugioId);
    res.json(solicitudes);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener solicitudes', error: err.message });
  }
};

export const responderSolicitud = async (req, res) => {
  try {
    const { estado, respuesta } = req.body;
    const actualizada = await service.actualizarEstado(req.params.id, estado, respuesta);
    res.json(actualizada);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al responder', error: err.message });
  }
};