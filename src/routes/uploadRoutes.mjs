import express from 'express';
import upload from '../validation/upload.mjs';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.post('/upload', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err.message);
      return res.status(400).json({ mensaje: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ mensaje: 'No se subió ningún archivo' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(201).json({ mensaje: 'Imagen subida', url: imageUrl });
  });
});

router.delete('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(process.cwd(), 'uploads', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ mensaje: 'Imagen no encontrada' });
  }

  try {
    fs.unlinkSync(filePath);
    res.json({ mensaje: 'Imagen eliminada' });
  } catch (err) {
    console.error('❌ Error al eliminar:', err.message);
    res.status(500).json({ mensaje: 'Error al eliminar imagen' });
  }
});

export default router;