const express = require("express");
const app = express();
require("./src/db/mongoose");

const User = require("./src/models/User");

// database connection start

//Middlewares start

// //Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Middlewares end

//Define Routes
app.use("/api/users", require("./src/routes/api/users"));
app.use("/api/tasks", require("./src/routes/api/tasks"));

//start server at port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
