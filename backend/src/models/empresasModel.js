// model de empreas:
const db = require('../config/db');

const Empresa ={
    crear: (nuevaEmpresa, callback) => 
    {
        const sql = 'INSERT INTO empresas SET ?';
        db.query(sql, nuevaEmpresa, callback);
    },

    obtenerTodos: (callback) => 
    {
        const sql = 'SELECT * FROM empresas';
        db.query(sql, callback);
    },

    obtenerPorNIF: (NIF, callback) => 
    {
        const sql = 'SELECT * FROM empresas WHERE NIF = ?';
        db.query(sql, [NIF], callback);
    },

    actualizar: (NIF, datosActualizados, callback) => 
    {
        const sql = 'UPDATE empresas SET ? WHERE NIF = ?';
        db.query(sql, [datosActualizados, NIF], callback);
    },

    eliminar: (NIF, callback) => 
    {
        const sql = 'DELETE FROM empresas WHERE NIF = ?';
        db.query(sql, [NIF], callback);
    },

    eliminarVarios: (NIFs, callback) =>
    {
        const sql = 'DELETE FROM empresas WHERE NIF IN (?)';
        db.query(sql, [NIFs], callback);
    }
    
};
module.exports = Empresa;
