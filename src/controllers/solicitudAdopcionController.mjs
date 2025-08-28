import * as service from '../services/solicitudAdopcionService.mjs';
import { enviarEmail } from '../services/emailService.mjs';
import Refugio from '../models/Refugio.mjs';

export const crearSolicitud = async (req, res) => {
  try {
    const nueva = await service.crearSolicitud(req.body);
    const nuevaService = await solicitudService.crearSolicitud(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear solicitud', error: err.message });
  }
};

export const listarPorRefugio = async (req, res) => {
  try {
    const solicitudes = await service.obtenerSolicitudesPorRefugio(req.params.refugioId);
    res.json(solicitudes.filter(s => s.mascota)); // solo las que tienen mascota del refugio
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener solicitudes', error: err.message });
  }
};

export const responderSolicitud = async (req, res) => {
  try {
    const { estado, respuesta } = req.body;
    const actualizada = await service.actualizarEstado(req.params.id, estado, respuesta);
    const usuario = await Usuario.findById(solicitud.usuario);
    if (usuario?.email) {
      await enviarEmail({
        to: usuario.email,
        subject: 'Respuesta a tu solicitud de adopción',
        text: `Hola ${usuario.nombre}, el refugio respondió sobre tu solicitud: ${respuesta}`
      });
}

const refugio = await Refugio.findById(mascota.refugio);
if (refugio?.email) {
  await enviarEmail({
    to: refugio.email,
    subject: 'Nueva solicitud de adopción',
    text: `Hola ${refugio.name}, tienes una nueva solicitud para ${mascota.name}. Revisá tu panel.`
  });
}