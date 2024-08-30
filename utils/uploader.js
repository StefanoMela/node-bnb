const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configura multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath;
        if (req.originalUrl.includes('register')) {
            const userDir = path.join(__dirname, `../public/avatars/${req.body.username}/`);
            if (!fs.existsSync(userDir)) {
                fs.mkdirSync(userDir, { recursive: true });
            }
            uploadPath = userDir;
        } else {
            //            Crea la directory per l'utente e la casa se non esiste
            const userDir = path.join(__dirname, `../public/house_images/${req.user.id}`);
            const houseDir = path.join(userDir, `${req.body.title}`).replace(/\s+/g, "_");
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