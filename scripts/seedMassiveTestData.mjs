// scripts/seedMassiveTestData.mjs
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Usuario from '../src/models/Usuario.mjs';
import Role from '../src/models/Role.mjs';
import Refugio from '../src/models/Refugio.mjs';
import Mascota from '../src/models/Mascota.mjs';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI no definido');
  process.exit(1);
}

const speciesOptions = ['perro', 'gato', 'conejo', 'hamster', 'ave'];
const sizeOptions = ['pequeño', 'mediano', 'grande'];
const sexOptions = ['macho', 'hembra'];

function generateRandomPet(index) {
  return {
    name: `Mascota${index}`,
    species: speciesOptions[Math.floor(Math.random() * speciesOptions.length)],
    age: Math.floor(Math.random() * 10),
    size: sizeOptions[Math.floor(Math.random() * sizeOptions.length)],
    sex: sexOptions[Math.floor(Math.random() * sexOptions.length)],
    description: `Descripción de mascota ${index}`,
  };
}

function generateRefugioData(index) {
  return {
    name: `Refugio ${index + 1}`,
    address: `Calle ${index + 1} #${100 + index}, Ciudad`,
    phone: `+54 9 11 ${1000 + index}${100 + index}`,
    email: `refugio${index + 1}@test.com`,
    website: `https://refugio${index + 1}.com`,
    capacity: 20 + index,
    description: `Refugio número ${index + 1} dedicado al rescate animal.`,
    adoptionProcess: 'Formulario, entrevista y visita.',
  };
}

function generateUser(index, roleName) {
  return {
    username: `${roleName}_user${index}`,
    email: `${roleName}${index}@test.com`,
    password: 'Test123!',
    roleName,
  };
}

async function seedMassiveTestData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    const adminRole = await Role.findOne({ name: 'admin' });
    const refugioRole = await Role.findOne({ name: 'refugio' });
    const userRole = await Role.findOne({ name: 'user' });

    if (!adminRole || !refugioRole || !userRole) {
      console.error('❌ Roles no encontrados. Ejecuta el script de roles primero.');
      return;
    }

    // 1. Usuario admin único
    const adminExists = await Usuario.findOne({ email: 'admin@test.com' });
    if (!adminExists) {
      const hashed = await bcrypt.hash('Admin123!', 10);
      await Usuario.create({
        username: 'admin',
        email: 'admin@test.com',
        password: hashed,
        role: adminRole._id,
      });
      console.log('✅ Usuario admin creado: admin@test.com');
    } else {
      console.log('ℹ️ Usuario admin ya existe');
    }

    // 2. 10 refugios con 8 mascotas cada uno
    for (let i = 0; i < 10; i++) {
      const user = generateUser(i, 'refugio');
      const existingUser = await Usuario.findOne({ email: user.email });
      if (existingUser) {
        console.log(`ℹ️ Refugio usuario ya existe: ${user.email}`);
        continue;
      }

      const hashed = await bcrypt.hash(user.password, 10);
      const newUser = await Usuario.create({
        username: user.username,
        email: user.email,
        password: hashed,
        role: refugioRole._id,
      });

      const refugioData = generateRefugioData(i);
      const newRefugio = await Refugio.create({
        ...refugioData,
        usuarioId: newUser._id,
      });

      const mascotas = Array.from({ length: 8 }, (_, j) => ({
        ...generateRandomPet(j),
        refugio: newRefugio._id,
      }));

      await Mascota.insertMany(mascotas);

      console.log(`✅ Refugio ${i + 1} + 8 mascotas creados`);
    }

    // 3. 20 usuarios comunes
    for (let i = 0; i < 20; i++) {
      const user = generateUser(i, 'user');
      const existingUser = await Usuario.findOne({ email: user.email });
      if (existingUser) {
        console.log(`ℹ️ Usuario ya existe: ${user.email}`);
        continue;
      }

      const hashed = await bcrypt.hash(user.password, 10);
      await Usuario.create({
        username: user.username,
        email: user.email,
        password: hashed,
        role: userRole._id,
      });
    }
    console.log('✅ 20 usuarios comunes creados');

    console.log('🎉 Seeding masivo completado');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

seedMassiveTestData();