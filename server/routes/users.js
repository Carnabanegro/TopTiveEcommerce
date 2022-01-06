const express = require('express');
const {User, Role} = require("../models/");
const router = express.Router();
const bcrypt = require('bcrypt');

const {sign} = require('jsonwebtoken');
const {where} = require("sequelize");

router.get("/", async (req, res) => {
    const listOfUsers = await User.findAll();
    res.json(listOfUsers);
})
router.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
})
router.post("/add", async (req, res) => {
    const {username, email, password, fullName, tel} = req.body
    const userExist = await User.findOne({where: {name: username}})
    if (userExist) {
        res.json({error: "THIS USER EXIST"})
    } else {
        const roleUser = await Role.findOne({where: {name: 'User'}});
        if (!roleUser) {
            res.json({error: "THIS USER EXIST"})
        }
        const axios = require('axios');
        axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=a0cce05bb5454150970335e61eb6644b&email=${email}`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        bcrypt.hash(password, 10).then(hash => {
            let user = {
                name: username,
                password: hash,
                fullName,
                email,
                tel,
                RoleId: roleUser.id
            }
            user = User.create(user);
            res.json({user})
        });
    }

})

router.post("/update/:id", async (req, res) => {
    const user = req.body
    const userExist = await User.findByPk(req.params.id)
    if (!userExist) {
        res.json({error: "THIS USER DOESN'T EXISTS"})
    } else {
        bcrypt.hash(user.password, 10).then(hash => {
            user.password = hash;
            User.update(user);
            res.json("SUCCESS")
        });
    }

})

router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({where: {name: username}})
    if (!user) res.json({error: "USER NOT FOUND"})
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({error: "WRONG USERNAME AND PASSWORD COMBINATION"})
        const accessToken = sign({username: user.name, id: user.id}, "importantsecret")
        res.json(accessToken);
    })
})


module.exports = router;