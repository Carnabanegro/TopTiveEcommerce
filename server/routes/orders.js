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

router.get("/",async (req,res) =>{
    try{
        const userId = req.query.userId
        const page = Number.parseInt(req.query.current);
        const fname = req.query.fname;
        const fvalue = req.query.fvalue;
        const {limit,offset} = getPagination(page,10);
        const query = {where:
                ((userId && {UserId: {[Sequelize.Op.eq]: userId}}) ||(fname && fvalue && {[fname]:{[Sequelize.Op.like]: fvalue}})), offset: offset, limit:limit }

        if (req.query.userId) {
            query.include = [{model: User, attributes: ['firstName','lastName', 'email', 'tel']}];
        }
        const listOfOrders = await Order.findAndCountAll(query)
        console.log(listOfOrders)
        if (listOfOrders.count === 0){
            res.status(200).send( {error: "Orders Not Found"});
        }else{
            res.status(200).json({
                result: listOfOrders.rows,
                size: limit,
                total: listOfOrders.count,
                page: page
            });
        }

    }catch (err){
        res.status(404).json({
            error: err
        })
    }

})


router.get("/:id",validateToken, async (req,res) =>{
    const order = await Order.findByPk(req.params.id);
    res.json(order);
})


router.post("/add",validateToken, async (req,res) =>{

    try {
        const {currency,value,username,productName} = req.body
        const user = await User.findOne({where: {name: username}});
        let product = await Product.findOne({where: {name: productName}});
        if (!user || !product){
            res.json({error: "ERROR, DATA INCONSISTENCY"})
        }

        const inactive = { active: 'N' };
        const result = await Product.update(inactive, {
            where: {
                id: product.id,
            },
            returning: true,
        });
        let order = {
            currency,
            value: Number.parseInt(value),
            UserId: user.id,
            ProductId: result.id,
        }
        order = await Order.create(order);
        res.json({
            result: order,
            size: 1,
            total: 1,
            page: 0
        })




    }catch (err){

    }

})


module.exports = router;