module.exports = (sequelize, DataTypes) => {

    const User =  sequelize.define("User", {

        name: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                isAlphanumeric:true,
                len:{
                    args : [5,16],
                    msg : "Username must be between 5 and 16 characters"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                len:{
                    args : [5,255],
                    msg : "The password must be between 5 and 255 characters"
                }
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                isAlpha: {
                    args: true,
                    msg: "The name can only contain letters"
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                isAlpha: {
                    args: true,
                    msg: "The name can only contain letters"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                isEmail : {
                    args: true,
                    msg: "The email must be in the format emailname@gmail.com"
                },
            }
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: {
                    args: true,
                    msg: "The phone can only contain numeric values"
                }
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