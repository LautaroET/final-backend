import SolicitudService from '../services/solicitudService.mjs';

/* ---------- SOLICITUDES DE ADOPCIÓN ---------- */

export const crearSolicitudAdopcion = async (req, res) => {
  try {
    const { mascotaId, mensaje } = req.body;
    const usuarioId = req.user.id;

    const solicitud = await SolicitudService.crearSolicitudAdopcion({
      usuarioId,
      mascotaId,
      mensaje
    });

    res.status(201).json(solicitud);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const listarSolicitudesAdopcionRefugio = async (req, res) => {
  try {
    const refugio = await RefugioRepository.findByUsuario(req.user.id);
    if (!refugio) return res.status(403).json({ message: 'No tienes un refugio' });

    const solicitudes = await SolicitudService.listarSolicitudesAdopcionPorRefugio(refugio._id);
    res.json(solicitudes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listarSolicitudesAdopcionUsuario = async (req, res) => {
  try {
    const solicitudes = await SolicitudService.listarSolicitudesAdopcionPorUsuario(req.user.id);
    res.json(solicitudes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const cambiarEstadoSolicitudAdopcion = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const refugio = await RefugioRepository.findByUsuario(req.user.id);
    if (!refugio) return res.status(403).json({ message: 'No tienes un refugio' });

    const updated = await SolicitudService.cambiarEstadoSolicitudAdopcion(id, estado, refugio._id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ---------- SOLICITUDES PARA DAR EN ADOPCIÓN ---------- */

export const crearSolicitudDarEnAdopcion = async (req, res) => {
  try {
    const { refugioId, datosMascota, mensaje } = req.body;
    const usuarioId = req.user.id;

    const solicitud = await SolicitudService.crearSolicitudDarEnAdopcion({
      usuarioId,
      refugioId,
      datosMascota,
      mensaje
    });

    res.status(201).json(solicitud);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const listarSolicitudesDarEnAdopcionRefugio = async (req, res) => {
  try {
    const refugio = await RefugioRepository.findByUsuario(req.user.id);
    if (!refugio) return res.status(403).json({ message: 'No tienes un refugio' });

    const solicitudes = await SolicitudService.listarSolicitudesDarEnAdopcionPorRefugio(refugio._id);
    res.json(solicitudes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listarSolicitudesDarEnAdopcionUsuario = async (req, res) => {
  try {
    const solicitudes = await SolicitudService.listarSolicitudesDarEnAdopcionPorUsuario(req.user.id);
    res.json(solicitudes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const cambiarEstadoSolicitudDarEnAdopcion = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const refugio = await RefugioRepository.findByUsuario(req.user.id);
    if (!refugio) return res.status(403).json({ message: 'No tienes un refugio' });

    const updated = await SolicitudService.cambiarEstadoSolicitudDarEnAdopcion(id, estado, refugio._id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};