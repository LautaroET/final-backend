import express from 'express';
import {
  obtenerMascotasController,
  crearMascotaController,
  obtenerMascotaPorIdController,
  actualizarMascotaController,
  eliminarMascotaController,
  obtenerMascotasPorRefugioController
} from '../controllers/mascotaController.mjs';

const router = express.Router();

router.get('/mascotas', obtenerMascotasController);
router.post('/mascotas', crearMascotaController);
router.get('/mascotas/:id', obtenerMascotaPorIdController);
router.put('/mascotas/:id',  actualizarMascotaController);
router.delete('/mascotas/:id', eliminarMascotaController);
router.get('/refugios/:refugioId/mascotas', obtenerMascotasPorRefugioController);

export default router;