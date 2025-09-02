// src/controllers/roleController.mjs
import Role from '../models/Role.mjs';
import Permission from '../models/Permission.mjs';

// GET /api/roles - Listar todos los roles con sus permisos (público)
export const listarRoles = async (_req, res) => {
  try {
    const roles = await Role.find().populate('permissions');
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener roles' });
  }
};

// GET /api/permissions - Listar todos los permisos (público)
export const listarPermisos = async (_req, res) => {
  try {
    const permisos = await Permission.find();
    res.json(permisos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener permisos' });
  }
};