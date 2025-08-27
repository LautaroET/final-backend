import mongoose from 'mongoose';

const refugioSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        direccion: { type: String, required: true },
        telefono: String,
        email: String,
        capacidad: Number,
        animales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }],
        creador: { type: String, default: 'Tapia Lautaro' }
    },
    { collection: 'refugios' }
);

// ✅ Evita redefinir el modelo si ya existe
export default mongoose.models.Refugio || mongoose.model('Refugio', refugioSchema);