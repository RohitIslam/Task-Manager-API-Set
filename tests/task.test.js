const supertest = require("supertest");
const app = require("../app");
const User = require("../src/models/User");
const Task = require("../src/models/Task");
const {
  userOneId,
  userTwoId,
  userOne,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupTestDB
} = require("./fixtures/testDB");

// Dummy user setup for test cases START

beforeEach(setupTestDB);

// Dummy user setup for test cases END

// TEST CASE for getting all tasks for user one
test("Should get all tasks for user one", async () => {
  const response = await supertest(app)
    .get("/api/tasks/")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`) // setting up the Authorization header with JWT
    .send()
    .expect(200);
  expect(response.body.length).toBe(2);
});

// TEST CASE for creating tasks for user
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

// TEST CASE for not deleting other user's task
test("Should not delete other user's task", async () => {
  await supertest(app)
    .delete(`/api/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`) // setting up the Authorization header with JWT
    .send()
    .expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
