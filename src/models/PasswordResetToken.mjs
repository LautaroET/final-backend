import mongoose from 'mongoose';

const passwordResetTokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, default: () => Date.now() + 10 * 60 * 1000 } // 10 min
  },
  { collection: 'passwordResetTokens' }
);

export default mongoose.models.PasswordResetToken || mongoose.model('PasswordResetToken', passwordResetTokenSchema);