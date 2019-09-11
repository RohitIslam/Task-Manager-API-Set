const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/User");
const Task = require("../../src/models/Task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Test User One",
  email: "testone@test.com",
  password: "123456789",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }
  ]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "2nd Test User",
  email: "testtwo@test.com",
  password: "123456789",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }
  ]
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "Make a tea",
  completed: false,
  owner: userOne._id
};
const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Feed the birds",
  completed: true,
  owner: userOne._id
};
const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Play Games",
  completed: false,
  owner: userTwo._id
};

const setupTestDB = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userTwoId,
  userOne,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupTestDB
};
