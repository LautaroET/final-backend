import imagenService from '../services/imagenService.mjs';
import upload from '../middlewares/upload.mjs';
import Mascota from '../models/Mascota.mjs';
import Refugio from '../models/Refugio.mjs';
import Usuario from '../models/Usuario.mjs';

export const subirImagenMascotaController = [
  upload.single('image'),
  async (req, res) => {
    try {
      const entidad = await imagenService.agregarImagenAEntidad(Mascota, req.params.id, `/uploads/${req.file.filename}`);
      res.json({ mensaje: 'Imagen agregada', images: entidad.images });
    } catch (err) {
      res.status(500).json({ mensaje: err.message });
    }
  }
];

export const subirImagenRefugioController = [
  upload.single('image'),
  async (req, res) => {
    try {
      const entidad = await imagenService.agregarImagenAEntidad(Refugio, req.params.id, `/uploads/${req.file.filename}`);
      res.json({ mensaje: 'Imagen actualizada', image: entidad.image });
    } catch (err) {
      res.status(500).json({ mensaje: err.message });
    }
  }
];

export const subirImagenUsuarioController = [
  upload.single('image'),
  async (req, res) => {
    try {
      const entidad = await imagenService.agregarImagenAEntidad(Usuario, req.params.id, `/uploads/${req.file.filename}`);
      res.json({ mensaje: 'Imagen actualizada', image: entidad.image });
    } catch (err) {
      res.status(500).json({ mensaje: err.message });
    }
  }
];