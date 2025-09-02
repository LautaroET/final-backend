// scripts/seedRoles.mjs
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Permission from '../src/models/Permission.mjs';
import Role from '../src/models/Role.mjs';

dotenv.config();

const seedRoles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Permisos
    const permissionsData = [
      { name: 'read:mascotas', description: 'Ver mascotas' },
      { name: 'write:mascotas', description: 'Crear/Editar mascotas' },
      { name: 'delete:mascotas', description: 'Eliminar mascotas' },
      { name: 'read:refugios', description: 'Ver refugios' },
      { name: 'write:refugios', description: 'Crear/Editar refugios' },
      { name: 'delete:refugios', description: 'Eliminar refugios' },
      { name: 'admin:all', description: 'Acceso total' }
    ];

    const permissions = await Permission.insertMany(
      permissionsData.map(p => ({ ...p, _id: new mongoose.Types.ObjectId() })),
      { ordered: false }
    ).catch(() => Permission.find()); // si ya existen, traerlos

    // Roles
    const rolesData = [
      { name: 'comun', description: 'Usuario común' },
      { name: 'refugio', description: 'Dueño de refugio' },
      { name: 'admin', description: 'Administrador del sistema' }
    ];

    for (const r of rolesData) {
      let role = await Role.findOne({ name: r.name });
      if (!role) {
        role = new Role(r);
        switch (r.name) {
          case 'comun':
            role.permissions = permissions.filter(p => p.name === 'read:mascotas');
            break;
          case 'refugio':
            role.permissions = permissions.filter(p =>
              ['read:mascotas', 'write:mascotas', 'delete:mascotas', 'read:refugios', 'write:refugios', 'delete:refugios'].includes(p.name)
            );
            break;
          case 'admin':
            role.permissions = permissions;
            break;
        }
        await role.save();
      }
    }

    console.log('✅ Roles y permisos creados');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al seedear roles:', err);
    process.exit(1);
  }
};

seedRoles();