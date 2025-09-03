import refugioService from '../services/refugioService.mjs';
import mongoose from 'mongoose';

export const crearRefugio = async (req, res) => {
  try {
    const refugio = await refugioService.crearRefugio(req.body, req.user.id);
    res.status(201).json(refugio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const eliminarRefugio = async (req, res) => {
  try {
    const result = await refugioService.eliminarRefugio(req.user.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const listarRefugios = async (_req, res) => {
  try {
    const refugios = await refugioService.listarRefugios();
    res.json(refugios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const miRefugio = async (req, res) => {
  try {
    const refugio = await refugioService.obtenerRefugioPorUsuario(req.user.id);
    if (!refugio) return res.status(404).json({ message: 'No tienes refugio' });
    res.json(refugio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const obtenerRefugioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validación más robusta del ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de refugio inválido' });
    }

    const refugio = await Refugio.findById(id)
      .populate('usuario', 'username email')
      .select('-__v');

    if (!refugio) {
      return res.status(404).json({ message: 'Refugio no encontrado' });
    }

    res.status(200).json(refugio);
  } catch (error) {
    console.error('Error detallado al obtener refugio:', error);
    res.status(500).json({ 
      message: 'Error al obtener el refugio',
      error: error.message 
    });
  }
};
