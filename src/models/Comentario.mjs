import mongoose from 'mongoose';

const comentarioSchema = new mongoose.Schema(
  {
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    refugio: { type: mongoose.Schema.Types.ObjectId, ref: 'Refugio', required: true },
    texto: { type: String, required: true, maxlength: 500 },
    rating: { type: Number, min: 1, max: 5, required: true },
    fecha: { type: Date, default: Date.now }
  },
  { collection: 'comentarios' }
);

export default mongoose.models.Comentario || mongoose.model('Comentario', comentarioSchema);