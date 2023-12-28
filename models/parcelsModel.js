const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parcel extends Model {
    static associate(models) {
      Parcel.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        references: {
          model: "Customer",
          key: "customer_id",
        },
      });
    }
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
        // unique: true,
        // autoIncrement: true,
        // primaryKey: true,
        validate: {
          notEmpty: true,
        },
      },
      parcel_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
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
