const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../src/models/User");

// Dummy user setup for test cases START
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

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

// Dummy user setup for test cases END

// TEST CASE for sign up
test("Should signup a new user", async () => {
  await supertest(app)
    .post("/api/users/")
    .send({
      name: "Test User",
      email: "test@test.com",
      password: "123456789"
    })
    .expect(201);
});

// TEST CASE for login
test("Should login existing user", async () => {
  await supertest(app)
    .post("/api/users/login")
    .send({
      email: "testone@test.com",
      password: "123456789"
    })
    .expect(200);
});

// TEST CASE for incorrect login
test("Should not login non-existing user", async () => {
  await supertest(app)
    .post("/api/users/login")
    .send({
      email: "test@test.com",
      password: "12345"
    })
    .expect(400);
});

// TEST CASE for getting current user profile
test("Should get current user profile", async () => {
  await supertest(app)
    .get("/api/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`) // setting up the Authorization header with JWT
    .send()
    .expect(200);
});

// TEST CASE for Unauthorized access for getting current user profile
test("Should not get current user profile", async () => {
  await supertest(app)
    .get("/api/users/me")
    .send()
    .expect(401);
});

// TEST CASE for deleting current user account
test("Should delete account for user", async () => {
  await supertest(app)
    .delete("/api/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`) // setting up the Authorization header with JWT
    .send()
    .expect(200);
});

// TEST CASE for not deleting account for unauthorized user
test("Should not delete account for unauthorized user", async () => {
  await supertest(app)
    .delete("/api/users/me")
    .send()
    .expect(401);
});
