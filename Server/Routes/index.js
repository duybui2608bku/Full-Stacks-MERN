const userRouter = require("./User");
const { errorHandler, notFound } = require("../Middlewares/errorHandler");
const initRouter = (app) => {
  app.use("/api/user", userRouter);
  app.use(notFound);
  app.use(errorHandler);
};

module.exports = initRouter;
