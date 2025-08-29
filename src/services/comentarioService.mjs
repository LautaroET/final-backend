import { ComentarioRepository } from '../repositories/ComentarioRepository.mjs';

const repo = new ComentarioRepository();

export const crearComentario = (data) => repo.crear(data);
export const obtenerComentarios = (refugioId) => repo.obtenerPorRefugio(refugioId);
export const eliminarComentario = (id) => repo.eliminar(id);