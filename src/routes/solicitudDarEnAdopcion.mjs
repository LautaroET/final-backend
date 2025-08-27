import express from 'express';
import * as controller from '../controllers/solicitudDarEnAdopcionController.mjs';

const router = express.Router();

router.post('/solicitudes-dar-en-adopcion', controller.crearSolicitud);
router.get('/refugios/:refugioId/solicitudes-dar-en-adopcion', controller.listarPorRefugio);
router.put('/solicitudes-dar-en-adopcion/:id/responder', controller.responderSolicitud);

export default router;