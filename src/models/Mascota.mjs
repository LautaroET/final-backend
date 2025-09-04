import mongoose from 'mongoose';

const mascotaSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true, trim: true, minlength: 2 },
        especie: {
        type: String,
        required: true,
        enum: ['perro', 'gato', 'conejo', 'ave', 'otro']
        },
        raza: { type: String, trim: true },
        genero: { type: String, enum: ['macho', 'hembra'], required: true },
        edad: { type: Number, min: 0, max: 30 },
        estado: {
        type: String,
        enum: ['disponible', 'en proceso de adopción', 'adoptado'],
        default: 'disponible'
        },
        descripcion: { type: String, trim: true, maxlength: 1000 },
        imagen: { type: String ,required: true },
        caracteristicas: [String],
        refugio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Refugio',
        required: true
        },
        esterilizado: { type: Boolean, default: false },
        tamano: { type: String, enum: ['pequeño', 'mediano', 'grande'] },
        nivelEnergia: { type: String, enum: ['bajo', 'moderado', 'alto'] },
        ubicacionActual: { type: String, trim: true }
    },
    { timestamps: true }
);

export default mongoose.model('Mascota', mascotaSchema);
