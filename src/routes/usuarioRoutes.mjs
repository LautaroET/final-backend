import express from 'express';
import {
    obtenerUsuariosController,
    crearUsuarioController,
    obtenerUsuarioPorIdController,
    actualizarUsuarioController,
    eliminarUsuarioController
} from '../controllers/usuarioController.mjs';
import { usuarioValidationRules } from '../validation/usuarioValidation.mjs';
import { handleValidationErrors } from '../validation/errorMiddleware.mjs';

const router = express.Router();

// Obtener todos los usuarios
router.get('/usuarios', obtenerUsuariosController);

// Crear nuevo usuario
router.post(
    '/usuarios',
    usuarioValidationRules(),
    handleValidationErrors,
    crearUsuarioController
);

// Obtener un usuario por ID
router.get('/usuarios/:id', obtenerUsuarioPorIdController);

// Actualizar usuario
router.put(
    '/usuarios/:id',
    usuarioValidationRules(),
    handleValidationErrors,
    actualizarUsuarioController
);

// Eliminar usuario
router.delete('/usuarios/:id', eliminarUsuarioController);

export default router;