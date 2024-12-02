// contactosController.js
const Contacto = require('../models/contactosModel');
const Comentario = require('../models/comentariosModel');

// Obtener comentarios por DNI o Nombre
exports.obtenerComentarios = (req, res, next) => {
    const { DNI, Nombre_Cliente } = req.query;

    if (DNI) {
        Comentario.obtenerPorDNI(DNI, (err, resultados) => {
            if (err) {
                console.error('Error al obtener comentarios por DNI:', err);
                return res.status(500).json({ mensaje: 'Error al obtener comentarios' });
            }
            if (resultados.length === 0) {
                return res.status(404).json({ mensaje: `El cliente con DNI ${DNI} no tiene comentarios` });
            }
            res.json(resultados);
        });
    } else if (Nombre_Cliente) {
        Comentario.obtenerPorNombre(Nombre_Cliente, (err, resultados) => {
            if (err) {
                console.error('Error al obtener comentarios por nombre:', err);
                return res.status(500).json({ mensaje: 'Error al obtener comentarios' });
            }
            if (resultados.length === 0) {
                return res.status(404).json({ mensaje: `El cliente con nombre ${Nombre_Cliente} no tiene comentarios` });
            }
            res.json(resultados);
        });
    } else {
        res.status(400).json({ mensaje: 'Debe proporcionar un DNI o Nombre_Cliente para buscar comentarios' });
    }
};

// Agregar comentario
    exports.agregarComentario = (req, res, next) => {
        const { Nombre_Cliente, DNI, Comentario: textoComentario } = req.body;
    
        if (!Nombre_Cliente) {
            return res.status(400).json({ mensaje: 'Nombre_Cliente es obligatorio' });
        }
    
        const nuevoComentario = {
            Nombre_Cliente,
            DNI: DNI || null,
            Comentario: textoComentario,
            Fecha: new Date().toISOString().split('T')[0] // Asigna la fecha actual en formato YYYY-MM-DD
        };
    
        Comentario.crear(nuevoComentario, (err, result) => {
            if (err) {
                console.error('Error al crear comentario:', err);
                return res.status(500).json({ mensaje: 'Error al crear comentario' });
            }
            res.status(201).json({ mensaje: 'Comentario añadido exitosamente', comentario: nuevoComentario });
        });
    };



// Actualizar comentario por DNI o Nombre
exports.actualizarComentario = (req, res, next) => {
    const { DNI, Nombre_Cliente } = req.params;
    const datosActualizados = req.body;

    if (DNI) {
        Comentario.actualizarPorDNI(DNI, datosActualizados, (err, result) => {
            if (err) {
                console.error(`Error al actualizar comentario con DNI ${DNI}:`, err);
                return res.status(500).json({ mensaje: 'Error al actualizar comentario' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Comentario no encontrado' });
            }
            res.json({ mensaje: `Comentario con DNI ${DNI} actualizado` });
        });
    } else if (Nombre_Cliente) {
        Comentario.actualizarPorNombre(Nombre_Cliente, datosActualizados, (err, result) => {
            if (err) {
                console.error(`Error al actualizar comentario con nombre ${Nombre_Cliente}:`, err);
                return res.status(500).json({ mensaje: 'Error al actualizar comentario' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Comentario no encontrado' });
            }
            res.json({ mensaje: `Comentario con nombre ${Nombre_Cliente} actualizado` });
        });
    } else {
        res.status(400).json({ mensaje: 'Debe proporcionar un DNI o Nombre_Cliente para actualizar el comentario' });
    }
};

// Eliminar comentario por DNI o Nombre
exports.eliminarComentario = (req, res, next) => {
    const { DNI, Nombre_Cliente } = req.params;

    if (DNI) {
        Comentario.eliminarPorDNI(DNI, (err, result) => {
            if (err) {
                console.error(`Error al eliminar comentario con DNI ${DNI}:`, err);
                return res.status(500).json({ mensaje: 'Error al eliminar comentario' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Comentario no encontrado' });
            }
            res.json({ mensaje: `Comentario con DNI ${DNI} eliminado` });
        });
    } else if (Nombre_Cliente) {
        Comentario.eliminarPorNombre(Nombre_Cliente, (err, result) => {
            if (err) {
                console.error(`Error al eliminar comentario con nombre ${Nombre_Cliente}:`, err);
                return res.status(500).json({ mensaje: 'Error al eliminar comentario' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Comentario no encontrado' });
            }
            res.json({ mensaje: `Comentario con nombre ${Nombre_Cliente} eliminado` });
        });
    } else {
        res.status(400).json({ mensaje: 'Debe proporcionar un DNI o Nombre_Cliente para eliminar el comentario' });
    }
};
