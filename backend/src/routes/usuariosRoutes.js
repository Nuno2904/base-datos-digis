//usuariosRoutes.js
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');


router.post('/', usuariosController.crearUsuario);                 // Crear
router.get('/', usuariosController.obtenerUsuarios);               // Obtener todos
router.get('/:email', usuariosController.obtenerUsuarioPorEmail);  // Obtener por email
router.put('/:email', usuariosController.editarUsuario);           // Actualizar
router.delete('/:email', usuariosController.borrarUsuario);        // Eliminar
router.post('/login', usuariosController.login);                   // Login

module.exports = router;