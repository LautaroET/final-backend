import mongoose from 'mongoose';

const refugioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, unique: true },
    descripcion: { type: String },
    imagen: { type: String },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Refugio', refugioSchema);
