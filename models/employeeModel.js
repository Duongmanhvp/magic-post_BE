const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.belongsTo(models.Account, {
        foreignKey: "account_id",
        references: {
          model: "Account",
          key: "account_id",
        },
      });
      Employee.hasOne(models.Account);
    }
  }
  Employee.init(
    {
      employee_id: {
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
      modelName: "employee",
      timestamps: false,
    }
  );
  return Employee;
};
