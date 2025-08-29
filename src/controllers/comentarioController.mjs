import * as service from '../services/comentarioService.mjs';

export const crearComentarioController = async (req, res) => {
  try {
    const { texto, rating } = req.body;
    const nuevo = await service.crearComentario({
      usuario: req.user.id,
      refugio: req.params.refugioId,
      texto,
      rating
    });
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

export const obtenerComentariosController = async (req, res) => {
  try {
    const comentarios = await service.obtenerComentarios(req.params.refugioId);
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

export const eliminarComentarioController = async (req, res) => {
  try {
    await service.eliminarComentario(req.params.id);
    res.json({ mensaje: 'Comentario eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};