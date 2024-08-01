const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const errorHandler = require("../middlewares/errorHandler.js");
const restError = require("../utils/restError.js");
const deletePhoto = require('../utils/deletePhoto.js');


const index = async (req, res) => {
    try {
        const houses = await prisma.house.findMany(
            { include: { images: true },
            }
        );
        res.json({
            data: houses,
            images: houses.images
        });
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

        console.log(req.body);
        console.log(req.files);

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

        if (req.files) {
            console.log('File received:', req.files);
            data.images = req.files.filename;
        }

        const house = await prisma.house.create({ data });
        res.json(house);

    } catch (err) {
        console.error('Error occurred:', err);
        if (req.files) {
            deletePhoto(`house_images/${req.user.id}/house_${req.body.title}`, req.files.filename);
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