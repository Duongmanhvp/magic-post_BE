const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    // static associate(models) {
    //   Order_items.belongsTo(models.Order_details, {
    //     foreignKey: "order_id",
    //   });
    //   Order_items.belongsTo(models.Product, {
    //     foreignKey: "product_id",
    //   });
    // }
  }
  Customer.init(
    {
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          notEmpty: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      account_id: {
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
      modelName: "customers",
      timestamps: false,
    }
  );
  return Customer;
};
