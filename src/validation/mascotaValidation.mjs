import { body } from 'express-validator';

export const mascotaValidationRules = () => [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 50 }).withMessage('Debe tener entre 2 y 50 caracteres')
    .trim().escape(),

  body('especie')
    .isIn(['perro', 'gato', 'otro']).withMessage('La especie debe ser perro, gato u otro'),

  body('edad')
    .optional()
    .isInt({ min: 0 }).withMessage('La edad debe ser un número entero positivo')
    .toInt(),

  body('refugio')
    .isMongoId().withMessage('El refugio debe ser un ID válido'),

  body('imagen').optional().isURL().withMessage('La imagen debe ser una URL válida'),

  body('descripcion')
    .optional()
    .isLength({ max: 500 }).withMessage('Máximo 500 caracteres')
    .trim().escape()
];