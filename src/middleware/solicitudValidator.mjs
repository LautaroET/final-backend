import { body } from 'express-validator';

// Validar al crear solicitud de adopción
export const crearSolicitudAdopcionValidator = [
  body('mascotaId')
    .isMongoId().withMessage('ID de mascota inválido'),
  body('mensaje')
    .optional()
    .isLength({ max: 500 }).withMessage('El mensaje no debe superar los 500 caracteres')
];

// Validar al cambiar estado de solicitud (ambos tipos)
export const cambiarEstadoValidator = [
  body('estado')
    .isIn(['aceptada', 'rechazada'])
    .withMessage('El estado debe ser "aceptada" o "rechazada"')
];

// Validar al crear solicitud para dar en adopción
export const crearSolicitudDarEnAdopcionValidator = [
  body('refugioId')
    .isMongoId().withMessage('ID de refugio inválido'),
  body('datosMascota.nombre')
    .notEmpty().withMessage('El nombre de la mascota es obligatorio')
    .isLength({ min: 2, max: 50 }).withMessage('Entre 2 y 50 caracteres'),
  body('datosMascota.especie')
    .isIn(['perro', 'gato', 'conejo', 'ave', 'otro'])
    .withMessage('Especie no válida'),
  body('datosMascota.edad')
    .optional()
    .isInt({ min: 0 }).withMessage('Edad debe ser un número entero mayor o igual a 0'),
  body('datosMascota.descripcion')
    .optional()
    .isLength({ max: 500 }).withMessage('Descripción máxima 500 caracteres'),
  body('datosMascota.imagen')
    .optional()
    .isURL().withMessage('Imagen debe ser una URL válida'),
  body('mensaje')
    .optional()
    .isLength({ max: 500 }).withMessage('El mensaje no debe superar los 500 caracteres')
];