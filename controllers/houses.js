const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const errorHandler = require("../middlewares/errorHandler.js");
const restError = require("../utils/restError.js");
const deletePhoto = require('../utils/deletePhoto.js');
const { userId } = require('../validations/houses.js');


const index = async (req, res) => {
    try {
        // const houses = await prisma.house.findMany();
        // res.json(houses);

        res.json('sei in index delle case');
    } catch (err) {
        errorHandler(err, req, res);
    }
}


const show = async (req, res) => {
    try {
        // const house = await prisma.house.findUnique({
        //     where: { id: parseInt(req.params.id) }
        // });
        res.json('sei in show della casa con id ' + req.params.id);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

const store = async (req, res) => {
    try {
        const { title, description, pricePerDay, rooms, beds, baths, squareMeters, address } = req.body;

        const data = {
            title,
            description,
            pricePerDay,
            rooms,
            beds,
            baths,
            squareMeters,
            address,
            userId: req.user.id
        };

        if (req.file) {
            console.log('File received:', req.file);
            data.images = req.file.filename;
        }

        const house = await prisma.house.create({ data });
        res.json(house);

    } catch (err) {
        console.error('Error occurred:', err);
        if (req.file) {
            console.log('elimino foto', req.file.filename);
            deletePhoto('house_images', req.file.filename);
        }
        errorHandler(err, req, res);
    }
}

const update = async (req, res) => {
    try {
        // const house = await prisma.house.update({
        //     where: { id: parseInt(req.params.id) },
        //     data: req.body
        // });
        // res.json(house);
        res.json('sei in update della casa con id' + req.params.id);
    } catch (err) {
        errorHandler(err, req, res);
    }
}


const destroy = async (req, res) => {
    try {
        // const house = await prisma.house.delete({
        //     where: { id: parseInt(req.params.id) }
        // });
        // res.json(house);

        res.json('sei in destroy della casa con id ' + req.params.id);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}