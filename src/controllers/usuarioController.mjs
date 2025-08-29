// controllers/usuarioController.mjs
import * as usuarioService from '../services/usuarioService.mjs';

export async function obtenerUsuariosController(req, res) {
  try {
    const usuarios = await usuarioService.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
  }
}

export async function crearUsuarioController(req, res) {
  try {
    const nuevo = await usuarioService.crearUsuario(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear usuario', error: error.message });
  }
}

export async function obtenerUsuarioPorIdController(req, res) {
  try {
    const usuario = await usuarioService.obtenerUsuarioPorId(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario', error: error.message });
  }
}

export async function actualizarUsuarioController(req, res) {
  try {
    const actualizado = await usuarioService.actualizarUsuario(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error: error.message });
  }
}

export async function eliminarUsuarioController(req, res) {
  try {
    const eliminado = await usuarioService.eliminarUsuario(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message });
  }
}