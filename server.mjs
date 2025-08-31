// server.mjs
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.mjs';
import router from './src/routes/index.mjs';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', router);

// Conectar a MongoDB
connectDB();

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});