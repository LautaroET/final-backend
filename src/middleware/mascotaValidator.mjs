// src/validators/mascotaValidator.mjs
import { body } from 'express-validator';

// Validar al crear una mascota
export const crearMascotaValidator = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  body('especie')
    .notEmpty()
    .withMessage('La especie es obligatoria')
    .isIn(['perro', 'gato', 'conejo', 'ave', 'otro'])
    .withMessage('Especie no válida'),
  body('edad')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La edad debe ser un número entero mayor o igual a 0'),
  body('estado')
    .optional()
    .isIn(['disponible', 'en proceso', 'adoptado'])
    .withMessage('Estado no válido'),
  body('descripcion')
    .optional()
    .isLength({ max: 500 })
    .withMessage('La descripción no debe superar los 500 caracteres'),
  body('imagen')
    .optional()
    .isURL()
    .withMessage('La imagen debe ser una URL válida')
];

// Validar al actualizar una mascota
export const actualizarMascotaValidator = [
  body('nombre')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  body('especie')
    .optional()
    .isIn(['perro', 'gato', 'conejo', 'ave', 'otro'])
    .withMessage('Especie no válida'),
  body('edad')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La edad debe ser un número entero mayor o igual a 0'),
  body('estado')
    .optional()
    .isIn(['disponible', 'en proceso', 'adoptado'])
    .withMessage('Estado no válido'),
  body('descripcion')
    .optional()
    .isLength({ max: 500 })
    .withMessage('La descripción no debe superar los 500 caracteres'),
  body('imagen')
    .optional()
    .isURL()
    .withMessage('La imagen debe ser una URL válida')
];