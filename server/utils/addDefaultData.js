const {Role,User} = require("../models/");
const bcrypt = require("bcrypt");
const  addDefaultData = async () => {
    let role = await Role.findOne({where: {name: "Admin"}});
    if (!role) {
        Role.create({
            name: "Admin"
        })
    }
    role = await Role.findOne({where: {name: "User"}});
    if (!role) {
        Role.create({
            name: "User"
        })
    }

    role = await Role.findOne({where: {name: "Admin"}})
    if (role){
        const user = await User.findOne({where: {RoleId: role.id}})
        if (!user) {
            bcrypt.hash("root", 10).then(hash => {
                let user = {
                    name: "administrador",
                    password: hash,
                    firstName: "Serra",
                    lastName: "Patricio",
                    email: "patoserra74@hotmail.com",
                    tel: "3517865189",
                    RoleId: role.id
                }
                User.create(user);
            });

        }
    }
}

module.exports = { addDefaultData }
