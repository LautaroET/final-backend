import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'userRefugio','user'], default: 'user' },
    isActive: { type: Boolean, default: true }
  },
  { collection: 'usuarios' }
);

export default mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);