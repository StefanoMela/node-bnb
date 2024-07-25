const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken, hashPassword, comparePassword } = require("../utils/auth.js"); // recupero funzioni token hashing e controllo
const deleteProfilePic = require("../utils/deleteProfilePic.js");
const errorHandler = require("../middlewares/errorHandler.js");
const restError = require("../utils/restError.js");
require('dotenv').config();
const {PORT, HOST} = process.env;
const port = PORT || 3000;

const register = async (req, res) => {
    try {
        // Destruttura i campi che mi arriveranno
        const { name, lastName, dateOfBirth, username, email, password } = req.body;
        // Controllo che i campi siano tutti presenti
        if (!name || !lastName || !dateOfBirth || !username || !email || !password) {
            throw new restError('Missing fields', 400);
        }

        // Hash della password
        const hashedPassword = await hashPassword(password);

        // Crea l'oggetto User
        const data = {
            name,
            lastName,
            dateOfBirth,
            username,
            email,
            password: hashedPassword,
        };

        // Aggiungi il percorso dell'immagine se presente
        if (req.file) {
            console.log('File received:', req.file);
            req.file.destination = `${HOST}:${port}/avatars/${data.username}/${req.file.filename}`;
        } else {
            throw new restError('Missing profile picture', 400);
        }

        // Crea l'utente nel database
        const user = await prisma.user.create({ data });

        // Crea il token univoco
        const token = generateToken({
            email: user.email,
            username: user.username,
            id: user.id
        }, "1h");

        // Rimuovi campi sensibili
        delete user.id;
        delete user.password;

        // Rispondi con il token e i dati dell'utente
        res.json({ token, user });

    } catch (err) {
        console.error('Error occurred:', err);
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