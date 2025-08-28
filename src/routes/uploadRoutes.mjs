import express from 'express';
import upload from '../middlewares/upload.mjs';

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensaje: 'No se subió ninguna imagen' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ mensaje: 'Imagen subida', url: imageUrl });
});

export default router;