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
        }
    });
    Product.associate = (models) => {
        Product.belongsTo(models.User);
        Product.hasOne(models.Order);
    }
    return Product;
}
