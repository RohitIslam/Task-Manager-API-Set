const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model("User", {
  name: {
    type: String
  },
  age: {
    type: Number
  }
});

const user = new User({
  name: "Rohit",
  age: 24
});

user
  .save()
  .then(res => console.log(res))
  .catch(err => console.log(err));

const Task = mongoose.model("Task", {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});

const task = new Task({
  description: "Water the tree",
  completed: true
});

task
  .save()
  .then(res => console.log(res))
  .catch(err => console.log(err));
