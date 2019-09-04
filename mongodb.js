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

    // db.collection("users")
    //   .updateOne(
    //     { _id: new ObjectID("5d6e70b31f61571198747649") },
    //     {
    //       $set: {
    //         name: "Mike"
    //       }
    //     }
    //   )
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    db.collection("users")
      .updateMany(
        { name: "John" },
        {
          $set: {
            age: 30
          }
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
);
