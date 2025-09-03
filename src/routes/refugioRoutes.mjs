// src/routes/refugioRoutes.mjs
import express from 'express';
import {
  crearRefugio,
  eliminarRefugio,
  listarRefugios,
  miRefugio,
  obtenerRefugioPorId
} from '../controllers/refugioController.mjs';
import { authenticate, authorize } from '../middleware/auth.js';
import { isOwnerOfRefugio } from '../middleware/ownership.js';
import { crearRefugioValidator, actualizarRefugioValidator } from '../middleware/refugioValidator.mjs';
import { validationResult } from 'express-validator';

const router = express.Router();

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Públicas
router.get('/', listarRefugios);
router.get('/:id', obtenerRefugioPorId);

// Protegidas
router.post('/', authenticate, authorize('comun'), crearRefugioValidator, handleValidationErrors, crearRefugio);
router.delete('/', authenticate, authorize('refugio'), isOwnerOfRefugio, eliminarRefugio);
router.get('/yo', authenticate, authorize('refugio'), isOwnerOfRefugio, miRefugio);

export default router;
