import express from 'express';
import upload from '../validation/upload.mjs';
import path from 'path';

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

export default router;