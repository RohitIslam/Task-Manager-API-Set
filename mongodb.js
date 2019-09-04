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
    //   .deleteOne({ name: "Doe" })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));

    db.collection("users")
      .deleteMany({ age: 30 })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
);
