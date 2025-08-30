import express from 'express';
import {
  obtenerUsuariosController,
  crearUsuarioController,
  obtenerUsuarioPorIdController,
  actualizarUsuarioController,
  eliminarUsuarioController
} from '../controllers/usuarioController.mjs';
import { usuarioValidationRules } from '../middleware/usuarioValidator.mjs';
import { handleValidationErrors } from '../middleware/validationMiddleware.mjs';

const router = express.Router();

router.get('/usuarios', obtenerUsuariosController);
router.post(
  '/usuarios',
  usuarioValidationRules(),
  handleValidationErrors,
  crearUsuarioController
);
router.get('/usuarios/:id', obtenerUsuarioPorIdController);
router.put(
  '/usuarios/:id',
  usuarioValidationRules(),
  handleValidationErrors,
  actualizarUsuarioController
);
router.delete('/usuarios/:id', eliminarUsuarioController);

export default router;