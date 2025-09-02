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

router.post('/', crearMascota);
router.put('/:id',  actualizarMascota);
router.delete('/:id',eliminarMascota);

export default router;