import refugioService from '../services/refugioService.mjs';

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