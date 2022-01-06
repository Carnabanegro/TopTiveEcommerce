const express = require('express');
const router = express.Router();
const {Product, User} = require('../models/')
const Sequelize = require('sequelize');
const validator = require("sequelize");

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
    const listOfProducts = await Product.findAndCountAll({where: (fname && fvalue && {[fname]:{[Sequelize.Op.like]: fvalue}}), offset: offset, limit:limit});
    console.log(listOfProducts);
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


router.post("/add", async (req,res) =>{
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
        UserId: user.id
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