// src/controllers/contactosController.js
const Contacto = require('../models/contactosModel');

// Crear un nuevo contacto
exports.crearContacto = (req, res, next) => {
    const {
        DNI, NIF_entidad, NIF_empresa, Nombre_Empresa, Nombre, Apellido1, Apellido2,
        Email, Fecha_Contacto, Fecha_SigContacto, Fecha_Fin, Dias_SigContacto,
        Estado, Origen, Comentarios, Docs
    } = req.body;

    // Formatear fechas
    const formattedContactDate = Fecha_Contacto ? new Date(Fecha_Contacto).toISOString().split('T')[0] : null;
    const formattedSigContactDate = Fecha_SigContacto ? new Date(Fecha_SigContacto).toISOString().split('T')[0] : null;
    const formattedEndDate = Fecha_Fin ? new Date(Fecha_Fin).toISOString().split('T')[0] : null;

    const nuevoContacto = {
        DNI,
        NIF_entidad,
        NIF_empresa,
        Nombre_Empresa,
        Nombre,
        Apellido1,
        Apellido2,
        Email,
        Fecha_Contacto: formattedContactDate,
        Fecha_SigContacto: formattedSigContactDate,
        Fecha_Fin: formattedEndDate,
        Dias_SigContacto,
        Estado,
        Origen,
        Comentarios,
        Docs
    };

    Contacto.crear(nuevoContacto, (err, result) => {
        if (err) {
            console.error('Error al crear contacto:', err);
            return res.status(500).json({ mensaje: 'Error al crear contacto', error: err.message });
        }
        res.status(201).json({ mensaje: `Contacto creado con DNI: ${DNI}` });
    });
};

// Obtener todos los contactos
exports.obtenerContactos = (req, res, next) => {
    Contacto.obtenerTodos((err, resultados) => {
        if (err) {
            console.error('Error al obtener contactos:', err);
            return res.status(500).json({ mensaje: 'Error al obtener contactos', error: err.message });
        }
        res.json(resultados);
    });
};

// Obtener un contacto por DNI
exports.obtenerContactoPorDNI = (req, res, next) => {
    const { DNI } = req.params;
    Contacto.obtenerPorDNI(DNI, (err, resultados) => {
        if (err) {
            console.error(`Error al obtener contacto con DNI ${DNI}:`, err);
            return res.status(500).json({ mensaje: 'Error al obtener contacto', error: err.message });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ mensaje: 'Contacto no encontrado' });
        }
        res.json(resultados[0]);
    });
};
exports.obtenerPorNombre = (req, res, next) => {
    const { Nombre } = req.query;
    Contacto.obtenerPorNombre(Nombre, (err, resultados) => {
        if (err) {
            console.error(`Error al obtener contacto con nombre ${Nombre}:`, err);
            return res.status(500).json({ mensaje: 'Error al obtener contacto', error: err.message });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ mensaje: 'Contacto no encontrado' });
        }
        res.json(resultados);
    }
    );
};

// Actualizar un contacto
exports.actualizarContacto = (req, res, next) => {
    const { DNI } = req.params;
    const datosActualizados = req.body;

    // Si hay fechas en los datos actualizados, formatearlas
    if (datosActualizados.Fecha_Contacto) {
        datosActualizados.Fecha_Contacto = new Date(datosActualizados.Fecha_Contacto).toISOString().split('T')[0];
    }
    if (datosActualizados.Fecha_SigContacto) {
        datosActualizados.Fecha_SigContacto = new Date(datosActualizados.Fecha_SigContacto).toISOString().split('T')[0];
    }
    if (datosActualizados.Fecha_Fin) {
        datosActualizados.Fecha_Fin = new Date(datosActualizados.Fecha_Fin).toISOString().split('T')[0];
    }

    Contacto.actualizar(DNI, datosActualizados, (err, result) => {
        if (err) {
            console.error(`Error al actualizar contacto con DNI ${DNI}:`, err);
            return res.status(500).json({ mensaje: 'Error al actualizar contacto', error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Contacto no encontrado' });
        }
        res.json({ mensaje: `Contacto con DNI ${DNI} actualizado` });
    });
};

// Eliminar un contacto
exports.eliminarContacto = (req, res, next) => {
    const { DNI } = req.params;
    Contacto.eliminar(DNI, (err, result) => {
        if (err) {
            console.error(`Error al eliminar contacto con DNI ${DNI}:`, err);
            return res.status(500).json({ mensaje: 'Error al eliminar contacto', error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Contacto no encontrado' });
        }
        res.json({ mensaje: `Contacto con DNI ${DNI} eliminado` });
    });
};

// Eliminar múltiples contactos
exports.eliminarContactos = (req, res, next) => {
    const { DNIs } = req.body; // Espera un arreglo de DNIs en el cuerpo de la solicitud

    // Validar que se proporcionaron DNIs y que es un arreglo
    if (!DNIs || !Array.isArray(DNIs) || DNIs.length === 0) {
        return res.status(400).json({ mensaje: 'Se requiere una lista de DNIs para eliminar.' });
    }

    Contacto.eliminarVarios(DNIs, (err, result) => {
        if (err) {
            console.error('Error al eliminar contactos:', err);
            return res.status(500).json({ mensaje: 'Error al eliminar contactos', error: err.message });
        }

        res.json({ mensaje: `${result.deletedCount} contactos eliminados.` });
    });
};