// src/middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        mensaje: 'Error del servidor',
        error: err.message
    });
};

module.exports = errorHandler;
