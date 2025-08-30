import express from 'express';
import { connectDB } from './src/config/dbConfig.mjs';
import refugioRoutes from './src/routes/refugioRoutes.mjs';
import usuarioRouter from './src/routes/usuarioRoutes.mjs'
import usuarioRouter from './routes/usuarioRoutes.mjs';
import solicitudRouter from './routes/solicitudRoutes.mjs';
import solicitudDePublicacionRouter from './routes/solicitudDePublicacionRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a BD
connectDB();

// Rutas API
app.use('/api', refugioRoutes);
app.use('/api', mascotaRouter);
app.use('/api', usuarioRouter);
app.use('/api', solicitudRouter);
app.use('/api', solicitudDePublicacionRouter);

// Ruta 404 genérica
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Arrancar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});