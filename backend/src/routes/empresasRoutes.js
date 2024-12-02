// src/routes/contactosRoutes.js
const express = require('express');
const router = express.Router();
const empresasController = require('../controllers/empresasController');
const auth = require('../middlewares/auth');


// CRUD Endpoints
router.post('/',  empresasController.crearEmpresas);            // Crear
router.get('/',  empresasController.obtenerEmpresas);           // Obtener todos
router.get('/:NIF',  empresasController.obtenerEmpresaPorNIF);  // Obtener por DNI
router.put('/:NIF',  empresasController.actualizarEmpresa);     // Actualizar
router.delete('/bulk-delete',  empresasController.eliminarEmpresas);


module.exports = router;
