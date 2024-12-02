const Usuario = require('../models/usuariosModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

    const { password, nombre, email, rol } = req.body;

    // buscar si el usuario ya existe
    Usuario.obtenerUsuarioPorEmail(email, async (err, usuarioExistente) => {
        if (err) {
            console.error('Error al obtener usuario:', err);
            return res.status(500).json({ mensaje: 'Error en el servidor', error: err.message });
        }

        if (usuarioExistente) {
            console.log('Usuario ya existe');
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        try {
            // Cifrar la contraseña
            const salt = await bcrypt.genSalt(10);
            const passwordCifrada = await bcrypt.hash(password, salt);

            // Guardar el usuario en la base de datos
            Usuario.crear({ email, password: passwordCifrada, nombre, rol }, (err, result) => {
                if (err) {
                    return res.status(500).json({ mensaje: 'Error al crear usuario', error: err.message });
                }

                // Generar el token JWT
                const payload = { id: result.insertId };
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json({ mensaje: 'Usuario creado con éxito', token });
            });
        } catch (error) {
            return res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
        }
    });
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Inicio de sesión con email:', email); 

        // Verificar si el usuario existe
        Usuario.obtenerUsuarioPorEmail(email, (err, Usuario) => {
            if (err) {
                console.error('Error al obtener usuario:', err);
                return res.status(500).json({ mensaje: 'Error en el servidor', error: err.message });
            }

            if (!Usuario) {
                console.log('Usuario no encontrado');
                return res.status(400).json({ mensaje: 'El usuario no existe' });
            }

            // Verificar la contraseña
            bcrypt.compare(password, Usuario.password, (err, isMatch) => {
                if (err) {
                    console.error('Error al comparar contraseñas:', err);
                    return res.status(500).json({ mensaje: 'Error en el servidor', error: err.message });
                }

                if (!isMatch) {
                    console.log('Contraseña incorrecta');
                    return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
                }

                // Generar el token JWT
                const payload = { id: Usuario.id };
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

                console.log('Token generado exitosamente');
                res.json({ mensaje: 'Inicio de sesión exitoso', token });
            });
        });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
   
};


// Borrar un usuario
exports.borrarUsuario = (req, res) => {
    const email = req.params.email;

    Usuario.borrar(email, (err, result) => {
    if (err) return res.status(500).json({ mensaje: 'Error al borrar usuario', error: err.message });
    
    if (result.affectedRows === 0) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado o ya eliminado' });
    }

    res.status(200).json({ mensaje: `Usuario con email: ${email} eliminado` });
});
};

// Editar un usuario
exports.editarUsuario = (req, res) => {
    const email = req.params.email;
    const datosActualizados = req.body;

    Usuario.editar(email, datosActualizados, (err, result) => {
        if (err) return res.status(500).json({ mensaje: 'Error al editar usuario', error: err.message });
        res.status(200).json({ mensaje: `Usuario con email: ${email} actualizado` });
    });
};

// Obtener todos los usuarios
exports.obtenerUsuarios = (req, res) => {
    Usuario.obtenerTodos((err, usuarios) => {
        if (err) return res.status(500).json({ mensaje: 'Error al obtener usuarios', error: err.message });
        res.status(200).json(usuarios);
    });
};

// Obtener un usuario por email
exports.obtenerUsuarioPorEmail = (req, res) => {
    const email = req.params.email;

    Usuario.obtenerUsuarioPorEmail(email, (err, usuario) => {
        if (err) return res.status(500).json({ mensaje: 'Error al obtener usuario', error: err.message });
        res.status(200).json(usuario);
    });
};
