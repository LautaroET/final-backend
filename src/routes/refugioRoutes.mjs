import { body } from 'express-validator';
import express from 'express';
import {
    obtenerRefugiosController,
    crearRefugioController,
    obtenerRefugioPorIdController,
    actualizarRefugioController,
    eliminarRefugioController
} from '../controllers/refugioController.mjs';
import { refugioValidationRules } from '../middleware/refugioValidation.mjs'; 
import { handleValidationErrors } from '../middleware/errorMiddleware.mjs';

const router = express.Router();

router.get('/refugios', obtenerRefugiosController);

router.post(
    '/refugios',
    refugioValidationRules(), 
    handleValidationErrors, 
    crearRefugioController
);

router.get('/refugios/:id', obtenerRefugioPorIdController);

router.put(
    '/refugios/:id',
    refugioValidationRules(), 
    handleValidationErrors,   
    actualizarRefugioController
);

router.delete('/refugios/:id', eliminarRefugioController);

export default router;