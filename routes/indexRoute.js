const userRoute = require("./userRoute");

function routesInit(app) {
  app.use("/user", userRoute);
}
module.exports = routesInit;
