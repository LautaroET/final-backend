import { body } from 'express-validator';

export const refugioValidationRules = () => [
  body('name')
    .notEmpty().withMessage('El nombre del refugio es obligatorio')
    .isLength({ min: 3, max: 100 }).withMessage('Debe tener entre 3 y 100 caracteres')
    .trim().escape(),

  body('address')
    .notEmpty().withMessage('La dirección es obligatoria')
    .isLength({ min: 5, max: 200 }).withMessage('Debe tener entre 5 y 200 caracteres')
    .trim().escape(),

  body('phone')
    .notEmpty().withMessage('El teléfono es obligatorio')
    .matches(/^[0-9]+$/).withMessage('El teléfono solo debe contener números')
    .isLength({ min: 7 }).withMessage('El teléfono debe tener al menos 7 dígitos'),

  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un correo electrónico válido')
    .normalizeEmail(),

  body('website')
    .notEmpty().withMessage('El sitio web es obligatorio')
    .isURL().withMessage('Debe ser una URL válida'),

  body('capacity')
    .notEmpty().withMessage('La capacidad es obligatoria')
    .isInt({ min: 1 }).withMessage('Debe ser un número entero positivo')
    .toInt(),

  body('image')
    .notEmpty().withMessage('La URL de la imagen es obligatoria')
    .isURL().withMessage('Debe ser una URL de imagen válida'),

  body('description')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ min: 5 }).withMessage('Debe tener al menos 5 caracteres')
    .trim().escape(),

  body('adoptionProcess')
    .notEmpty().withMessage('El proceso de adopción es obligatorio')
    .isLength({ min: 5 }).withMessage('Debe tener al menos 5 caracteres')
    .trim().escape()
];