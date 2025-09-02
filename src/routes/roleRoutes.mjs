// src/routes/roleRoutes.mjs
import express from 'express';
import { listarRoles, listarPermisos } from '../controllers/roleController.mjs';

const router = express.Router();

// Públicos
router.get('/roles', listarRoles);
router.get('/permissions', listarPermisos);

export default router;