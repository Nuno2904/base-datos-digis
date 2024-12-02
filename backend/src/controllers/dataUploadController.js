const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Importar modelos individuales
const Empresas = require('../models/empresasModel');
const Entidades = require('../models/entidadesModel');
const Contactos = require('../models/contactosModel');
const Comentarios = require('../models/comentariosModel');

exports.uploadData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ mensaje: 'No se ha subido ningún archivo' });
    }
    console.log(req.file);
    const filePath = path.join(__dirname, '../../uploads', req.file.filename);
    const fileName = req.file.originalname.toLowerCase();
    const data = [];

    // Leer el archivo CSV
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Mantener las claves en mayúsculas tal como están en el archivo CSV
        data.push(row);
      })
      .on('end', async () => {
        try {
          if (fileName.includes('empresas')) {
            // Insertar datos en la tabla `empresas`
            for (const record of data) {
              await Empresas.crear({
                NIF: record.NIF,
                Nombre: record.Nombre,
                Direccion: record.Direccion,
                Sector: record.Sector,
                Tamano: record.Tamano,
                Telefono: record.Telefono,
                Web: record.Web,
                Correo: record.Correo,
                Valoracion_Contacto: parseInt(record.Valoracion_Contacto, 10),
                Posibilidad_Acuerdo: record.Posibilidad_Acuerdo === 'true',
              });
            }
          } else if (fileName.includes('entidades')) {
            // Insertar datos en la tabla `entidades`
            for (const record of data) {
              await Entidades.crear({
                NIF: record.NIF,
                Nombre: record.Nombre,
                Tipo: record.Tipo,
                Direccion: record.Direccion,
                Sector: record.Sector,
                Telefono: record.Telefono,
                Web: record.Web,
                Correo: record.Correo,
                Valoracion_Contacto: parseInt(record.Valoracion_Contacto, 10),
                Posibilidad_Acuerdo: record.Posibilidad_Acuerdo === 'true',
              });
            }
          } else if (fileName.includes('clientes')) {
              for (const record of data) {
                let diasSigContacto = parseInt(record.Dias_SigContacto, 10);
                if (isNaN(diasSigContacto)) {
                  console.error(
                    `Error: El valor de Dias_SigContacto no es un número válido para el registro ${record.DNI}. Se usará 0 como valor por defecto.`
                  );
                  diasSigContacto = 0; 
                }
                await Contactos.crear({
                  DNI: record.DNI,
                  NIF_entidad: record.NIF_entidad,
                  NIF_empresa: record.NIF_empresa,
                  Nombre_Empresa: record.Nombre_Empresa,
                  Nombre: record.Nombre,
                  Apellido1: record.Apellido1,
                  Apellido2: record.Apellido2,
                  Email: record.Email,
                  Fecha_Contacto: record.Fecha_Contacto,
                  Fecha_SigContacto: record.Fecha_SigContacto,
                  Fecha_Fin: record.Fecha_Fin,
                  Dias_SigContacto: diasSigContacto,
                  Estado: record.Estado,
                  Origen: record.Origen,
                  Docs: record.Docs,
                });

          
                for (let i = 1; i <= 5; i++) {
               
                  const comentario = record[`Comentarios contacto ${i}`];
                  const fecha = record[`Fecha contacto ${i} (DD/MM/AA)`];

                 
                  if (comentario && fecha) {
                    await Comentarios.crear({
                      DNI: record.DNI, 
                      Comentario: comentario,
                      Fecha: fecha,
                      Nombre_Cliente: record.Nombre,
                    });
                  } else {
                    console.warn(
                      `Aviso: Registro ${record.DNI} no tiene datos válidos para Comentarios contacto ${i} o Fecha contacto ${i}.`
                    );
                    break; 
                  }
                }
              }

            
          } else {
            return res.status(400).json({
              mensaje: 'El nombre del archivo no corresponde a ninguna tabla válida.',
            });
          }

          // Respuesta de éxito
          res.status(200).json({
            mensaje: `Datos de ${fileName} procesados y almacenados correctamente.`,
          });

          fs.unlinkSync(filePath); // Elimina el archivo después de procesarlo
        } catch (error) {
          console.error('Error al guardar los datos en la base de datos:', error);
          res.status(500).json({ mensaje: 'Error al guardar en la base de datos' });
        }
      });
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    res.status(500).json({ mensaje: 'Error al procesar el archivo' });
  }
};

