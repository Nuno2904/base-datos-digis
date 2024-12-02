// src/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dataUploadRoutes = require('./routes/dataUploadRoutes');
const contactosRoutes = require('./routes/contactosRoutes');
const entidadesRoutes = require('./routes/entidadesRoutes');
const empresasRoutes = require('./routes/empresasRoutes');
const comentariosRoutes = require('./routes/comentariosRoutes');
const errorHandler = require('./middlewares/errorHandler');
const usuariosRoutes = require('./routes/usuariosRoutes');
const auth = require('./middlewares/auth');

dotenv.config();

const app = express();

// Middleware para parsear el cuerpo de las peticiones
app.use(express.json());

// Configuración de CORS para permitir todos los orígenes
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));



// Rutas
app.use('/api/upload-data',auth, dataUploadRoutes);
app.use('/api/contactos',auth, contactosRoutes);
app.use('/api/entidades',auth, entidadesRoutes);
app.use('/api/empresas', auth,empresasRoutes);
app.use('/api/comentarios',auth,comentariosRoutes);
app.use('/api/usuarios',usuariosRoutes);


// Middleware de manejo de errores
app.use(errorHandler);


module.exports = app;
