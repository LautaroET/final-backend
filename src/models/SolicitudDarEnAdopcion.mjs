// src/models/SolicitudDarEnAdopcion.mjs
import mongoose from 'mongoose';

const solicitudDarEnAdopcionSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    refugio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Refugio',
      required: true
    },
    datosMascota: {
      nombre: { type: String, required: true },
      especie: {
        type: String,
        enum: ['perro', 'gato', 'conejo', 'ave', 'otro'],
        required: true
      },
      edad: { type: Number, min: 0 },
      descripcion: { type: String, maxlength: 500 },
      imagen: { type: String }
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

export default mongoose.model('SolicitudDarEnAdopcion', solicitudDarEnAdopcionSchema);