import mongoose from 'mongoose';

const refugioSchema = new mongoose.Schema(
  {
    name:            { type: String, required: true },
    address:         { type: String, required: true },
    phone:           { type: String, required: true },
    email:           { type: String, required: true },
    website:         { type: String, required: true },
    capacity:        { type: Number, required: true, min: 0 },
    image:           { type: String },
    description:     { type: String, required: true },
    adoptionProcess: { type: String, required: true },
    creador:         { type: String, default: 'Tapia Lautaro' }
  },
  { collection: 'refugios' }
);

export default mongoose.models.Refugio || mongoose.model('Refugio', refugioSchema);