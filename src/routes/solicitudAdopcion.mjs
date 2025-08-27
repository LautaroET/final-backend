import express from 'express';
import * as controller from '../controllers/solicitudAdopcionController.mjs';

const router = express.Router();

router.post('/solicitudes-adopcion', controller.crearSolicitud);
router.get('/refugios/:refugioId/solicitudes-adopcion', controller.listarPorRefugio);
router.put('/solicitudes-adopcion/:id/responder', controller.responderSolicitud);

export default router;