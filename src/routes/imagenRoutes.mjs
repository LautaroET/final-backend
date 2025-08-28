import express from 'express';
import upload from '../validation/upload.mjs';
import Mascota from '../models/Mascota.mjs';
import Refugio from '../models/Refugio.mjs';
import Usuario from '../models/Usuario.mjs';

const router = express.Router();

// Asignar imagen a mascota
router.post('/mascotas/:id/imagen', upload.single('image'), async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    if (!mascota) return res.status(404).json({ mensaje: 'Mascota no encontrada' });

    if (!req.file) return res.status(400).json({ mensaje: 'No se subió imagen' });

    const imageUrl = `/uploads/${req.file.filename}`;
    mascota.images.push(imageUrl);
    await mascota.save();

    res.json({ mensaje: 'Imagen agregada', images: mascota.images });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al agregar imagen', error: err.message });
  }
});

// Asignar imagen a refugio
router.post('/refugios/:id/imagen', upload.single('image'), async (req, res) => {
  try {
    const refugio = await Refugio.findById(req.params.id);
    if (!refugio) return res.status(404).json({ mensaje: 'Refugio no encontrado' });

    if (!req.file) return res.status(400).json({ mensaje: 'No se subió imagen' });

    const imagenUrl = `/uploads/${req.file.filename}`;
    refugio.imagen = imagenUrl;
    await refugio.save();

    res.json({ mensaje: 'imagen actualizado', imagen: refugio.imagen});
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar logo', error: err.message });
  }
});

// Asignar avatar a usuario
router.post('/usuarios/:id/avatar', upload.single('image'), async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    if (!req.file) return res.status(400).json({ mensaje: 'No se subió imagen' });

    const avatarUrl = `/uploads/${req.file.filename}`;
    usuario.avatar = avatarUrl;
    await usuario.save();

    res.json({ mensaje: 'Avatar actualizado', avatar: usuario.avatar });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar avatar', error: err.message });
  }
});

export default router;