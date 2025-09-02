// src/models/SolicitudAdopcion.mjs
import mongoose from 'mongoose';

const solicitudAdopcionSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    mascota: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mascota',
      required: true
    },
    refugio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Refugio',
      required: true
    },
    estado: {
      type: String,
      enum: ['pendiente', 'aceptada', 'rechazada'],
      default: 'pendiente'
    },
    mensaje: {
      type: String,
      maxlength: 500
    }
  },
  { timestamps: true }
);

export default mongoose.model('SolicitudAdopcion', solicitudAdopcionSchema);