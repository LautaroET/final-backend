import express from 'express';
import { connectDB } from './src/config/dbConfig.mjs';
import usuarioRoutes from './src/routes/usuarioRoutes.mjs';
import refugioRoutes from './src/routes/refugioRoutes.mjs';
import mascotaRoutes from './src/routes/mascotaRoutes.mjs';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();

app.use('/api', usuarioRoutes);
app.use('/api', refugioRoutes);
app.use('/api', mascotaRoutes);
app.use(cors()); 

app.use((req, res) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🐾 Servidor de Patitas al Rescate escuchando en puerto ${PORT}`);
});