// routes de entidades;
// src/routes/contactosRoutes.js
const express = require('express');
const router = express.Router();
const entidadesController = require('../controllers/entidadesController');
const auth = require('../middlewares/auth');

router.delete('/bulk-delete', entidadesController.eliminarEntidades);

// CRUD Endpoints
router.post('/',entidadesController.crearEntidad);            // Crear
router.get('/', entidadesController.obtenerEntidades);           // Obtener todos
router.get('/:NIF',entidadesController.obtenerEntidadPorNif);  // Obtener por DNI
router.put('/:NIF',entidadesController.actualizarEntidad);     // Actualizar


module.exports = router;
