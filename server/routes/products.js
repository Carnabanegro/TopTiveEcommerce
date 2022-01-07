const express = require('express');
const router = express.Router();
const {Product, User} = require('../models/')
const Sequelize = require('sequelize');
const {validateToken} = require("../utils/ValidToken");

const getPagination = (page, size) => {
    const limit = size ? size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

router.get("/", async (req,res) =>{

    const page = Number.parseInt(req.query.current);
    const fname = req.query.fname;
    const fvalue = req.query.fvalue;
    const {limit,offset} = getPagination(page,10);
    const query = {where:
            ((req.query.userId && {UserId:{[Sequelize.Op.not]: req.query.userId}}) ||(fname && fvalue && {[fname]:{[Sequelize.Op.like]: fvalue}})), offset: offset, limit:limit, }
    if (req.query.userId) {
        query.include = [{model: User, attributes: ['fullName', 'email', 'tel']}];
    }
    const listOfProducts = await Product.findAndCountAll(query);
    res.json({
        result: listOfProducts.rows,
        size: limit,
        total: listOfProducts.count,
        page: page
    });
});

router.get("/myProducts", async (req,res) =>{

    const page = Number.parseInt(req.query.current);
    const fname = req.query.fname;
    const fvalue = req.query.fvalue;
    const {limit,offset} = getPagination(page,10);

    const query = {where:
            ((req.query.userId && {UserId:{[Sequelize.Op.like]: req.query.userId}, active:{[Sequelize.Op.like]: "S"}})
                ||(fname && fvalue && {[fname]:{[Sequelize.Op.like]: fvalue}})), offset: offset, limit:limit, }

    if (req.query.userId) {
        query.include = [{model: User, attributes: ['fullName', 'email', 'tel']}];
    }
    const listOfProducts = await Product.findAndCountAll(query);
    res.json({
        result: listOfProducts.rows,
        size: limit,
        total: listOfProducts.count,
        page: page
    });
});


router.get("/:id", async (req,res) =>{
    const product = await User.findByPk(req.params.id);
    res.json(product);
})


router.post("/add",validateToken, async (req,res) =>{
    const {name,currency,value,descrip,username} = req.body
    const user = await User.findOne({where: {name: username}})
    if (!user){
        res.json({error:"THIS USER DOESN'T EXISTS"})
    }
    let product = {
        name: name,
        currency: currency,
        value: Number.parseInt(value),
        descrip: descrip,
        UserId: user.id,
        active: 'S'
    }
    product = await Product.create(product);
    res.json({
        result: product,
        size: 1,
        total: 1,
        page: 0
    })
});


module.exports = router;