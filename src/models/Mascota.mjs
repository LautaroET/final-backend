import mongoose from 'mongoose';

const mascotaSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        especie: { type: String, required: true },
        edad: { type: Number, min: 0 },
        estado: {
        type: String,
        enum: ['disponible', 'en proceso', 'adoptado'],
        default: 'disponible'
        },
        refugio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Refugio',
        required: true
        },
        descripcion: String,
        imagen: String
    },
    { timestamps: true }
);

export default mongoose.model('Mascota', mascotaSchema);