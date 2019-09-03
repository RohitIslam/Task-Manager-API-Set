const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect", error);
    }

    const db = client.db(databaseName);

    // db.collection("users").insertOne(
    //   {
    //     name: "Rohit",
    //     age: 24
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert", error);
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "John",
    //       age: 26
    //     },
    //     {
    //       name: "Doe",
    //       age: 22
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert", error);
    //     }
    //     console.log(result.ops);
    //   }
    // );

    db.collection("tasks").insertMany(
      [
        {
          task: "Task 1",
          description: "Have to complete tast 1",
          completed: false
        },
        {
          task: "Task 2",
          description: "Have to complete tast 2",
          completed: true
        },
        {
          task: "Task 3",
          description: "Have to complete tast 3",
          completed: true
        }
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert", error);
        }
        console.log(result.ops);
      }
    );
  }
);
