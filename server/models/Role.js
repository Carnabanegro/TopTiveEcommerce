module.exports = (sequelize, DataTypes) => {

    const Role = sequelize.define("Role", {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    args: true,
                    msg: "El rol solo puede contener letras"
                }
            },
        },
    });
    Role.associate = (models) =>{
        Role.hasMany(models.User);
    }

    return Role;
}