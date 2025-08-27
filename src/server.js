import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import usuarioRoutes from './routes/usuarioRoutes.mjs';
import refugioRoutes from './routes/refugioRoutes.mjs';
import mascotaRoutes from './routes/mascotaRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();

app.use('/api', usuarioRoutes);
app.use('/api', refugioRoutes);
app.use('/api', mascotaRoutes);

app.use((req, res) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🐾 Servidor de Patitas al Rescate escuchando en puerto ${PORT}`);
});