import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Permission from '../src/models/Permission.mjs';
import Role from '../src/models/Role.mjs';

dotenv.config();

const permissionsData = [
  // Públicos
  { name: 'read:refugios', description: 'Ver lista de refugios' },
  { name: 'read:mascotas', description: 'Ver lista de mascotas' },

  // Usuario refugio (solo su refugio y mascotas)
  { name: 'create:refugio', description: 'Crear un refugio (solo 1)' },
  { name: 'update:refugio', description: 'Actualizar su propio refugio' },
  { name: 'delete:refugio', description: 'Eliminar su propio refugio' },
  { name: 'create:mascota', description: 'Agregar mascota a su refugio' },
  { name: 'update:mascota', description: 'Modificar mascota de su refugio' },
  { name: 'delete:mascota', description: 'Eliminar mascota de su refugio' }
];

const rolesData = [
  {
    name: 'comun',
    description: 'Usuario sin refugio – solo puede ver refugios y mascotas',
    permissions: ['read:refugios', 'read:mascotas', 'create:refugio']
  },
  {
    name: 'refugio',
    description: 'Usuario con refugio – puede gestionar su refugio y mascotas',
    permissions: [
      'read:refugios',
      'read:mascotas',
      'update:refugio',
      'delete:refugio',
      'create:mascota',
      'update:mascota',
      'delete:mascota'
    ]
  },
  {
    name: 'admin',
    description: 'Administrador total',
    permissions: [
      'read:refugios',
      'read:mascotas',
      'create:refugio',
      'update:refugio',
      'delete:refugio',
      'create:mascota',
      'update:mascota',
      'delete:mascota'
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    await Permission.deleteMany({});
    await Role.deleteMany({});
    console.log('🗑️ Colecciones limpiadas');

    const createdPerms = await Permission.insertMany(permissionsData);
    const permMap = Object.fromEntries(createdPerms.map(p => [p.name, p._id]));

    for (const role of rolesData) {
      const permIds = role.permissions.map(name => permMap[name]);
      await Role.create({
        name: role.name,
        description: role.description,
        permissions: permIds
      });
    }

    console.log('✅ Roles y permisos creados');
  } catch (err) {
    console.error('❌ Error en seed:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();