// src/middleware/ownership.js
import Mascota from '../models/Mascota.mjs';
import Refugio from '../models/Refugio.mjs';

// Middleware para verificar que la mascota pertenece al refugio del usuario
export const isOwnerOfMascota = async (req, res, next) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    if (!mascota) return res.status(404).json({ message: 'Mascota no encontrada' });

    const refugio = await Refugio.findOne({ usuario: req.user.id });
    if (!refugio) return res.status(403).json({ message: 'No tienes un refugio asociado' });

    if (mascota.refugio.toString() !== refugio._id.toString()) {
      return res.status(403).json({ message: 'No autorizado para modificar esta mascota' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Error al verificar propiedad' });
  }
};

// Middleware para verificar que el refugio pertenece al usuario
export const isOwnerOfRefugio = async (req, res, next) => {
  try {
    const refugio = await Refugio.findOne({ usuario: req.user.id });
    if (!refugio) return res.status(404).json({ message: 'Refugio no encontrado' });

    // Si llegó acá, el refugio es del usuario
    next();
  } catch (err) {
    res.status(500).json({ message: 'Error al verificar propiedad' });
  }
};