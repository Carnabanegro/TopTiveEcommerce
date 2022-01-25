const express = require('express');
const {User, Role} = require("../models/");
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();
const { validateToken } = require("../utils/ValidToken");
const {sign, verify} = require('jsonwebtoken');
const {sendMail} = require("../utils/sendMail");


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
        if (userExist) return res.status(400).send( {error: "This user exists"});

        const emailExist = await User.findOne({where: {email: email} })
        if (emailExist) return res.status(400).send( {error: "This email is using for other user"});

        const roleUser = await Role.findOne({where: {name: 'User'}});
        if (!roleUser) return res.status(400).send({error: "An Error was Ocurred"})

        sendMail(username,password,email).then(() =>{
            bcrypt.hash(password, 10).then(async hash => {
                let user = {
                    name: username,
                    password: hash,
                    firstName,
                    lastName,
                    email,
                    active: 'N',
                    tel,
                    RoleId: roleUser.id
                }

                user = User.create(user).then(() => {
                    return res.status(200).send({message: 'User registered, Email confirmation has been sent'})
                }).catch(err => {
                    return res.status(400).send({error: err.errors[0].message})
                });

            })
        }).catch(err => {
            if (err.statusCode === 403) {
                return res.status(400).send({error:"Error in mail send"})
            }

        });

    } catch (err){
        res.status(404).json({
            error: err
        })
    }


})

router.post("/resendEmail", async (req,res)=>{

    const {username, mail, password} = req.body

    const userExist = await User.findOne({where: {name: username}})
    if (!userExist) return res.status(400).send( {errorMsg: "User Dont Found"});

    bcrypt.compare(password, userExist.password).then((match) => {
        if (!match){
            res.status(400).send({error: "Wrong Password"})
        }
    })

    if (userExist.email !== mail) return res.status(400).send( {error: "This mail dont correspond to this user"});

    sendMail(username,password,mail).then(() =>{
        return res.json({message:'Email confirmation has been sent'})
    }).catch(err =>{
        if (err.statusCode === 403) {
            return res.status(400).send({error:"Error in mail send"})
        }
    })

})

router.post("/activate",async (req,res)=>{
    const {token} = req.body
    if (token){
        verify(token,process.env.JWT_ACC_ACTIVATE,async function (err, decodedToken) {
            if (err) return res.status(400).json({errorMsg: "Incorrect or  Expired Link"})
            const {username} = decodedToken;
            const userUpdate = await User.update({active: 'S'}, {
                where: {
                    name: username
                },
                returning: true
            });
            return res.status(200).json({message: 'Account activated, now you can log in'})
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

        if(user.active === 'N') res.status(400).json({error: "Make email confirmation for login"})

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