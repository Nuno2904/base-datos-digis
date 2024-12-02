const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const { uploadData } = require('../controllers/dataUploadController');

// Ruta para subir y procesar el archivo
router.post('/', upload.single('file'), uploadData);

module.exports = router;
