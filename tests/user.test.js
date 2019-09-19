const supertest = require("supertest");
const app = require("../app");
const User = require("../src/models/User");
const { userOneId, userOne, setupTestDB } = require("./fixtures/testDB");

// Dummy user setup for test cases START

beforeEach(setupTestDB);

// Dummy user setup for test cases END

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

// TEST CASE for sign up
test("Should signup a new user", async () => {
  const response = await supertest(app)
    .post("/api/users/")
    .send({
      name: "Test User",
      email: "test@test.com",
      password: "123456789"
    })
    .expect(201);

  // Assert that the database was change correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Test User",
      email: "test@test.com"
    },
    token: user.tokens[0].token
  });

  expect(user.password).not.toBe("123456789");
});

// TEST CASE for not signing up user with invalid name
test("Should not signup user with invalid name", async () => {
  await supertest(app)
    .post("/api/users")
    .send({
      name: "",
      email: "test@test.com",
      password: "123456789"
    })
    .expect(400);
});

// TEST CASE for not signing up user with invalid email
test("Should not signup user with invalid email", async () => {
  await supertest(app)
    .post("/api/users")
    .send({
      name: "Rohit",
      email: "test.com",
      password: "123456789"
    })
    .expect(400);
});

// TEST CASE for not Test case created for not deleting other user's task password
test("Should not signup user with invalid password", async () => {
  await supertest(app)
    .post("/api/users")
    .send({
      name: "Rohit",
      email: "test@test.com",
      password: ""
    })
    .expect(400);
});

// TEST CASE for login
test("Should login existing user", async () => {
  const response = await supertest(app)
    .post("/api/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
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

// TEST CASE for uploading avatar image
test("Should upload avatar image", async () => {
  await supertest(app)
    .post("/api/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`) // setting up the Authorization header with JWT
    .attach("avatar", "tests/fixtures/profile-pic.jpg") // attaches files to upload
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer)); // checks if the user.avatar is Buffer type or not
});

// TEST CASE for updating valid user fields
test("Should update valid user fields", async () => {
  const response = await supertest(app)
    .patch("/api/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`) // setting up the Authorization header with JWT
    .send({
      name: "Test User update",
      age: 25
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Test User update");
});

// TEST CASE for update user if unauthenticated
test("Should not update user if unauthenticated", async () => {
  await supertest(app)
    .patch("/api/users/me")
    .set("Authorization", `sds${userOne.tokens[0].token}`)
    .send({
      name: "Test User update",
      age: 25
    })
    .expect(401);
});

// TEST CASE for deleting current user account
test("Should delete account for user", async () => {
  await supertest(app)
    .delete("/api/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`) // setting up the Authorization header with JWT
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

// TEST CASE for not deleting account for unauthorized user
test("Should not delete account for unauthorized user", async () => {
  await supertest(app)
    .delete("/api/users/me")
    .send()
    .expect(401);
});
