import express from 'express';
import {
  crearSolicitudAdopcion,
  listarSolicitudesAdopcionRefugio,
  listarSolicitudesAdopcionUsuario,
  cambiarEstadoSolicitudAdopcion,
  crearSolicitudDarEnAdopcion,
  listarSolicitudesDarEnAdopcionRefugio,
  listarSolicitudesDarEnAdopcionUsuario,
  cambiarEstadoSolicitudDarEnAdopcion
} from '../controllers/solicitudController.mjs';

import {
  crearSolicitudAdopcionValidator,
  crearSolicitudDarEnAdopcionValidator,
  cambiarEstadoValidator
} from '../middleware/solicitudValidator.mjs';

import { authenticate, authorize } from '../middleware/auth.js';
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

/* ---------- SOLICITUDES DE ADOPCIÓN ---------- */

// Usuario común crea solicitud de adopción
router.post(
  '/adopcion',
  authenticate,
  authorize('comun'),
  crearSolicitudAdopcionValidator,
  handleValidationErrors,
  crearSolicitudAdopcion
);

// Refugio lista sus solicitudes de adopción
router.get(
  '/adopcion/refugio',
  authenticate,
  authorize('refugio'),
  listarSolicitudesAdopcionRefugio
);

// Usuario lista sus solicitudes de adopción
router.get(
  '/adopcion/usuario',
  authenticate,
  authorize('comun'),
  listarSolicitudesAdopcionUsuario
);

// Refugio cambia estado de solicitud de adopción
router.patch(
  '/adopcion/:id',
  authenticate,
  authorize('refugio'),
  cambiarEstadoValidator,
  handleValidationErrors,
  cambiarEstadoSolicitudAdopcion
);

/* ---------- SOLICITUDES PARA DAR EN ADOPCIÓN ---------- */

// Usuario común crea solicitud para dar en adopción
router.post(
  '/dar-en-adopcion',
  authenticate,
  authorize('comun'),
  crearSolicitudDarEnAdopcionValidator,
  handleValidationErrors,
  crearSolicitudDarEnAdopcion
);

// Refugio lista sus solicitudes para recibir mascotas
router.get(
  '/dar-en-adopcion/refugio',
  authenticate,
  authorize('refugio'),
  listarSolicitudesDarEnAdopcionRefugio
);

// Usuario lista sus solicitudes enviadas para dar en adopción
router.get(
  '/dar-en-adopcion/usuario',
  authenticate,
  authorize('comun'),
  listarSolicitudesDarEnAdopcionUsuario
);

// Refugio cambia estado de solicitud para dar en adopción
router.patch(
  '/dar-en-adopcion/:id',
  authenticate,
  authorize('refugio'),
  cambiarEstadoValidator,
  handleValidationErrors,
  cambiarEstadoSolicitudDarEnAdopcion
);

export default router;