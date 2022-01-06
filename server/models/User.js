module.exports = (sequelize, DataTypes) => {

    const User =  sequelize.define("User", {

        name: {
            type: DataTypes.STRING,
            allowNull : false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull : false,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull : false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                isEmail : true,
            }
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
            }
        }
    });
    User.associate = (models) => {
        User.hasMany(models.Order);
        User.hasMany(models.Product, {onDelete: 'CASCADE'});
        User.belongsTo(models.Role);
    }
    return User;
}