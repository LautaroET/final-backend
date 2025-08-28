import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './src/config/dbConfig.mjs';
import refugioRoutes from './src/routes/refugioRoutes.mjs';
import mascotaRoutes from './src/routes/mascotaRoutes.mjs';
import usuarioRoutes from './src/routes/usuarioRoutes.mjs';
import solicitudAdopcionRoutes from './src/routes/solicitudAdopcion.mjs';
import solicitudDarEnAdopcionRoutes from './src/routes/solicitudDarEnAdopcion.mjs';
import estadisticasRoutes from './src/routes/estadisticasRoutes.mjs';
import uploadRoutes from './src/routes/uploadRoutes.mjs';

dotenv.config();
await connectDB();        // conecta a Mongo

const app = express();

// ↓↓↓ CORS después de crear la app ↓↓↓
app.use(cors());          // permite cualquier origen
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', refugioRoutes);
app.use('/api', mascotaRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', solicitudAdopcionRoutes);
app.use('/api', solicitudDarEnAdopcionRoutes);
app.use('/api', estadisticasRoutes);
app.use('/api', uploadRoutes);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`🐾 Servidor de Patitas al Rescate corriendo en puerto ${PORT}`)
);