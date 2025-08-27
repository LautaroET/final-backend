import express from 'express';
import {
    obtenerRefugiosController,
    crearRefugioController,
    obtenerRefugioPorIdController,
    actualizarRefugioController,
    eliminarRefugioController
} from '../controllers/refugioController.mjs';
import { refugioValidationRules } from '../validation/refugioValidation.mjs';
import { handleValidationErrors } from '../validation/errorMiddleware.mjs';

const router = express.Router();

// Obtener todos los refugios
router.get('/refugios', obtenerRefugiosController);

// Crear nuevo refugio
router.post(
    '/refugios',
    refugioValidationRules(),
    handleValidationErrors,
    crearRefugioController
);

// Obtener un refugio por ID
router.get('/refugios/:id', obtenerRefugioPorIdController);

// Actualizar refugio
router.put(
    '/refugios/:id',
    refugioValidationRules(),
    handleValidationErrors,
    actualizarRefugioController
);

// Eliminar refugio
router.delete('/refugios/:id', eliminarRefugioController);

export default router;