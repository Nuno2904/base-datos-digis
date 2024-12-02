//comentariosModel.js
const e = require('express');
const db = require('../config/db');


const Comentario = 
{
    crear: (nuevoComentario, callback) => {
        const sql = 'INSERT INTO comentarios SET ?';
        db.query(sql, nuevoComentario, callback);
    },

    obtenerPorDNI: (DNI, callback) => {
        const sql = 'SELECT * FROM comentarios WHERE DNI = ?';
        db.query(sql, [DNI], callback);
    },
    obtenerPorNombre: (Nombre_Cliente, callback) => {
        const sql = 'SELECT * FROM comentarios WHERE Nombre_Cliente= ?';
        db.query(sql, [Nombre_Cliente], callback);
    },

    actualizar: (DNI, datosActualizados, callback) => {
        const sql = 'UPDATE comentarios SET ? WHERE DNI = ?';
        db.query(sql, [datosActualizados, DNI], callback);
    },
    
    actualizarPorNombre: (Nombre_Cliente, datosActualizados, callback) => {
        const sql = 'UPDATE comentarios SET ? WHERE Nombre_Cliente = ?';
        db.query(sql, [datosActualizados, Nombre_Cliente], callback);
    },

    eliminarPorDNI: (DNI, callback) => {
        const sql = 'DELETE FROM comentarios WHERE DNI = ?';
        db.query(sql, [DNI], callback);
    },

    eliminarPorNombre: (Nombre_Cliente, callback) => {
        const sql = 'DELETE FROM comentarios WHERE Nombre_Cliente = ?';
        db.query(sql, [Nombre_Cliente], callback);
    }
}
module.exports = Comentario;