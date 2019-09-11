const supertest = require("supertest");
const app = require("../app");
const User = require("../src/models/User");
const Task = require("../src/models/Task");
const { userOneId, userOne, setupTestDB } = require("./fixtures/testDB");

// Dummy user setup for test cases START

beforeEach(setupTestDB);

// Dummy user setup for test cases END

// TEST CASE creating tasks for user
test("Should create tasks for user", async () => {
  const response = await supertest(app)
    .post("/api/tasks/")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`) // setting up the Authorization header with JWT
    .send({
      description: "new Task test"
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
});
