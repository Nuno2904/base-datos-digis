// ususariomodel.js
const db = require('../config/db');

const Usuario =
{
    crear : (nuevoUsuario, callback) =>
    {
        const sql = 'INSERT INTO usuarios SET ?';
        db.query(sql, nuevoUsuario, callback);
    },

    borrar : (email, callback) =>
    {
        const sql = 'DELETE FROM usuarios WHERE email = ?';
        db.query(sql, [email], callback);
    },

    editar : (nombre, datosActualizados, callback) =>
    {
        const sql = 'UPDATE usuarios SET ? WHERE nombre = ?';
        db.query(sql, [datosActualizados, nombre], callback);
    },
    obtenerUsuarioPorEmail: (email, callback) => {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        db.query(sql, [email], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]); // results[0] debe contener `password`
        });
    },
    
    
}

module.exports = Usuario;