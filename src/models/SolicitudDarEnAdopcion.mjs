import mongoose from 'mongoose';

const solicitudDarEnAdopcionSchema = new mongoose.Schema(
  {
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    refugio: { type: mongoose.Schema.Types.ObjectId, ref: 'Refugio', required: true },
    mascota: {
      name: { type: String, required: true },
      breed: { type: String, required: true },
      age: { type: Number, required: true },
      gender: { type: String, enum: ['Macho', 'Hembra'], required: true },
      size: { type: String, enum: ['Pequeño', 'Mediano', 'Grande'], required: true },
      description: { type: String, required: true },
      images: [{ type: String, required: true }]
    },
    estado: { type: String, enum: ['Pendiente', 'Aprobada', 'Rechazada'], default: 'Pendiente' },
    respuestaDelRefugio: { type: String }
  },
  { collection: 'solicitudesDarEnAdopcion', timestamps: true }
);

export default mongoose.models.SolicitudDarEnAdopcion || mongoose.model('SolicitudDarEnAdopcion', solicitudDarEnAdopcionSchema);