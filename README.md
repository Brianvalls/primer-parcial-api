# Parcial 2 - Aplicaciones Híbridas

Portfolio de proyectos y clientes hecho con MERN. El backend es una API REST (Node,
Express y MongoDB) y el frontend una app en React que la consume.

Tiene usuarios con login y registro (contraseñas encriptadas y JWT), y CRUD de
proyectos y clientes. Cualquiera puede ver los proyectos; para ver clientes y para
crear, editar o eliminar hay que iniciar sesión.

## Variables de entorno

.env 

PORT=3333
MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@CLUSTER.mongodb.net/
DB_NAME=AH20232CP1
JWT_SECRET=una_clave_secreta

## Levantar el backend

npm install
npm run dev

Queda en http://localhost:3333

## Levantar el frontend

cd front
npm install
npm run dev

Queda en http://localhost:5173 y necesita el backend corriendo.
