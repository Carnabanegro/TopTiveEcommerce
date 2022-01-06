const express = require('express');
const {Role} = require("../models/");
const router = express.Router();

router.get("/", async (req,res) =>{
    const listOfRoles = await Role.findAll();
    res.json(listOfRoles);
})
router.get("/:id", async (req,res) =>{
    const role = await Role.findByPk(req.params.id);
    res.json(role);
})
router.post("/add", async (req,res) =>{
    const role = req.body
    await Role.create(role);
    res.json(role)
})


module.exports = router;