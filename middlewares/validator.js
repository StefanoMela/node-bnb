const { checkSchema, validationResult } = require("express-validator");
const deleteProfilePic = require("../utils/deleteProfilePic");

module.exports = (schema) => {
    return [
        checkSchema(schema),
        (req, res, next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                if(req.file){
                    deleteProfilePic(req.file.filename);
                }
                return res.status(400).json({errors: errors.array()})
            }
            next();
        }
    ]
}
