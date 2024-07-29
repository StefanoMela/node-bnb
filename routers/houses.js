const express  = require('express');
const router = express.Router();
const houseController = require('../controllers/houses.js');

const authProcedure = require("../middlewares/auth.js");
const uploader = require('../utils/uploader.js');

router.use(authProcedure)

router.get('/', houseController.index)

router.post('/', uploader.array("images"), houseController.store)

router.get('/:id', houseController.show)

router.put('/:id', houseController.update)

router.delete('/:id', houseController.destroy)

module.exports = router