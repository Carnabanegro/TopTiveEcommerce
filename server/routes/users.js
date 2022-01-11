const express = require('express');
const {User, Role} = require("../models/");
const router = express.Router();
const bcrypt = require('bcrypt');
const { validateToken } = require("../utils/ValidToken");
const {sign} = require('jsonwebtoken');

router.get("/", async (req, res) => {
    const listOfUsers = await User.findAll();
    res.json(listOfUsers);
})
router.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
})
router.post("/add", async (req, res) => {
    try{
        const {username, email, password, firstName,lastName, tel} = req.body
        const userExist = await User.findOne({where: {name: username}})
        if (userExist) {
            return res.status(200).send( {error: "This user exists"});
        } else {
            const roleUser = await Role.findOne({where: {name: 'User'}});
            if (!roleUser) {
                return res.json({error: "THIS USER EXIST"})
            }
            bcrypt.hash(password, 10).then(hash => {
                let user = {
                    name: username,
                    password: hash,
                    firstName,
                    lastName,
                    email,
                    tel,
                    RoleId: roleUser.id
                }
                user = User.create(user);
                return res.json({user})
            })
        }
    }catch (err){
        res.status(404).json({
            error: err
        })
    }


})

router.post("/update/:id",validateToken,async (req, res) => {
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

    try{
        const {username, password} = req.body;

        const user = await User.findOne({where: {name: username}})
        if (!user) res.status(200).send({error: "wrong combination of password username"})

        const role = await Role.findOne({where:{id: user.RoleId}})

        bcrypt.compare(password, user.password).then((match) => {
            if (!match){
                res.status(200).send({error: "wrong combination of password username"})
            }else{
                const accessToken = sign({username: user.name, id: user.id, role: role.name}, "importantsecret")
                res.json({token: accessToken});
            }
        })
    }catch (err){
        res.status(404).send({error: err})
    }
})


module.exports = router;