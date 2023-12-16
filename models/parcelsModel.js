const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parcel extends Model {
    // static associate(models) {
    //   Order_items.belongsTo(models.Order_details, {
    //     foreignKey: "order_id",
    //   });
    //   Order_items.belongsTo(models.Product, {
    //     foreignKey: "product_id",
    //   });
    // }
  }
  Parcel.init(
    {
      parcel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          notEmpty: true,
        },
      },
      record_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        //   autoIncrement: true,
        primaryKey: true,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "parcels",
      timestamps: false,
    }
  );
  return Parcel;
};
