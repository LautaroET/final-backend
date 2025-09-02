// src/validators/authValidator.mjs
import { body } from 'express-validator';

// Validar registro
export const registerValidator = [
  body('username')
    .notEmpty()
    .withMessage('El nombre de usuario es obligatorio')
    .isLength({ min: 3, max: 30 })
    .withMessage('El usuario debe tener entre 3 y 30 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('El usuario solo puede contener letras, números y guiones bajos'),
  body('email')
    .notEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('El email no es válido')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener al menos un número'),
];

// Validar login
export const loginValidator = [
  body('email')
    .notEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('El email no es válido')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria'),
];