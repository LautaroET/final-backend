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
router.post('/', authenticateToken,hasPermission, crearRefugio);
router.delete('/', authenticateToken, hasPermission('delete:refugio'), eliminarRefugio);
router.get('/yo', authenticateToken, miRefugio);

export default router;