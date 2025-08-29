import mongoose from 'mongoose';

const solicitudSchema = new mongoose.Schema(
  {
    usuario:   { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    mascota:   { type: mongoose.Schema.Types.ObjectId, ref: 'Mascota', required: true },
    refugio:   { type: mongoose.Schema.Types.ObjectId, ref: 'Refugio', required: true },
    mensaje:   { type: String, default: '' },
    estado:    { type: String, enum: ['pendiente', 'aceptada', 'rechazada'], default: 'pendiente' },
    respuesta: { type: String, default: '' }     
  },
  { collection: 'solicitudes', timestamps: true }
);

export default mongoose.models.Solicitud || mongoose.model('SolicitudDeAdopcion', solicitudSchema);