import * as authService from '../services/authService.mjs';

export const registrar = async (req, res) => {
  try {
    const usuario = await authService.registrar(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ mensaje: err.message });
  }
};