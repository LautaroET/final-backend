import express from 'express';
import {
    obtenerUsuariosController,
    crearUsuarioController,
    obtenerUsuarioPorIdController,
    actualizarUsuarioController,
    eliminarUsuarioController
} from '../controllers/usuarioController.mjs';
import { handleValidationErrors } from '../middlewares/validations.mjs';

const router = express.Router();

// Obtener todos los usuarios
router.get('/usuarios', obtenerUsuariosController);

// Crear nuevo usuario
router.post(
    '/usuarios',
    handleValidationErrors,
    crearUsuarioController
);

// Obtener un usuario por ID
router.get('/usuarios/:id', obtenerUsuarioPorIdController);

// Actualizar usuario
router.put(
    '/usuarios/:id',
    handleValidationErrors,
    actualizarUsuarioController
);

// Eliminar usuario
router.delete('/usuarios/:id', eliminarUsuarioController);

export default router;