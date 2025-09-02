// src/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';

// Middleware para verificar JWT y cargar usuario
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o mal formado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).populate('role');

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

// Middleware para autorizar por roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: 'Acceso denegado: sin rol asignado' });
    }

    const userRole = req.user.role.name;

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: `Acceso denegado: se requiere rol ${roles.join(' o ')}` });
    }

    next();
  };
};