import UsuarioRepository from '../repositories/UsuarioRepository.mjs';
const repo = new UsuarioRepository();

export const obtenerUsuarios = () => repo.obtenerTodos();
export const crearUsuario = (data) => repo.crear(data);
export const obtenerUsuarioPorId = (id) => repo.obtenerPorId(id);
export const actualizarUsuario = (id, data) => repo.actualizarPorId(id, data);
export const eliminarUsuario = (id) => repo.eliminarPorId(id);