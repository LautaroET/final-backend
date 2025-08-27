import express from 'express';
import {
    obtenerRefugiosController,
    crearRefugioController,
    obtenerRefugioPorIdController,
    actualizarRefugioController,
    eliminarRefugioController
} from '../controllers/refugioController.mjs';


const router = express.Router();

// Obtener todos los refugios
router.get('/refugios', obtenerRefugiosController);

// Crear nuevo refugio
router.post(
    '/refugios',
    crearRefugioController
);

// Obtener un refugio por ID
router.get('/refugios/:id', obtenerRefugioPorIdController);

// Actualizar refugio
router.put(
    '/refugios/:id',
    actualizarRefugioController
);

// Eliminar refugio
router.delete('/refugios/:id', eliminarRefugioController);

export default router;