const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const errorHandler = require("../middlewares/errorHandler.js");
const restError = require("../utils/restError.js");


const index = async (req, res) => {
    try {
        // const houses = await prisma.house.findMany();
        console.log(req);
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
        // const house = await prisma.house.create({
        //     data: req.body
        // });
        console.log(req.body);
        res.json('sei in store della casa ' + req.body.title);
    } catch (err) {
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