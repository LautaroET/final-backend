import { body } from 'express-validator';

export const mascotaValidationRules = () => [
  body('name').notEmpty().trim().escape().withMessage('El nombre es obligatorio'),
  body('species').notEmpty().trim().escape().withMessage('La especie es obligatoria'),
  body('age').optional().isInt({ min: 0 }).withMessage('La edad debe ser un número positivo'),
  body('size').optional().isIn(['pequeño', 'mediano', 'grande']).withMessage('Tamaño inválido'),
  body('sex').optional().isIn(['macho', 'hembra']).withMessage('Sexo inválido'),
  body('description').optional().trim().escape(),
  body('isAdopted').optional().isBoolean().withMessage('Debe ser true o false'),
  body('refugio').isMongoId().withMessage('ID de refugio inválido')
];