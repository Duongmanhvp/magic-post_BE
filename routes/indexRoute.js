const userRoute = require("./userRoute");
const parcelRouter = require("./parcelRoute");
const orderRouter = require("./orderRoute");
const locationRouter = require("./locationRoute");

function routesInit(app) {
  app.use("/user", userRoute);
  app.use("/parcel", parcelRouter);
  app.use("/order", orderRouter);
  app.use("/location", locationRouter);
}
module.exports = routesInit;
