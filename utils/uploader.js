const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configura multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath;
        if (req.originalUrl.includes('auth') || req.originalUrl.includes('register')) {
            uploadPath = path.join(__dirname, '../public/avatars');
        } else {
            // Crea la directory per l'utente e la casa se non esiste
            const userDir = path.join(__dirname, `../public/house_images/${req.user.id}`);
            const houseDir = path.join(userDir, `house_${req.body.houseId}`);
            if (!fs.existsSync(houseDir)) {
                fs.mkdirSync(houseDir, { recursive: true });
            }
            uploadPath = houseDir;
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploader = multer({ storage: storage });

module.exports = uploader;
