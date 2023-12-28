const userRoute = require("./userRoute");
const parcelRouter = require("./parcelRoute");
const orderRouter = require("./orderRoute");

function routesInit(app) {
  app.use("/user", userRoute);
  app.use("/parcel", parcelRouter);
  app.use("/order", orderRouter);
}
module.exports = routesInit;
