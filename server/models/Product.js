module.exports = (sequelize, DataTypes) => {

    const Product =  sequelize.define("Product", {

        name: {
            type: DataTypes.STRING,
            allowNull : false,
        },
        currency:{
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                isIn: [['usd$', '$']],
            }
        },
        value: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                isFloat : true,
            }
        },
        descrip: {
            type: DataTypes.STRING,
        },
        active: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                isIn: [['S', 'N']],
            }
        }
    });
    Product.associate = (models) => {
        Product.belongsTo(models.User);
        Product.hasOne(models.Order);
    }
    return Product;
}
