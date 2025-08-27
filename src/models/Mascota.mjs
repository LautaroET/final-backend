import mongoose from 'mongoose';

const mascotaSchema = new mongoose.Schema(
  {
    nombre:      { type: String, required: true },
    especie:     { type: String, enum: ['perro', 'gato', 'otro'], required: true },
    edad:        { type: Number, min: 0 },
    estado:      { type: String, enum: ['disponible', 'adoptado'], default: 'disponible' },
    refugio:     { type: mongoose.Schema.Types.ObjectId, ref: 'Refugio', required: true },
    imagen:      String,
    descripcion: String,
    creador:     { type: String, default: 'Tapia Lautaro' }
  },
  { collection: 'mascotas' }
);

export default mongoose.models.Mascota || mongoose.model('Mascota', mascotaSchema);