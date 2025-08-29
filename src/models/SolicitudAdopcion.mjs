import mongoose from 'mongoose';

const solicitudAdopcionSchema = new mongoose.Schema(
  {
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    mascota: { type: mongoose.Schema.Types.ObjectId, ref: 'Mascota', required: true },
    refugio: { type: mongoose.Schema.Types.ObjectId, ref: 'Refugio', required: true }, // ✅ Agregado
    mensaje: { type: String, required: true },
    estado: { type: String, enum: ['Pendiente', 'Aceptada', 'Rechazada'], default: 'Pendiente' },
    respuestaDelRefugio: { type: String }
  },
  { collection: 'solicitudesAdopcion', timestamps: true }
);

export default mongoose.models.SolicitudAdopcion || mongoose.model('SolicitudAdopcion', solicitudAdopcionSchema);