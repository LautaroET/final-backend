import mongoose from 'mongoose';

const publicacionSchema = new mongoose.Schema(
  {
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    refugio: { type: mongoose.Schema.Types.ObjectId, ref: 'Refugio', required: true },
    mascota: {
      name: { type: String, required: true },
      species: { type: String, required: true },
      age: { type: Number, min: 0 },
      size: { type: String, enum: ['pequeño', 'mediano', 'grande'] },
      sex: { type: String, enum: ['macho', 'hembra'] },
      description: { type: String },
      image: { type: String }
    },
    estado: { type: String, enum: ['pendiente', 'aceptada', 'rechazada'], default: 'pendiente' },
    respuesta: { type: String, default: '' }
  },
  { collection: 'solicitudes_publicacion', timestamps: true }
);

export default mongoose.models.SolicitudDePublicacion || mongoose.model('SolicitudDePublicacion', publicacionSchema);