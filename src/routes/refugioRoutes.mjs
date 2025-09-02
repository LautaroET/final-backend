import express from 'express';
import {
    crearRefugio,
    eliminarRefugio,
    listarRefugios,
    miRefugio
} from '../controllers/refugioController.mjs';
import { authenticateToken, hasPermission } from '../middleware/authMiddleware.mjs';

const router = express.Router();

// públicas
router.get('/', listarRefugios);
// protegidas
router.post('/', crearRefugio);
router.delete('/', eliminarRefugio);
router.get('/:id',  miRefugio);

export default router;