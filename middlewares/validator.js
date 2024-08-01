const { checkSchema, validationResult } = require("express-validator");
const deletePhoto = require("../utils/deletePhoto");

module.exports = (schema) => {
    return [
        checkSchema(schema),
        (req, res, next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                if(req.file){
                    const picFolder = req.originalUrl.includes('auth') ? 'avatars' : 'house_images';
                    deletePhoto(picFolder, req.file.filename);
                }
                return res.status(400).json({errors: errors.array()})
            }
            next();
        }
    ]
}