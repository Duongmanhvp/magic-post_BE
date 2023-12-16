const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    // static associate(models) {
    //   Order_items.belongsTo(models.Order_details, {
    //     foreignKey: "order_id",
    //   });
    //   Order_items.belongsTo(models.Product, {
    //     foreignKey: "product_id",
    //   });
    // }
  }
  Order.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          notEmpty: true,
        },
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      location1: {
        type: DataTypes.INTEGER,
        //   autoIncrement: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      location2: {
        type: DataTypes.INTEGER,
        //   autoIncrement: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "orders",
      timestamps: false,
    }
  );
  return Order;
};
