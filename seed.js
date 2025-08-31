// seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import Role from './src/models/Role.mjs';
import Permission from './src/models/Permission.mjs';
import Usuario from './src/models/Usuario.mjs';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');
  } catch (err) {
    console.error('❌ Error al conectar:', err.message);
    process.exit(1);
  }
};

const seed = async () => {
  await connectDB();

  // Limpiar colecciones previas
  await Permission.deleteMany();
  await Role.deleteMany();
  await Usuario.deleteMany();

  // Crear permisos
  const permissions = await Permission.insertMany([
    { name: 'manage_all', description: 'Permiso total' },
    { name: 'create_refugio', description: 'Crear refugio' },
    { name: 'create_mascota', description: 'Crear mascota' },
    { name: 'update_mascota', description: 'Editar mascota' },
    { name: 'delete_mascota', description: 'Eliminar mascota' },
    { name: 'view_refugio_solicitudes', description: 'Ver solicitudes del refugio' },
  ]);

  // Crear roles con permisos
  const adminRole = await Role.create({
    name: 'admin',
    description: 'Administrador del sistema',
    permissions: permissions.map(p => p._id),
  });

  const refugioRole = await Role.create({
    name: 'refugio',
    description: 'Usuario refugio',
    permissions: [
      permissions.find(p => p.name === 'create_refugio')._id,
      permissions.find(p => p.name === 'create_mascota')._id,
      permissions.find(p => p.name === 'update_mascota')._id,
      permissions.find(p => p.name === 'delete_mascota')._id,
      permissions.find(p => p.name === 'view_refugio_solicitudes')._id,
    ],
  });

  const userRole = await Role.create({
    name: 'user',
    description: 'Usuario común',
    permissions: [], // Sin permisos especiales
  });

  // Crear usuarios de prueba
  await Usuario.insertMany([
    {
      username: 'admin',
      email: 'admin@mail.com',
      password: await bcrypt.hash('123456', 10),
      role: adminRole._id,
    },
    {
      username: 'refugio1',
      email: 'refugio1@mail.com',
      password: await bcrypt.hash('123456', 10),
      role: refugioRole._id,
    },
    {
      username: 'user1',
      email: 'user1@mail.com',
      password: await bcrypt.hash('123456', 10),
      role: userRole._id,
    },
  ]);

  console.log('✅ Seed completado');
  mongoose.disconnect();
};

seed();