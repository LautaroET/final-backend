import { body } from 'express-validator';

export const solicitudValidationRules = () => [
  body('usuario').isMongoId().withMessage('ID de usuario inválido'),
  body('mascota').isMongoId().withMessage('ID de mascota inválida'),
  body('refugio').isMongoId().withMessage('ID de refugio inválido'),
  body('mensaje').optional().trim().escape(),
  body('estado').optional().isIn(['pendiente', 'aceptada', 'rechazada']).withMessage('Estado inválido'),
  body('respuesta').optional().trim().escape()
];