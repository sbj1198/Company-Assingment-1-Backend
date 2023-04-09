const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connection = require("./configs/db");
const userController = require("./controllers/user.controller");

app.use(cors());
app.use(express.json());

app.use("/users", userController);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Connected to Database`);
  } catch (error) {
    console.log("Error can't connect to Database", error);
  }
  console.log(`Server successfully running on port ${process.env.PORT}`);
});
