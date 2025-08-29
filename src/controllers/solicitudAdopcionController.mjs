import * as solicitudService from '../services/solicitudAdopcionService.mjs';
import { enviarEmail } from '../services/emailService.mjs';
import Refugio from '../models/Refugio.mjs';
import Mascota from '../models/Mascota.mjs';

// Crear nueva solicitud de adopción
export const crearSolicitud = async (req, res) => {
  try {
    const nueva = await solicitudService.crearSolicitud(req.body);
    const mascota = await Mascota.findById(nueva.mascota).populate('refugio');

    if (!mascota || !mascota.refugio) {
      return res.status(404).json({ mensaje: 'Mascota o refugio no encontrado' });
    }

    const refugio = mascota.refugio;

    if (refugio?.email) {
      await enviarEmail({
        to: refugio.email,
        subject: 'Nueva solicitud de adopción',
        text: `Hola ${refugio.name},\n\n${nueva.usuario.nombre} quiere adoptar a ${mascota.name}.\n\nMensaje: ${nueva.mensaje}\n\nRevisá tu panel para más detalles.`
      });
    }

    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear solicitud', error: err.message });
  }
};

// Listar solicitudes por refugio
export const listarPorRefugio = async (req, res) => {
  try {
    const solicitudes = await solicitudService.obtenerSolicitudesPorRefugio(req.params.refugioId);
    res.json(solicitudes.filter(s => s.mascota));
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener solicitudes', error: err.message });
  }
};

// Responder una solicitud
export const responderSolicitud = async (req, res) => {
  try {
    const { estado, respuesta } = req.body;
    const actualizada = await solicitudService.actualizarEstado(req.params.id, estado, respuesta);
    if (!actualizada) return res.status(404).json({ mensaje: 'Solicitud no encontrada' });

    const Usuario = (await import('../models/Usuario.mjs')).default;
    const usuario = await Usuario.findById(actualizada.usuario);

    if (usuario?.email) {
      await enviarEmail({
        to: usuario.email,
        subject: 'Respuesta a tu solicitud de adopción',
        text: `Hola ${usuario.nombre},\n\nEl refugio respondió tu solicitud:\n\nEstado: ${estado}\nRespuesta: ${respuesta}`
      });
    }

    res.json(actualizada);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al responder', error: err.message });
  }
};