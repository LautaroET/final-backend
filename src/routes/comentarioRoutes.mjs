import express from 'express';
import * as controller from '../controllers/comentarioController.mjs';

const router = express.Router();

router.post('/refugios/:refugioId/comentarios', controller.crearComentarioController);
router.get('/refugios/:refugioId/comentarios', controller.obtenerComentariosController);
router.delete('/comentarios/:id', controller.eliminarComentarioController);

export default router;