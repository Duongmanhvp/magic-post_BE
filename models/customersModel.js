const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // Customer.belongsTo(models.Account, {
      //   foreignKey: "account_id",
      //   references: {
      //     model: "Account",
      //     key: "account_id",
      //   },
      // });
      Customer.hasMany(models.Parcel, {
        foreignKey: "customer_id",
      });
    }
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
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      address: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        validate: {
          notEmpty: false,
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
