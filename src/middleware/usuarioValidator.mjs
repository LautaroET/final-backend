import { body } from 'express-validator';

export const usuarioValidationRules = () => [
  body('username').notEmpty().trim().escape().withMessage('El nombre de usuario es obligatorio'),
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('role').optional().isIn(['admin', 'user']).withMessage('Rol inválido')
];