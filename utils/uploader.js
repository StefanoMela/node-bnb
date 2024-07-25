const multer = require('multer');
const path = require('path');

// Configura multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/avatars'); // Usa path relativo corretto
        console.log('Upload path:', uploadPath);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const uploader = multer({ storage: storage });

module.exports = uploader;