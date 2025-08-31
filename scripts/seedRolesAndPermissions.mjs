// scripts/seedRolesAndPermissions.mjs
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Permission from '../src/models/Permission.mjs';
import Role from '../src/models/Role.mjs';
import Usuario from '../src/models/Usuario.mjs';
import bcrypt from 'bcrypt';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI no está definido en .env');
  process.exit(1);
}

const permissions = [
  { name: 'manage_all', description: 'Acceso total a todos los recursos' },
  { name: 'create_refugio', description: 'Crear refugios' },
  { name: 'update_refugio', description: 'Actualizar refugios' },
  { name: 'delete_refugio', description: 'Eliminar refugios' },
  { name: 'create_mascota', description: 'Crear mascotas' },
  { name: 'update_mascota', description: 'Actualizar mascotas' },
  { name: 'delete_mascota', description: 'Eliminar mascotas' },
  { name: 'view_refugios', description: 'Ver refugios' },
  { name: 'view_mascotas', description: 'Ver mascotas' },
  { name: 'create_solicitud', description: 'Crear solicitudes de adopción' },
  { name: 'view_solicitudes', description: 'Ver solicitudes' },
  { name: 'update_solicitud', description: 'Actualizar solicitudes' },
];

const roles = [
  {
    name: 'admin',
    description: 'Administrador con acceso total',
    permissions: ['manage_all'],
  },
  {
    name: 'refugio',
    description: 'Usuario refugio con permisos limitados a su contenido',
    permissions: [
      'create_refugio',
      'update_refugio',
      'delete_refugio',
      'create_mascota',
      'update_mascota',
      'delete_mascota',
      'view_refugios',
      'view_mascotas',
      'view_solicitudes',
      'update_solicitud',
    ],
  },
  {
    name: 'user',
    description: 'Usuario común',
    permissions: ['view_refugios', 'view_mascotas', 'create_solicitud'],
  },
];

const adminUser = {
  username: 'admin',
  email: 'admin@patitas.com',
  password: 'Admin1234!',
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    // 1. Crear permisos
    const createdPermissions = {};
    for (const perm of permissions) {
      const existing = await Permission.findOne({ name: perm.name });
      if (!existing) {
        createdPermissions[perm.name] = await Permission.create(perm);
        console.log(`✅ Permiso creado: ${perm.name}`);
      } else {
        createdPermissions[perm.name] = existing;
        console.log(`ℹ️ Permiso ya existe: ${perm.name}`);
      }
    }

    // 2. Crear roles con permisos
    for (const roleData of roles) {
      const permissionDocs = roleData.permissions.map(p => createdPermissions[p]._id);
      const existingRole = await Role.findOne({ name: roleData.name });
      if (!existingRole) {
        await Role.create({
          name: roleData.name,
          description: roleData.description,
          permissions: permissionDocs,
        });
        console.log(`✅ Rol creado: ${roleData.name}`);
      } else {
        // Actualizar permisos si cambiaron
        existingRole.permissions = permissionDocs;
        await existingRole.save();
        console.log(`ℹ️ Rol actualizado: ${roleData.name}`);
      }
    }

    // 3. Crear usuario admin
    const adminRole = await Role.findOne({ name: 'admin' });
    const existingAdmin = await Usuario.findOne({ email: adminUser.email });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminUser.password, 10);
      await Usuario.create({
        username: adminUser.username,
        email: adminUser.email,
        password: hashedPassword,
        role: adminRole._id,
      });
      console.log(`✅ Usuario admin creado: ${adminUser.email}`);
    } else {
      console.log(`ℹ️ Usuario admin ya existe: ${adminUser.email}`);
    }

    console.log('🎉 Seeding completado');
  } catch (error) {
    console.error('❌ Error en seeding:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

seed();