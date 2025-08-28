import * as solicitudService from '../services/solicitudDarEnAdopcionService.mjs';
import { enviarEmail } from '../services/emailService.mjs';
import Refugio from '../models/Refugio.mjs';

export const crearSolicitud = async (req, res) => {
  try {
    const nueva = await solicitudService.crearSolicitud(req.body);
    const refugio = await Refugio.findById(nueva.refugio);

    if (refugio?.email) {
      await enviarEmail({
        to: refugio.email,
        subject: 'Nueva solicitud para publicar mascota',
        text: `Hola ${refugio.name},\n\n${nueva.usuario.nombre} quiere dar en adopción a ${nueva.mascota.name}.\n\nDescripción: ${nueva.mascota.description}\n\nRevisá tu panel para aprobarla.`
      });
    }

    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear solicitud', error: err.message });
  }
};

export const listarPorRefugio = async (req, res) => {
  try {
    const solicitudes = await solicitudService.obtenerSolicitudesPorRefugio(req.params.refugioId);
    res.json(solicitudes);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener solicitudes', error: err.message });
  }
};

export const responderSolicitud = async (req, res) => {
  try {
    const { estado, respuesta } = req.body;
    const actualizada = await solicitudService.actualizarEstado(req.params.id, estado, respuesta);
    if (!actualizada) return res.status(404).json({ mensaje: 'Solicitud no encontrada' });

    const usuario = await import('../models/Usuario.mjs').then(m => m.default).then(Usuario => Usuario.findById(actualizada.usuario));
    if (usuario?.email) {
      await enviarEmail({
        to: usuario.email,
        subject: 'Respuesta a tu solicitud para dar en adopción',
        text: `Hola ${usuario.nombre},\n\nEl refugio respondió tu solicitud:\n\nEstado: ${estado}\nRespuesta: ${respuesta}`
      });
    }

    res.json(actualizada);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al responder', error: err.message });
  }
};