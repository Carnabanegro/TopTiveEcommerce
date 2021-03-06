module.exports = (sequelize, DataTypes) => {

    const User =  sequelize.define("User", {

        name: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                isAlphanumeric: {
                    args: true,
                    msg: "Dont be blank spaces y the username"
                },
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
        active: {
            type: DataTypes.STRING,
            default: 'N',
            allowNull : false,
            validate: {
                isIn: {
                    args:  [['S', 'N']],
                    msg: "Active must be in S or N"
                }
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
        User.belongsTo(models.Role, {foreignKey : {name: 'RoleId'}});
    }
    return User;
}