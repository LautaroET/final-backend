import PasswordResetToken from '../models/PasswordResetToken.mjs';

export class PasswordResetTokenRepository {
  async createToken(userId, token) {
    return await PasswordResetToken.create({ user: userId, token });
  }

  async findByToken(token) {
    return await PasswordResetToken.findOne({ token }).populate('user');
  }

  async deleteByUser(userId) {
    await PasswordResetToken.deleteMany({ user: userId });
  }
}