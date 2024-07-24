const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateToken = require('../utils/generateToken'); // recupero funzione per generare token
const { hashPassword, comparePassword } = require("../utils/password.js"); // recupero funzioni hashing e controllo
const deleteProfilePic = require("../utils/deleteProfilePic.js");
const errorHandler = require("../middlewares/errorHandler.js");
const restError = require("../utils/restError.js");
require('dotenv').config();

const register = async (req, res) => {
    try {
        // destrutturo i campi che mi arriveranno
        const { name, lastName, dateOfBirth, username, email, password, avatar} = req.body;
        console.log(avatar);
        // creo l'oggetto User e hasho la password
        const data = {
            name,
            lastName,
            dateOfBirth,
            username,
            email,
            password: await hashPassword(password),
            avatar,
        }
        // controllo se c'è un file allegato e creo il path di salvataggio
        if (req.file) {
            data.img_path = `${HOST}:${port}/profile_pics/${req.file.filename}`;
        }

        // istanzio User e lo riempio con i data precedenti
        const user = await prisma.user.create({ data });

        // creo il token univoco
        const token = generateToken({
            email: user.email,
            username: user.username,
            id: user.id
        }, "1h");

        // Rimuovo campi sensibili prima di rispondere
        const { password: _, ...userData } = user;

        // restituisco json del token e dello user
        res.json({ token, data: user });

    } catch (err) {
        if (req.file) {
            deleteProfilePic(req.file.filename);
        }
        errorHandler(err, req, res);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // recupero user via email
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, username: true, email: true, password: true }
        });
        // errore nel caso in cui l'utente non sia trovato
        if (!user) {
            throw new restError('User not found', 404);
        }

        // check se PWD è valida
        const isPwdValid = await comparePassword(password, user.password);
        if (!isPwdValid) {
            throw new restError('Invalid user or password', 401);
        }

        // genero il token
        const token = generateToken({
            email: user.email,
            username: user.username,
            id: user.id
        }, '1h');

        const { password: _, ...userData } = user;

        res.json({ token, data: userData });

    } catch (err) {
        errorHandler(err, req, res);
    }
}


module.exports = {
    register,
    login
}