const express  = require('express');
const router = express.Router();
const houseController = require('../controllers/houses.js');

const validator = require('../middlewares/validator');
const houseValidations = require('../validations/houses.js');

const authProcedure = require("../middlewares/auth.js");
const uploader = require('../utils/uploader.js');

router.use(authProcedure)

router.get('/', houseController.index)

router.post('/', uploader.single("images"), validator(houseValidations), houseController.store)

router.get('/:id', houseController.show)

router.put('/:id', uploader.array("images"), houseController.update)

router.delete('/:id', houseController.destroy)

module.exports = router;