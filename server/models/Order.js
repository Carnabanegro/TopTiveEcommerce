module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define("Order", {

        currency: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [['usd$', '$']],
                    msg: "The currency must be usd$ or $"
                }
            }
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isFloat: {
                    args: true,
                    msg: "Value must be a number"
                }
            }
        },
    });
    Order.associate = (models) => {
        Order.belongsTo(models.User)
        Order.belongsTo(models.Product);
    }

    return Order;
}