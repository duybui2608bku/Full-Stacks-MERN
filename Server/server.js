const express = require("express");
const dbConnect = require("./Config/DBconnect");
require("dotenv").config();
const initRouter = require("./Routes");
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
dbConnect();

initRouter(app);

app.use("/", (request, response) => {
  response.send("SERVER ON");
});

app.listen(port, () => {
  console.log(`Server Running on the port ${port}`);
});
