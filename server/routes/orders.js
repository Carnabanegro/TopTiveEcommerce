const express = require('express');
const {Order, User, Product} = require("../models/");
const Sequelize = require("sequelize");
const {validateToken} = require("../utils/ValidToken");
const router = express.Router();


const getPagination = (page, size) => {
    const limit = size ? size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

router.get("/",validateToken, async (req,res) =>{
    const page = Number.parseInt(req.query.current);
    const fname = req.query.fname;
    const fvalue = req.query.fvalue;
    const {limit,offset} = getPagination(page,10);
    const query = {where:
            ((req.query.userId && {UserId: {[Sequelize.Op.like]: userId}}) ||(fname && fvalue && {[fname]:{[Sequelize.Op.like]: fvalue}})), offset: offset, limit:limit, }
    if (req.query.userId) {
        query.include = [{model: User, attributes: ['fullName', 'email', 'tel']}];
    }
    const listOfOrders = await Order.findAndCountAll(query)
    res.json({
        result: listOfOrders.rows,
        size: limit,
        total: listOfOrders.count,
        page: page
    });
})


router.get("/:id",validateToken, async (req,res) =>{
    const order = await Order.findByPk(req.params.id);
    res.json(order);
})


router.post("/add",validateToken, async (req,res) =>{
    const {currency,value,username,productName} = req.body
    const user = await User.findOne({where: {name: username}});
    const product = await Product.findOne({where: {name: productName}});
    if (!user || !product){
        res.json({error:"ERROR, DATA INCONSISTENCY"})
    }
    product.active = 'S'
    const productSell = await  Product.update(product)
    let order = {
        currency,
        value: Number.parseInt(value),
        UserId: user.id,
        ProductId: productSell.id,
    }

    order = await Order.create(order);
    res.json({
        result: order,
        size: 1,
        total: 1,
        page: 0
    })
})


module.exports = router;