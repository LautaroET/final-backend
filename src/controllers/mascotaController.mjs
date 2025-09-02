import mascotaService from '../services/mascotaService.mjs';

export const listarMascotas = async (req, res) => {
  try {
    const refugioId = req.query.refugio;
    const mascotas = await mascotaService.listarMascotas(refugioId);
    res.json(mascotas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const obtenerMascota = async (req, res) => {
  try {
    const mascota = await mascotaService.obtenerMascota(req.params.id);
    res.json(mascota);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const crearMascota = async (req, res) => {
  try {
    const mascota = await mascotaService.crearMascota(req.body, req.user.id);
    res.status(201).json(mascota);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const actualizarMascota = async (req, res) => {
  try {
    const mascota = await mascotaService.actualizarMascota(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json(mascota);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

export const eliminarMascota = async (req, res) => {
  try {
    await mascotaService.eliminarMascota(req.params.id, req.user.id);
    res.json({ message: 'Mascota eliminada' });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};