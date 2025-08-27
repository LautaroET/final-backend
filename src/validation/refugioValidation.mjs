import { body } from 'express-validator';

export const refugioValidationRules = () => [
    body('nombre')
        .notEmpty().withMessage('El nombre del refugio es obligatorio')
        .isLength({ min: 3, max: 100 }).withMessage('Debe tener entre 3 y 100 caracteres')
        .trim().escape(),

    body('direccion')
        .notEmpty().withMessage('La dirección es obligatoria')
        .isLength({ min: 5, max: 200 }).withMessage('Debe tener entre 5 y 200 caracteres')
        .trim().escape(),

    body('telefono')
        .optional()
        .isMobilePhone().withMessage('Número de teléfono inválido'),

    body('email')
        .optional()
        .isEmail().withMessage('Email inválido')
        .normalizeEmail(),

    body('capacidad')
        .optional()
        .isInt({ min: 1 }).withMessage('Debe ser un número entero positivo')
        .toInt()
];