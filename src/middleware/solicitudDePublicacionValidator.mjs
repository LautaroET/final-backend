import { body } from 'express-validator';

export const solicitudDePublicacionValidationRules = () => [
  body('usuario').isMongoId().withMessage('ID de usuario inválido'),
  body('refugio').isMongoId().withMessage('ID de refugio inválido'),
  body('mascota.name').notEmpty().trim().escape().withMessage('Nombre de mascota requerido'),
  body('mascota.species').notEmpty().trim().escape().withMessage('Especie requerida'),
  body('mascota.age').optional().isInt({ min: 0 }).withMessage('Edad debe ser un número positivo'),
  body('mascota.size').optional().isIn(['pequeño', 'mediano', 'grande']).withMessage('Tamaño inválido'),
  body('mascota.sex').optional().isIn(['macho', 'hembra']).withMessage('Sexo inválido'),
  body('mascota.description').optional().trim().escape(),
  body('estado').optional().isIn(['pendiente', 'aceptada', 'rechazada']).withMessage('Estado inválido'),
  body('respuesta').optional().trim().escape()
];