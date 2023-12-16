const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const db = {};

const sequelize = new Sequelize(
  process.env.database,
  process.env.username,
  process.env.password,
  {
    host: "localhost",
    dialect: "mysql",
  }
);
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.models = {};

db.models.Account = require("./accountsModel")(sequelize, Sequelize.DataTypes);
db.models.Customer = require("./customersModel")(
  sequelize,
  Sequelize.DataTypes
);
db.models.Employee = require("./employeeModel")(sequelize, Sequelize.DataTypes);
db.models.Location = require("./locationsModel")(
  sequelize,
  Sequelize.DataTypes
);
db.models.Order = require("./ordersModel")(sequelize, Sequelize.DataTypes);
db.models.Parcel = require("./parcelsModel")(sequelize, Sequelize.DataTypes);

Object.keys(db.models).forEach((modelName) => {
  if (db.models[modelName].associate) {
    db.models[modelName].associate(db.models);
  }
});

module.exports = db;
