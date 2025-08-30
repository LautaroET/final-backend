import { body } from 'express-validator';

export const refugioValidationRules = () => [
  body('name').notEmpty().trim().escape().withMessage('El nombre es obligatorio'),
  body('address').notEmpty().trim().escape().withMessage('La dirección es obligatoria'),
  body('phone').notEmpty().trim().escape().withMessage('El teléfono es obligatorio'),
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('website').notEmpty().isURL().withMessage('Website debe ser una URL válida'),
  body('capacity').isInt({ min: 0 }).toInt().withMessage('Capacidad debe ser un entero positivo'),
  body('description').notEmpty().trim().escape().withMessage('La descripción es obligatoria'),
  body('adoptionProcess').notEmpty().trim().escape().withMessage('El proceso de adopción es obligatorio'),
];