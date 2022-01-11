const express = require('express');
const {Order, User, Product,Role} = require("../models/");
const Sequelize = require("sequelize");
const {validateToken} = require("../utils/ValidToken");
const router = express.Router();



const getPagination = (page, size) => {
    const limit = size ? size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

router.get("/",validateToken,async (req,res) =>{
    try{
        console.log(req);
        const {userId,fname,fvalue} = req.query;
        const page = Number.parseInt(req.query.current);
        const {limit,offset} = getPagination(page,10);
        let query;
        query = {where:
                    ((userId && {UserId: {[Sequelize.Op.eq]: userId}}) ||(fname && fvalue && {[fname]:{[Sequelize.Op.like]: fvalue}})), offset: offset, limit:limit }
        query.include = [{model: Product, as: 'Product', attributes: ['name','currency', 'value', 'descrip'],include: [{model:User,as: 'User',attributes: ['name','firstName','lastName', 'email', 'tel']}]}];
        const listOfOrders = await Order.findAndCountAll(query)
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

router.get("/totalLiquidation",validateToken,async(req,res)=>{
    const {fname,fvalue,userId} = req.query;
    const page = Number.parseInt(req.query.current);
    const {limit,offset} = getPagination(page,10);
    try{
        const user = await User.findByPk(userId);
        if (!user)   res.status(200).send( {error: "User error"});
        const role = await Role.findByPk(user.RoleId);
        if(role.name !== "Admin")  res.status(200).send( {error: "The user must be Admin Role"});

        let where = {}
        if (fname && fvalue) where.fname = {[Sequelize.Op.like]: fvalue};
        let search = {where,offset: offset, limit:limit}
        search.include = [{model: User, attributes: ['name','firstName','lastName', 'email', 'tel']}];
        const liquidationUsd = await Order.sum("value",{where: {currency: {[Sequelize.Op.like]: "usd$"}}})
        const liquidation$ = await Order.sum("value",{where: {currency: {[Sequelize.Op.like]: "$"}}})
        const liquidation = liquidationUsd + (liquidation$/200);
        const listOfOrders = await Order.findAndCountAll(search)
        if (listOfOrders.count === 0){
            res.status(200).send( {error: "Orders Not Found"});
        }else{
            res.status(200).json({
                result: listOfOrders.rows,
                size: limit,
                total: listOfOrders.count,
                page: page,
                liquidation: liquidation
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
        const {id,username} = req.body
        const user = await User.findOne({where: {name: username}});
        let product = await Product.findByPk(id);
        if (!user || !product){
            return res.json({error: "ERROR, DATA INCONSISTENCY"})
        }
        if(product.active === 'N'){
            return res.status(200).send({error: "product not available"})
        }
        const inactive = { active: 'N' };
        const result = await Product.update(inactive, {
            where: {
                id: product.id,
            },
            returning: true,
        });
        console.log(result)
        let order = {
            currency: product.currency,
            value: Number.parseInt(product.value),
            UserId: user.id,
            ProductId: product.id,
        }
        order = await Order.create(order);
        res.json({
            result: order,
            size: 1,
            total: 1,
            page: 0
        })
    }catch (err){
        res.status(404).json({
            error: err
        })
    }
})


module.exports = router;