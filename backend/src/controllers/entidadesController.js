const Entidad = require('../models/entidadesModel');

// Crear una nueva entidad
exports.crearEntidad = (req, res, next) => {
    // Destructurar los datos del cuerpo de la solicitud
    const {
        NIF,
        Nombre,
        Tipo,
        Direccion,
        Sector,
        Telefono,
        Web,
        Correo,
        Valoracion_Contacto,
        Posibilidad_Acuerdo
    } = req.body;

    // Validación de campos obligatorios
    if (!NIF || !Nombre) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios en entidad' });
    }

    // Crear el objeto de la nueva entidad
    const nuevaEntidad = {
        NIF,
        Nombre,
        Tipo,
        Direccion,
        Sector,
        Telefono,
        Web,
        Correo,
        Valoracion_Contacto,
        Posibilidad_Acuerdo
    };

    // Llamada al modelo para insertar en la base de datos
    Entidad.crear(nuevaEntidad, (err, result) => {
        if (err) {
            console.error('Error al crear entidad:', err);
            return res.status(500).json({ mensaje: 'Error al crear entidad', error: err.message });
        }
        res.status(201).json({ mensaje: `Entidad creada con NIF: ${NIF}` });
    });
};

// Obtener todas las entidades
exports.obtenerEntidades = (req, res, next) => {
    Entidad.obtenerTodos((err, resultados) => {
        if (err) {
            console.error('Error al obtener entidades:', err);
            return res.status(500).json({ mensaje: 'Error al obtener entidades', error: err.message });
        }
        res.json(resultados);
    });
};

// Obtener una entidad por NIF
exports.obtenerEntidadPorNif = (req, res, next) => {
    const { NIF } = req.params;
    Entidad.obtenerPorNIF(NIF, (err, resultados) => {
        if (err) {
            console.error(`Error al obtener entidad con NIF ${NIF}:`, err);
            return res.status(500).json({ mensaje: 'Error al obtener entidad', error: err.message });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ mensaje: 'Entidad no encontrada' });
        }
        res.json(resultados[0]);
    });
};

// Actualizar una entidad por NIF
exports.actualizarEntidad = (req, res, next) => {
    const { NIF } = req.params;
    const datosActualizados = req.body;

    Entidad.actualizar(NIF, datosActualizados, (err, result) => {
        if (err) {
            console.error(`Error al actualizar entidad con NIF ${NIF}:`, err);
            return res.status(500).json({ mensaje: 'Error al actualizar entidad', error: err.message });
        }
        res.json({ mensaje: `Entidad con NIF ${NIF} actualizada` });
    });
};

// Eliminar una entidad por NIF
exports.eliminarEntidad = (req, res, next) => {
    const { NIF } = req.params;
    Entidad.eliminar(NIF, (err, result) => {
        if (err) {
            console.error(`Error al eliminar entidad con NIF ${NIF}:`, err);
            return res.status(500).json({ mensaje: 'Error al eliminar entidad', error: err.message });
        }
        res.json({ mensaje: `Entidad con NIF ${NIF} eliminada` });
    });
};

// Eliminar múltiples entidades
exports.eliminarEntidades = (req, res, next) => {
    const { NIFs } = req.body; // Espera un arreglo de NIFs en el cuerpo de la solicitud

    console.log("NIFs", NIFs);
    // Validar que se proporcionaron NIFs y que es un arreglo
    if (!NIFs || !Array.isArray(NIFs) || NIFs.length === 0) {
        return res.status(400).json({ mensaje: 'Se requiere una lista de NIFs para eliminar.' });
    }

    Entidad.eliminarVarios(NIFs, (err, result) => {
        if (err) {
            console.error('Error al eliminar entidades:', err);
            return res.status(500).json({ mensaje: 'Error al eliminar entidades', error: err.message });
        }

        res.json({ mensaje: `${result.deletedCount} entidades eliminadas.` });
    });
};