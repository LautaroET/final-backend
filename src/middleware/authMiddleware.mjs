import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.mjs';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};

export const hasPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'No autenticado' });
      }

      const user = await Usuario.findById(req.user.id).populate({
        path: 'role',
        populate: { path: 'permissions' }
      });

      const permissions = user.role.permissions.map(p => p.name);
      if (!permissions.includes(requiredPermission) && !permissions.includes('manage_all')) {
        return res.status(403).json({ message: 'Permiso denegado' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Error al verificar permisos' });
    }
  };
};