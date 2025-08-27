import { body } from 'express-validator';

export const usuarioValidationRules = () => [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 50 }).withMessage('Debe tener entre 2 y 50 caracteres')
        .trim().escape(),

    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un email válido')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('Mínimo 6 caracteres'),

    body('rol')
        .optional()
        .isIn(['adoptante', 'admin', 'refugio']).withMessage('Rol inválido'),

    body('telefono')
        .optional()
        .isMobilePhone().withMessage('Número de teléfono inválido')
];