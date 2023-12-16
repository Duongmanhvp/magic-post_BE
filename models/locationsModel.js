const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    // static associate(models) {
    //   Order_items.belongsTo(models.Order_details, {
    //     foreignKey: "order_id",
    //   });
    //   Order_items.belongsTo(models.Product, {
    //     foreignKey: "product_id",
    //   });
    // }
  }
  Location.init(
    {
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          notEmpty: true,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      type: {
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
      modelName: "locations",
      timestamps: false,
    }
  );
  return Location;
};
