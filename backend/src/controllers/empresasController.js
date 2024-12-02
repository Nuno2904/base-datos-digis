const Empresa = require('../models/empresasModel');

// Crear una nueva empresa
exports.crearEmpresas = (req, res,next) => {
    const {
        NIF, 
        Nombre, 
        Direccion, 
        Sector,
        Tamano,
        Telefono, 
        Web, 
        Correo, 
        Valoracion_Contacto, 
        Posibilidad_Acuerdo
    } = req.body;


    if (!NIF || !Nombre) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios en entidad' });
    }

    const nuevaEmpresa = {
        NIF,
        Nombre,
        Direccion,
        Sector,
        Tamano,
        Telefono,
        Web,
        Correo,
        Valoracion_Contacto,
        Posibilidad_Acuerdo
    };


    Empresa.crear(nuevaEmpresa, (err, result) => {
        if (err) {
            console.error('Error al crear empresa:', err);
            return res.status(500).json({ mensaje: 'Error al crear empresa', error: err.message });
        }
        res.status(201).json({ mensaje: 'Empresa creada', data: result });
    });
};

// Obtener todas las empresas
exports.obtenerEmpresas = (req, res,next) => {
    Empresa.obtenerTodos((err, empresas) => {
        if (err) {
            console.error('Error al obtener empresas:', err);
            return res.status(500).json({ mensaje: 'Error al obtener empresas', error: err.message });
        }
        res.json(empresas);
    });
};

// Obtener empresa por NIF
exports.obtenerEmpresaPorNIF = (req, res) => {
    const { NIF } = req.params;
    Empresa.obtenerPorCIF(NIF, (err, empresa) => {
        if (err) {
            console.error('Error al obtener empresa:', err);
            return res.status(500).json({ mensaje: 'Error al obtener empresa', error: err.message });
        }
        if (empresa.length === 0) {
            return res.status(404).json({ mensaje: 'Empresa no encontrada' });
        }
        res.json(empresa[0]);
    });
};

// Actualizar empresa
exports.actualizarEmpresa = (req, res) => {
    const { NIF } = req.params;
    const datosActualizados = req.body;

    Empresa.actualizar(NIF, datosActualizados, (err, result) => {
        if (err) {
            console.error('Error al actualizar empresa:', err);
            return res.status(500).json({ mensaje: 'Error al actualizar empresa', error: err.message });
        }
        res.json({ mensaje: 'Empresa actualizada' });
    });
};

// Eliminar empresa
exports.eliminarEmpresa = (req, res) => {
    const { NIF } = req.params;

    Empresa.eliminar(NIF, (err, result) => {
        if (err) {
            console.error('Error al eliminar empresa:', err);
            return res.status(500).json({ mensaje: 'Error al eliminar empresa', error: err.message });
        }
        res.json({ mensaje: 'Empresa eliminada' });
    });
};

// Eliminar múltiples empresas
exports.eliminarEmpresas = (req, res, next) => {
    const { NIFs } = req.body; // Espera un arreglo de NIFs en el cuerpo de la solicitud

    // Validar que se proporcionaron NIFs y que es un arreglo
    if (!NIFs || !Array.isArray(NIFs) || NIFs.length === 0) {
        return res.status(400).json({ mensaje: 'Se requiere una lista de NIFs para eliminar.' });
    }

    Empresa.eliminarVarios(NIFs, (err, result) => {
        if (err) {
            console.error('Error al eliminar empresas:', err);
            return res.status(500).json({ mensaje: 'Error al eliminar empresas', error: err.message });
        }

        res.json({ mensaje: `${result.deletedCount} empresas eliminadas.` });
    });
};