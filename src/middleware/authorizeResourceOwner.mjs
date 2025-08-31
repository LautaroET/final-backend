// src/middleware/authorizeResourceOwner.mjs
import Refugio from '../models/Refugio.mjs';
import Mascota from '../models/Mascota.mjs';

export const authorizeRefugioOwner = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    let refugioId;

    if (req.originalUrl.includes('mascota')) {
      const mascota = await Mascota.findById(id);
      if (!mascota) return res.status(404).json({ message: 'Mascota no encontrada' });
      refugioId = mascota.refugio.toString();
    } else {
      refugioId = id;
    }

    const refugio = await Refugio.findById(refugioId);
    if (!refugio) return res.status(404).json({ message: 'Refugio no encontrado' });

    if (refugio.usuarioId.toString() !== userId) {
      return res.status(403).json({ message: 'No autorizado para este recurso' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error en autorización', error: error.message });
  }
};