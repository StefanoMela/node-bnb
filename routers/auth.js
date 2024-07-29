const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.js');

const validator = require('../middlewares/validator');
const { registerData, loginData } = require('../validations/users.js');

const uploader = require("../utils/uploader.js");

router.post('/register', uploader.single("avatar"), validator(registerData), authController.register)
router.post('/login',  uploader.none(), validator(loginData), authController.login)

module.exports = router;