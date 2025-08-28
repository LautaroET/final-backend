import Usuario from '../models/Usuario.mjs';
import bcrypt from 'bcryptjs';

export class AuthRepository {
  async buscarPorEmail(email) {
    return await Usuario.findOne({ email });
  }

  async crear(data) {
    const hashed = await bcrypt.hash(data.password, 10);
    return await Usuario.create({ ...data, password: hashed });
  }

  async compararPassword(raw, hash) {
    return await bcrypt.compare(raw, hash);
  }
}
async actualizarPassword(userId, hashedPassword) {
  await Usuario.findByIdAndUpdate(userId, { password: hashedPassword });
}