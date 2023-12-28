const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Parcel, {
        foreignKey: "parcel_id",
        references: {
          model: "Parcel",
          key: "parcel_id",
        },
      });
      Order.belongsTo(models.Location, {
        foreignKey: "sending_location",
        references: {
          model: "Location",
          key: "location_id",
        },
      });
      Order.belongsTo(models.Parcel, {
        foreignKey: "receiving_location",
        references: {
          model: "Location",
          key: "location_id",
        },
      });
    }
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
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      sending_location: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      receiving_location: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      parcel_id: {
        type: DataTypes.INTEGER,
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
