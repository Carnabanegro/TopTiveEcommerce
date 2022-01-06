const  User = require('./User')
module.exports = (sequelize, DataTypes) => {

    const Role = sequelize.define("Role", {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
            },
        },
    });
    Role.associate = (models) =>{
        Role.hasMany(models.User);
    }


    return Role;
}