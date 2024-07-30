const multer = require('multer');
const path = require('path');

// Configura multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath;
        if (req.originalUrl.includes('auth') || req.originalUrl.includes('register')) {
            uploadPath = path.join(__dirname, '../public/avatars');
        } else {
            uploadPath = path.join(__dirname, '../public/house_images');
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploader = multer({ storage: storage });

module.exports = uploader;
