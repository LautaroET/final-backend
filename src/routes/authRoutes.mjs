import express from 'express';
import { register, login } from '../controllers/authController.mjs';
import { registerValidator, loginValidator } from '../validators/authValidator.mjs';
import { validationResult } from 'express-validator';

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);

export default router;