import express from 'express';
import {
  crearSolicitud,
  listarPorRefugio,
  responderSolicitud
} from '../controllers/solicitudAdopcionController.mjs';

const router = express.Router();

router.post('/solicitudes-adopcion', crearSolicitud);
router.get('/refugios/:refugioId/solicitudes-adopcion', listarPorRefugio);
router.put('/solicitudes-adopcion/:id/responder', responderSolicitud);

export default router;