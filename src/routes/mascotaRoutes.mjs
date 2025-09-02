// src/routes/mascotaRoutes.mjs
import express from 'express';
import {
  listarMascotas,
  obtenerMascota,
  crearMascota,
  actualizarMascota,
  eliminarMascota
} from '../controllers/mascotaController.mjs';
import { authenticate, authorize } from '../middleware/auth.js';
import { isOwnerOfMascota } from '../middleware/ownership.js';
import { crearMascotaValidator, actualizarMascotaValidator } from '../middleware/mascotaValidator.mjs';
import { validationResult } from 'express-validator';

const router = express.Router();

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Públicas
router.get('/', listarMascotas);
router.get('/:id', obtenerMascota);

// Protegidas
router.post('/', authenticate, authorize('refugio'), crearMascotaValidator, handleValidationErrors, crearMascota);
router.put('/:id', authenticate, authorize('refugio'), isOwnerOfMascota, actualizarMascotaValidator, handleValidationErrors, actualizarMascota);
router.delete('/:id', authenticate, authorize('refugio'), isOwnerOfMascota, eliminarMascota);

export default router;