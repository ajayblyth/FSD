const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
// MongoClient is the class used to connect a Node.js application to a MongoDB server.

const PORT = 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/*
Build the MongoDB connection string using environment variables.

Environment variables allow us to configure the application without
changing the source code.

The application first looks for the values in process.env.
If a variable is not found, it falls back to the default value.

Defaults are useful for local development, while Docker Compose or
production environments can provide their own values.

MONGO_DB_USERNAME - MongoDB username (default: root)
MONGO_DB_PWD      - MongoDB password (default: qwert)
MONGO_DB_HOST     - localhost when running locally,
                    mongo when running inside Docker Compose
MONGO_DB_PORT     - MongoDB port (default: 27017)
MONGO_DB_NAME     - Database name (default: OPQ_docker_demo)

If MONGO_URL is provided, it overrides all of the above values.
*/

/*
process.env

Contains all environment variables available to this Node.js application.

Example:

process.env.MONGO_DB_USERNAME

If the variable exists, its value is used.
Otherwise, the default value after || is used.

Example:

process.env.MONGO_DB_USERNAME = "admin"

"admin" || "root"
Result -> "admin"

If the variable doesn't exist:

undefined || "root"
Result -> "root"
*/

// Read the value from environment variables.
// If not provided, use the default value.
const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME || "root";
const MONGO_DB_PWD = process.env.MONGO_DB_PWD || "qwert";
const MONGO_DB_HOST = process.env.MONGO_DB_HOST || "localhost";
const MONGO_DB_PORT = process.env.MONGO_DB_PORT || "27017";
const DB_NAME = process.env.MONGO_DB_NAME || "OPQ_docker_demo";

// If MONGO_URL is supplied, use it directly.
// Otherwise, build the connection string using the individual variables.
const MONGO_URL =
  process.env.MONGO_URL ||
  `mongodb://${MONGO_DB_USERNAME}:${MONGO_DB_PWD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/?authSource=admin`;

const client = new MongoClient(MONGO_URL);
let db;

/*
Rule to remember

An environment variable is available only if:

1. It is defined for that container.
2. Your code reads the same variable name.

compose.yaml                     server.js
------------------------------------------------------
MONGO_DB_HOST        --->  process.env.MONGO_DB_HOST   ✅
DB_HOST              --->  process.env.MONGO_DB_HOST   ❌

The names must match exactly.

If Docker Compose defines:

environment:
  MONGO_DB_HOST: mongo

then your code must read:

process.env.MONGO_DB_HOST

Otherwise, the value will be undefined and the default ("localhost")
will be used.
*/

// GET all users
app.get("/getUsers", async (req, res) => {
  try {
    const data = await db.collection("users").find({}).toArray();
    res.send(data);
  } catch (err) {
    console.error("getUsers failed:", err.message);
    res.status(500).send({ error: "Failed to fetch users" });
  }
});

// POST a new user
app.post("/addUser", async (req, res) => {
  try {
    const userObj = req.body;

    console.log("New user:", userObj);

    const data = await db.collection("users").insertOne(userObj);

    console.log("Data inserted into MongoDB");

    res.send(data);
  } catch (err) {
    console.error("addUser failed:", err.message);
    res.status(500).send({ error: "Failed to add user" });
  }
});

/*
Connect to MongoDB once when the application starts.
If the connection succeeds, start the Express server.
If the connection fails, terminate the application.
*/

async function start() {
  try {
    await client.connect();

    db = client.db(DB_NAME);

    console.log(`Connected to MongoDB (${DB_NAME})`);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Could not connect to MongoDB:", err.message);
    process.exit(1);
  }
}

start();