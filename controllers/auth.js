const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken, hashPassword, comparePassword } = require("../utils/auth.js"); // recupero funzioni token hashing e controllo
const deletePhoto = require("../utils/deletePhoto.js");
const errorHandler = require("../middlewares/errorHandler.js");
const restError = require("../utils/restError.js");

const register = async (req, res) => {
    try {

        // Destrutturo i campi che mi arriveranno
        const { name, lastName, dateOfBirth, username, email, password } = req.body;

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
            if(!req.file.originalname.includes('png') && !req.file.originalname.includes('jpg') && !req.file.originalname.includes('jpeg')){
                throw new restError('Invalid avatar file format. Allowed formats: jpeg, png, gif', 400);
            }
            data.avatar = req.file.filename;
        }

        // Crea l'utente nel database
        const user = await prisma.user.create({ data });

        // Crea il token univoco
        const token = generateToken({
            email: user.email,
            username: user.username,
            id: user.id
        }, "1h");

        // Rimuovi campi sensibili dalla risposta
        const userData = { ...user };
        delete userData.password;

        // Rispondi con il token e i dati dell'utente
        res.json({ token, user: userData });

    } catch (err) {
        console.error('Error occurred:', err);
        if (req.file) {
            deletePhoto('avatars', req.file.filename);
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