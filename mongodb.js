const { MongoClient, ObjectID } = require("mongodb");

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

    // db.collection("users").findOne(
    //   { _id: new ObjectID("5d6e6d0b8d6f471b9869d0a2") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable to fetch", error);
    //     }

    //     console.log(user);
    //   }
    // );

    db.collection("users")
      .find({ age: 24 })
      .toArray((error, users) => {
        if (error) {
          return console.log("Unable to fetch", error);
        }
        console.log(users);
      });
    db.collection("users")
      .find({ age: 24 })
      .count((error, count) => {
        if (error) {
          return console.log("Unable to fetch", error);
        }
        console.log(count);
      });
  }
);
