const request = require("supertest");
const app = require("../app");
const User = require("../src/models/User");

const userOne = {
  name: "Test User One",
  email: "testone@test.com",
  password: "123456789"
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/api/users/")
    .send({
      name: "Test User",
      email: "test@test.com",
      password: "123456789"
    })
    .expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/api/users/login")
    .send({
      email: "testone@test.com",
      password: "123456789"
    })
    .expect(200);
});

test("Should not login non-existing user", async () => {
  await request(app)
    .post("/api/users/login")
    .send({
      email: "test@test.com",
      password: "12345"
    })
    .expect(400);
});
