import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        rol: { type: String, enum: ['adoptante', 'admin', 'refugio'], default: 'adoptante' },
        telefono: String,
        fechaRegistro: { type: Date, default: Date.now },
        creador: { type: String, default: 'Tapia Lautaro' }
    },
    { collection: 'usuarios' }
);

// ✅ Evita redefinir el modelo si ya existe
export default mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);