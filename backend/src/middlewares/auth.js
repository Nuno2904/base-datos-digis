// src/middlewares/auth.js
const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ mensaje: 'Token no válido' });
        }

        req.user = user; // Adjunta los datos del usuario al objeto req
        next();
    });
};

module.exports = verificarToken;
