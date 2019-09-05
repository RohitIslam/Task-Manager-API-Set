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

app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => res.send(user))
    .catch(err => res.send(err));
});

//start server at port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
