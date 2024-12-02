// src/models/entidadesModel.js
const db = require('../config/db');

const Entidad = {
    crear: (nuevaEntidad, callback) => {
        const sql = 'INSERT INTO entidades SET ?';
        db.query(sql, nuevaEntidad, callback);
    },

    obtenerTodos: (callback) => {
        const sql = 'SELECT * FROM entidades';
        db.query(sql, callback);
    },

    obtenerPorNIF: (NIF, callback) => {
        const sql = 'SELECT * FROM entidades WHERE NIF = ?';
        db.query(sql, [NIF], callback);
    },

    actualizar: (NIF, datosActualizados, callback) => {
        const sql = 'UPDATE entidades SET ? WHERE NIF = ?';
        db.query(sql, [datosActualizados, NIF], callback);
    },

    eliminar: (NIF, callback) => { // Cambiado de DNI a NIF
        const sql = 'DELETE FROM entidades WHERE NIF = ?';
        db.query(sql, [NIF], callback);
    },

    eliminarVarios: (NIFs, callback) => {
        const sql = 'DELETE FROM entidades WHERE NIF IN (?)';
        db.query(sql, [NIFs], callback);
    }
    
};

module.exports = Entidad;
