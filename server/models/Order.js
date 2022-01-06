module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define("Order", {

        currency: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['usd$', '$']],
            }
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isFloat: true,
            }
        },
    });
    Order.associate = (models) => {
        Order.belongsTo(models.User)
        Order.belongsTo(models.Product);
    }

    return Order;
}