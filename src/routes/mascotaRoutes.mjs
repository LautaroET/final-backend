import express from 'express';
import {
  listarMascotas,
  obtenerMascota,
  crearMascota,
  actualizarMascota,
  eliminarMascota
} from '../controllers/mascotaController.mjs';
import { authenticateToken, hasPermission } from '../middleware/authMiddleware.mjs';

const router = express.Router();

// públicas
router.get('/', listarMascotas);
router.get('/:id', obtenerMascota);
// protegidas
router.use(authenticateToken);
router.post('/', hasPermission('create:mascota'), crearMascota);
router.put('/:id', hasPermission('update:mascota'), actualizarMascota);
router.delete('/:id', hasPermission('delete:mascota'), eliminarMascota);

export default router;