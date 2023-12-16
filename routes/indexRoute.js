const userRoute = require("./userRoute");

function routesInit(app) {
  app.use("/", userRoute);
}
module.exports = routesInit;
