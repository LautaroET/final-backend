# 🐾 Patitas al Rescate – Backend API

**Base URL:** https://final-backend-msfy.onrender.com/api  
**Stack:** Node.js + Express + MongoDB (Mongoose) + MVC + REST

---

## 📖 ¿Qué es?
API para conectar usuarios y refugios que buscan dar o adoptar mascotas.  
Los usuarios pueden:
- Publicar mascotas para dar en adopción.
- Solicitar adoptar mascotas.
Los refugios pueden:
- Recibir y gestionar ambos tipos de solicitudes.

---

## 🧩 Entidades y Relaciones
| Entidad | ¿Qué representa? | Relación clave |
|---------|------------------|----------------|
| **Usuario** | Persona registrada | Tiene muchas **solicitudes** |
| **Refugio** | Organización con mascotas | Tiene muchas **mascotas** y **solicitudes** |
| **Mascota** | Animal en adopción | Pertenece a un **refugio** |
| **SolicitudDeAdopcion** | Usuario quiere adoptar una mascota | Usuario → Refugio → Mascota |
| **SolicitudDePublicacion** | Usuario quiere que publiquen su mascota | Usuario → Refugio |

---

## 🚀 Endpoints (CRUD completo)

### 🔐 **Usuarios**
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET    | `/usuarios` | Listar usuarios |
| POST   | `/usuarios` | Crear usuario |
| GET    | `/usuarios/:id` | Ver usuario |
| PUT    | `/usuarios/:id` | Actualizar usuario |
| DELETE | `/usuarios/:id` | Eliminar usuario |

### 🏠 **Refugios**
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET    | `/refugios` | Listar refugios |
| POST   | `/refugios` | Crear refugio |
| GET    | `/refugios/:id` | Ver refugio |
| PUT    | `/refugios/:id` | Actualizar refugio |
| DELETE | `/refugios/:id` | Eliminar refugio |

### 🐶 **Mascotas**
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET    | `/mascotas` | Listar mascotas |
| POST   | `/mascotas` | Crear mascota |
| GET    | `/mascotas/:id` | Ver mascota |
| PUT    | `/mascotas/:id` | Actualizar mascota |
| DELETE | `/mascotas/:id` | Eliminar mascota |
| GET    | `/refugios/:id/mascotas` | Mascotas de un refugio |

### 📋 **Solicitudes de Adopción**
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET    | `/solicitudes` | Todas las solicitudes |
| POST   | `/solicitudes` | Crear solicitud |
| GET    | `/solicitudes/:id` | Ver solicitud |
| PUT    | `/solicitudes/:id` | Actualizar solicitud |
| DELETE | `/solicitudes/:id` | Eliminar solicitud |
| GET    | `/usuarios/:id/solicitudes` | Solicitudes de un usuario |
| GET    | `/refugios/:id/solicitudes` | Solicitudes de un refugio |

### 📤 **Solicitudes de Publicación**
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET    | `/solicitudes-publicacion` | Todas las solicitudes |
| POST   | `/solicitudes-publicacion` | Crear solicitud |
| GET    | `/solicitudes-publicacion/:id` | Ver solicitud |
| PUT    | `/solicitudes-publicacion/:id/responder` | Refugio acepta/rechaza |
| DELETE | `/solicitudes-publicacion/:id` | Eliminar solicitud |
| GET    | `/usuarios/:id/solicitudes-publicacion` | Solicitudes de un usuario |
| GET    | `/refugios/:id/solicitudes-publicacion` | Solicitudes de un refugio |

---

## ✅ Ejemplo rápido en Postman

### 1️⃣ Crear refugio
```json
POST /refugios
{
  "name": "Refugio Esperanza",
  "address": "Calle 123",
  "phone": "1166778899",
  "email": "esperanza@mail.com",
  "website": "https://esperanza.com",
  "capacity": 25,
  "description": "Refugio para perros y gatos abandonados",
  "adoptionProcess": "Entrevista + Visita + Adopción",
  "usuarioId": "671234567890abcdef123456"
}

###📦 Instalación local
 2️⃣ Crear mascota 
JSON
POST /mascotas
{
  "name": "Luna",
  "species": "perro",
  "age": 3,
  "size": "mediano",
  "sex": "hembra",
  "description": "Muy cariñosa",
  "refugio": "671234567890abcdef123456"
}
3️⃣ Solicitar adopción
JSON
复制
POST /solicitudes
{
  "usuario": "671234567890abcdef123456",
  "mascota": "671234567890abcdef123457",
  "refugio": "671234567890abcdef123456",
  "mensaje": "Quiero adoptar a Luna porque..."
}
###📦 Instalación local
bash

git clone https://github.com/LautaroET/final-backend
cd backend
npm install
cp .env.example .env
# Edita .env con tu MONGO_URI
npm start

### 🧪 Tecnologías
Node.js 22+
Express
MongoDB Atlas
Mongoose
ES Modules
MVC pattern