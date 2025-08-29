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
    usuarioId:       {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    }
  },
  { collection: 'refugios' }
);

export default mongoose.models.Refugio || mongoose.model('Refugio', refugioSchema);