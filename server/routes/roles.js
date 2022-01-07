const express = require('express');
const {Role} = require("../models/");
const {validateToken} = require("../utils/ValidToken");
const router = express.Router();

router.get("/",validateToken, async (req,res) =>{
    const listOfRoles = await Role.findAll();
    res.json(listOfRoles);
})
router.get("/:id",validateToken, async (req,res) =>{
    const role = await Role.findByPk(req.params.id);
    res.json(role);
})
router.post("/add",validateToken, async (req,res) =>{
    const role = req.body
    await Role.create(role);
    res.json(role)
})


module.exports = router;