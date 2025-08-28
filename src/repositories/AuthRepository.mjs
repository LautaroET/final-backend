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

  async actualizarPassword(userId, hashedPassword) {
    return await Usuario.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );
  }

  async compararPassword(raw, hash) {
    return await bcrypt.compare(raw, hash);
  }
}