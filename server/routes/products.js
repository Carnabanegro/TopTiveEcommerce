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

    try{
        const page = Number.parseInt(req.query.current);
        const {limit,offset} = getPagination(page,10);
        const {fname,fvalue,userId} = req.query;
        let where = {};
        if (fvalue && fname) where.fname = {[Sequelize.Op.like]: fvalue};
        if (userId) where.userId = {[Sequelize.Op.not]: userId};
        let search ;
        where.active = {[Sequelize.Op.like]: "S"}
        let listOfProducts;
        if(!userId){
            search = {where,offset: offset, limit: limit}
        }else {
            search =  {where,offset: offset, limit: limit,include: {model: User, as: 'User', attributes: ['firstName','lastName', 'email', 'tel']}}

        }
        listOfProducts = await Product.findAndCountAll(search);
        if(listOfProducts.count === 0){
            res.status(200).send( {error: "Products Not Found"});
        }else{
            res.json({
                result: listOfProducts.rows,
                size: limit,
                total: listOfProducts.count,
                page: page
            });
        }
    }catch (err){
        res.status(404).json({
            error: err
        })
    }


});

router.get("/myProducts", async (req,res) =>{

    try{
        const page = Number.parseInt(req.query.current);
        const {fname,fvalue,userId} = req.query;
        const {limit,offset} = getPagination(page,10);
        let where = {};
        if (fvalue && fname) where.fname = {[Sequelize.Op.like]: fvalue};
        if (userId) where.userId = {[Sequelize.Op.like]: userId};
        let search ;
        where.active = {[Sequelize.Op.like]: "S"}
        let listOfProducts;
        if(!userId){
            search = {where,offset: offset, limit: limit}
        }else {
            search =  {where,offset: offset, limit: limit,include: {model: User, as: 'User', attributes: ['firstName','lastName', 'email', 'tel']}}
        }
        listOfProducts = await Product.findAndCountAll(search);
        if (listOfProducts.count === 0){
            res.status(200).send( {error: "Products Not Found"});
        }else{
            res.json({
                result: listOfProducts.rows,
                size: limit,
                total: listOfProducts.count,
                page: page
            });
        }
    }catch (err){
        res.status(404).json({
            error: err
        })
    }

});


router.get("/:id", async (req,res) =>{
    const product = await User.findByPk(req.params.id);
    if (!product){
        res.status(200).send( {error: "Product Doesn't exists"});
    }else{
        res.json(product);
    }
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