// src/validators/refugioValidator.mjs
import { body } from 'express-validator';

// Validar al crear un refugio
export const crearRefugioValidator = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres'),
  body('direccion')
    .notEmpty()
    .withMessage('La dirección es obligatoria')
    .isLength({ min: 5, max: 200 })
    .withMessage('La dirección debe tener entre 5 y 200 caracteres'),
  body('telefono')
    .notEmpty()
    .withMessage('El teléfono es obligatorio')
    .matches(/^[0-9\s\-\+]{7,15}$/)
    .withMessage('El teléfono no es válido'),
  body('email')
    .notEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('El email no es válido'),
  body('descripcion')
    .optional()
    .isLength({ max: 500 })
    .withMessage('La descripción no debe superar los 500 caracteres')
];

// Validar al actualizar un refugio
export const actualizarRefugioValidator = [
  body('nombre')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres'),
  body('direccion')
    .optional()
    .isLength({ min: 5, max: 200 })
    .withMessage('La dirección debe tener entre 5 y 200 caracteres'),
  body('telefono')
    .optional()
    .matches(/^[0-9\s\-\+]{7,15}$/)
    .withMessage('El teléfono no es válido'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('El email no es válido'),
  body('descripcion')
    .optional()
    .isLength({ max: 500 })
    .withMessage('La descripción no debe superar los 500 caracteres')
];