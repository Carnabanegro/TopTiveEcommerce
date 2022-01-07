module.exports = (sequelize, DataTypes) => {

    const Product =  sequelize.define("Product", {

        name: {
            type: DataTypes.STRING,
            allowNull : false,
            validate:{
                len: {
                    args:[5,20],
                    msg: "The name product must be between 5 and 20 chars"
                }
            }
        },
        currency:{
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                isIn: {
                    args: [['usd$', '$']],
                    msg: "The currency must be usd$ or $"
                },
            }
        },
        value: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                isFloat : {
                    args: true,
                    msg: "The value must be a number"
                },
            }
        },
        descrip: {
            type: DataTypes.STRING,
            validate:{
                len: {
                    args: [2,255],
                    msg: "The description must be between 2 and 255 characters"
                }
            }
        },
        active: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                isIn: {
                    args:  [['S', 'N']],
                    msg: "Active must be in S or N"
                }
            }
        }
    });
    Product.associate = (models) => {
        Product.belongsTo(models.User);
        Product.hasOne(models.Order);
    }
    return Product;
}
