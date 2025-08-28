import { ImagenRepository } from '../repositories/ImagenRepository.mjs';

const repo = new ImagenRepository();

export const agregarImagenAEntidad = async (modelo, id, imageUrl) => {
  return await repo.agregarImagen(modelo, id, imageUrl);
};