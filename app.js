const express = require("express");
const app = express();
require("./src/db/mongoose");

// database connection start

//Middlewares start

// //Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Middlewares end

//Define Routes
app.use("/api/users", require("./src/routes/api/users"));
app.use("/api/tasks", require("./src/routes/api/tasks"));

module.exports = app;
