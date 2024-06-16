const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", (request, response) => {
  response.send("SERVER ON");
});

app.listen(port, () => {
  console.log(`Server Running on the port ${port}`);
});
