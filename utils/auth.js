const bcrypt = require('bcrypt');
require('dotenv').config();

const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (payload, expiresIn = '8h') => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

const hashPassword = async (password) => {
    const hashedPWD = await bcrypt.hash(password + process.env.PEPPER_KEY, 10);
    return hashedPWD
}

const comparePassword = async (password, hashPassword) => {
    const isValid = await bcrypt.compare(password + process.env.PEPPER_KEY, hashPassword);
    return isValid
};

module.exports = {
    generateToken,
    hashPassword,
    comparePassword
}