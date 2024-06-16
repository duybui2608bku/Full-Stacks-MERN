const userRouter = require("./User");

const initRouter = (app) => {
  app.use("/api/user", userRouter);
};

module.exports = initRouter;
