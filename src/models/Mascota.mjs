import mongoose from 'mongoose';

const mascotaSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true },
    breed:       { type: String, required: true },
    age:         { type: Number, required: true, min: 0 },
    gender:      { type: String, enum: ['Macho', 'Hembra'], required: true },
    size:        { type: String, enum: ['Pequeño', 'Mediano', 'Grande'], required: true },
    personality: { type: String, required: true },
    status: { type: String, enum: ['En adopción', 'Adoptado', 'Reservado'], required },
    description: { type: String, required: true },
    history:     { type: String },
    images: [{ type: String, required: true }]
    refugio:     { type: mongoose.Schema.Types.ObjectId, ref: 'Refugio', required: true },
    creador:     { type: String, default: 'Tapia Lautaro' }
  },
  { collection: 'mascotas' }
);

export default mongoose.models.Mascota || mongoose.model('Mascota', mascotaSchema);