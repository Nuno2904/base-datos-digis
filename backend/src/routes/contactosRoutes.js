const express = require('express');
const router = express.Router();
const contactosController = require('../controllers/contactosController');
const auth = require('../middlewares/auth');

// Asegúrate de que las rutas específicas se definan primero
router.delete('/bulk-delete', contactosController.eliminarContactos); // Eliminación masiva
router.delete('/:DNI', contactosController.eliminarContacto);          // Eliminar un solo contacto

// Otras rutas
router.post('/', contactosController.crearContacto);                // Crear
router.get('/', contactosController.obtenerContactos);              // Obtener todos
router.get('/search', contactosController.obtenerPorNombre);        // Obtener por Nombre
router.get('/:DNI', contactosController.obtenerContactoPorDNI);      // Obtener por DNI
router.put('/:DNI', contactosController.actualizarContacto);        // Actualizar

module.exports = router;
