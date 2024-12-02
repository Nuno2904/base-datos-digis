//multerConfig.js
const multer = require('multer');
const storage =multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({storage: storage,

    fileFilter:(req, file, cb) => {
        if(file.mimetype !== 'text/csv'){
            return cb(new Error('Solo se permiten archivos csv'))
        }
        cb(null, true);
    },    
});

module.exports = upload;
