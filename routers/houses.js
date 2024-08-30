const express  = require('express');
const router = express.Router();
const houseController = require('../controllers/houses.js');

const validator = require('../middlewares/validator');
const housePostValidations = require('../validations/house_post.js');
const houseUpdateValidations = require('../validations/house_update.js');

const authProcedure = require("../middlewares/auth.js");
const uploader = require('../utils/uploader.js');

router.get('/:id', houseController.show)

router.use(authProcedure)

router.get('/', houseController.index)

router.post('/', uploader.array("images"), validator(housePostValidations), houseController.store)

router.put('/:id', uploader.array("images"), validator(houseUpdateValidations), houseController.update)

router.delete('/:id', houseController.destroy)

module.exports = router;