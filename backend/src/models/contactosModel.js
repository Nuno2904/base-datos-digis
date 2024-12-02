// src/models/contactosModel.js
const db = require('../config/db');

const Contacto = {
    crear: (nuevoContacto, callback) => {
        const sql = 'INSERT INTO clientes SET ?';
        db.query(sql, nuevoContacto, callback);
    },

    obtenerTodos: (callback) => {
        const sql = 'SELECT * FROM clientes';
        db.query(sql, callback);
    },

    obtenerPorDNI: (DNI, callback) => {
        const sql = 'SELECT * FROM clientes WHERE DNI = ?';
        db.query(sql, [DNI], callback);
    },

    obtenerPorNombre: (nombre, callback) => {
        const sql = 'SELECT * FROM clientes WHERE Nombre = ?';
        db.query(sql, [nombre], callback);
    },

    actualizar: (DNI, datosActualizados, callback) => {
        const sql = 'UPDATE clientes SET ? WHERE DNI = ?';
        db.query(sql, [datosActualizados, DNI], callback);
    },

    eliminar: (DNI, callback) => {
        const sql = 'DELETE FROM clientes WHERE DNI = ?';
        db.query(sql, [DNI], callback);
    },

    // **Nueva función para eliminar múltiples contactos**
    eliminarVarios: (DNIs, callback) => {
        // Usamos IN para eliminar todos los registros con un DNI en el arreglo DNIs
        const sql = 'DELETE FROM clientes WHERE DNI IN (?)';
        db.query(sql, [DNIs], callback);
    }
};

module.exports = Contacto;
