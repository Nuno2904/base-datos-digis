// src/routes/comentariosRoutes.js
const express = require('express');
const router = express.Router();
const comentariosController = require('../controllers/comentariosController');
const auth = require('../middlewares/auth');

// Rutas para comentarios
router.get('/', comentariosController.obtenerComentarios); // ?DNI= o ?Nombre_Cliente=
router.post('/:DNI',comentariosController.agregarComentario);
router.put('/nombre/:Nombre_Cliente',comentariosController.actualizarComentario);
router.delete('/:Nombre_Cliente', comentariosController.eliminarComentario);
router.delete('/:DNI', comentariosController.eliminarComentario);

module.exports = router;
