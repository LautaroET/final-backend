import * as service from '../services/passwordResetService.mjs';

export const solicitarResetController = async (req, res) => {
  try {
    const { email } = req.body;
    await service.solicitarReset(email);
    res.json({ mensaje: 'Email enviado' });
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { token, password } = req.body;
    await service.resetPassword(token, password);
    res.json({ mensaje: 'Contraseña actualizada' });
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};