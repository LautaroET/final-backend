import mongoose from 'mongoose';

const mascotaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true }, // perro, gato, etc.
    age: { type: Number, min: 0 },
    size: { type: String, enum: ['pequeño', 'mediano', 'grande'] },
    sex: { type: String, enum: ['macho', 'hembra'] },
    description: { type: String },
    image: { type: String },
    isAdopted: { type: Boolean, default: false },
    refugio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Refugio',
      required: true
    }
  },
  { collection: 'mascotas' }
);

export default mongoose.models.Mascota || mongoose.model('Mascota', mascotaSchema);