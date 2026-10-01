# Why do we want Promises in mysql2/promises?

Because modern Node.js code commonly uses:

async
await

For example:

const [rows] = await pool.query("SELECT * FROM events");

The database operation takes time.

Your program basically has to say:

"Start this database query, and when it finishes, give me the result."

That's what a Promise represents.

Database query
     ↓
  Promise
     ↓
waiting...
     ↓
query finishes
     ↓
result

await lets us write this in a clean way.

4. Without /promise

If you import:

import mysql from "mysql2";

you can use the callback style:

import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "eventhub"
});

connection.query(
  "SELECT * FROM events",
  (error, results) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log(results);
  }
);

Notice this:

(error, results) => {
   ...
}

That's a callback function.

You're basically saying:

"When the query finishes, call this function."

5. With /promise

We can instead write:

import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "eventhub"
});

const [rows] = await pool.query(
  "SELECT * FROM events"
);

Much cleaner, especially when you're already writing Express/TypeScript code with async/await.

For example:

router.get("/events", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM events"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch events"
    });
  }
});

This fits naturally with:

async
await
try
catch
6. So why did I use mysql2/promise?

Because your EventHub backend already uses modern async code.

You will commonly have:

async function getEvents() {
   ...
}

and:

await ...

So this:

import mysql from "mysql2/promise";

lets you do:

const [rows] = await pool.query(...);

instead of callback nesting.

7. What exactly is this syntax?

This is probably the part that looked weird:

const [rows] = await pool.query("SELECT * FROM events");

Let's break it down.

pool.query()
pool.query("SELECT * FROM events")

runs the SQL query.

With the Promise API, it gives you something like:

[
   rows,
   fields
]

Conceptually:

[
   [
      { id: 1, title: "React Workshop" },
      { id: 2, title: "Node Workshop" }
   ],
   [...]
]

So:

const [rows] = ...

uses array destructuring.

It means:

const result = await pool.query("SELECT * FROM events");

const rows = result[0];

Same thing.

8. Why not just use mysql2?

You absolutely can.

This:

import mysql from "mysql2";

is valid.

But then you'd typically use callbacks:

pool.query("SELECT * FROM events", (error, rows) => {
    if (error) {
        console.log(error);
        return;
    }

    console.log(rows);
});

Whereas:

import mysql from "mysql2/promise";

allows:

const [rows] = await pool.query("SELECT * FROM events");

Since you're learning Node + Express + TypeScript, I'd recommend learning the Promise version first.

9. Think of it like this
                 mysql2
                   │
          ┌────────┴────────┐
          ↓                 ↓
     Callback API       Promise API
          │                 │
          ↓                 ↓
   callback function    async / await
                            │
                            ↓
                    mysql2/promise
Callback style
pool.query("SELECT ...", (error, rows) => {
   ...
});
Promise style
const [rows] = await pool.query("SELECT ...");

Both can talk to the same MySQL database.

The difference is mainly how your JavaScript handles the asynchronous operation.

Remember this
mysql2
= MySQL driver for Node.js

mysql2/promise
= Promise-based API of mysql2

Promise
= represents an asynchronous operation/result

async/await
= convenient way to work with Promises

pool
= reusable group of database connections

So for your EventHub learning setup:

import mysql from "mysql2/promise";

is basically saying:

"Give me the MySQL driver, using its Promise/async-await API."

Then:

const pool = mysql.createPool({...});

means:

"Create a reusable pool of MySQL connections."

And:

const [rows] = await pool.query("SELECT * FROM events");

means:

"Run this SQL query, wait for the database result, and take the returned rows."

## POOL vs createConnection (MySQL)

1) createConnection()
→ Creates ONE database connection.
→ Use it for a single/simple connection.
→ After query work, connection is usually closed.

const connection = await mysql.createConnection({...});

connection.query(...);
await connection.end();


2) createPool()
→ Creates a pool of multiple reusable connections.
→ Connections are reused instead of creating a new one every time.
→ Multiple requests can use connections concurrently.
→ Better for production APIs / web applications.

const pool = mysql.createPool({
    host,
    user,
    password,
    database,
    connectionLimit: 10
});

pool.query(...);


KEY DIFFERENCE

createConnection()
→ One connection
→ Simple/small scripts
→ Manual connection lifecycle

createPool()
→ Multiple reusable connections
→ Production applications / APIs
→ Better concurrency + performance


Easy rule:
Small script → createConnection()
Backend/API → createPool()

# For your EventHub MySQL learning setup, keep it simple:

backend/
│
├── src/
│   ├── config/
│   │   └── db.ts                    ← CREATE POOL HERE
│   │
│   ├── controllers/
│   │   └── user.controller.ts       ← handles HTTP request
│   │
│   ├── services/
│   │   └── user.service.ts          ← SQL queries / DB operations
│   │
│   ├── routes/
│   │   └── user.routes.ts           ← API routes
│   │
│   ├── migrations/
│   │   ├── 001_create_users.sql     ← CREATE TABLE
│   │   ├── 002_create_events.sql
│   │   └── 003_create_bookings.sql
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
└── package.json

API Request
    ↓
Route
    ↓
Controller
    ↓
Service
    ↓
pool.query()
    ↓
MySQL


src/config/db.ts
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;

What each part does
mysql.createPool()
        ↓
Creates a pool of reusable MySQL connections

host
        → Where MySQL is running

port
        → MySQL's port (usually 3306)

user
        → MySQL username

password
        → MySQL password

database
        → Which database to use

waitForConnections: true

→ If all connections in the pool are currently busy,
  a new request WAITS until a connection becomes free.

connectionLimit: 10
        → Maximum 10 connections in the pool

Your .env:

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=eventhub

And this:

import mysql from "mysql2/promise";

means you're using the Promise-based API, so later you can write:

const [rows] = await pool.query("SELECT * FROM events");

instead of using callbacks.

how many max connections can we set

There isn't one universal maximum. It depends on MySQL's server limit, your hosting plan, and your application's workload.

In your code:

connectionLimit: 10

means your Node.js application can have up to 10 active connections in its pool.

Important distinction
connectionLimit: 10
        ↓
Maximum connections THIS APP'S POOL can use

MySQL max_connections
        ↓
Maximum connections THE MYSQL SERVER allows overall


2. Where do we actually use it?

Usually in your service files.

src/services/user.service.ts

import pool from "../config/db";

export async function getUsers() {
    const [rows] = await pool.query(
        "SELECT * FROM users"
    );

    return rows;
}

3. Controller

src/controllers/user.controller.ts

import { Request, Response } from "express";
import { getUsers } from "../services/user.service";

export async function getAllUsers(
    req: Request,
    res: Response
) {
    const users = await getUsers();

    res.json(users);
}



4. Route

src/routes/user.routes.ts

import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller";

const router = Router();

router.get("/", getAllUsers);

export default router;

5. app.ts
import express from "express";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

export default app;


import "dotenv/config";
import app from "./app";

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


import "dotenv/config";
import app from "./app";

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

What about migrations/*.sql?

These are not imported into your Node code.

They are SQL files used to create/modify your database structure:

001_create_users.sql
        ↓
CREATE TABLE users (...)

002_create_events.sql
        ↓
CREATE TABLE events (...)

003_create_bookings.sql
        ↓
CREATE TABLE bookings (...)

So remember:

db.ts
→ How Node connects to MySQL

migrations/*.sql
→ How database/tables are created or changed

services/*.ts
→ Where application SQL queries are normally executed


Most important: You create one pool, export it from db.ts, and import that same pool wherever your application needs to query MySQL. You don't make a separate createPool() in every file.

---
if the tutor only wants to demonstrate MySQL connection, don't need the full controller/service/routes structure.

Keep it very simple:

backend/
│
├── src/
│   ├── config/
│   │   └── db.ts
│   │
│   └── server.ts
│
├── .env
└── package.json
1. .env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=eventhub


2. src/config/db.ts
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,

    waitForConnections: true,
    connectionLimit: 10,
      queueLimit: 0,

});

export default pool;

3. src/server.ts  // server.ts is the starting point of your application.
import "dotenv/config";        // 1. Load .env
import pool from "./config/db"; // 2. Create MySQL pool using those values

async function startServer() {
    try {
        const [rows] = await pool.query("SELECT 1");

        console.log("MySQL connected successfully");
        console.log(rows);

    } catch (error) {
        console.error("MySQL connection failed:", error);
    }
}

startServer();

note: SELECT 1 gives you the number 1.

SELECT 1;

Result:

1

note: why rows[] array ?

Easy way to remember
pool.query() contains more than just single row
     ↓
[ rows, fields ]
     ↓
   rows = actual returned records

just checking the connection
----

MySQL server
max_connections = 151

       ├── EventHub backend pool → 10
       ├── Another application   → 20
       ├── MySQL Workbench       → 1
       └── Other connections     → ...

So you shouldn't simply set connectionLimit to 151.

For a normal small Express application:

connectionLimit: 10

is a perfectly reasonable starting point.

As traffic grows, you can increase it based on actual workload and server capacity.

One important thing

A bigger pool doesn't automatically mean faster.

If you set:

connectionLimit: 1000

but your MySQL server can only handle a limited number of concurrent operations, you can actually create resource/connection pressure.

Interview answer:

connectionLimit defines the maximum number of connections that a particular application's connection pool can maintain/use. The practical limit depends on the MySQL server's max_connections, available resources, workload, and hosting configuration.

 why  waitForConnections: true,?

waitForConnections: true tells the connection pool what to do when all connections are currently busy.


## simple MongoDB connection demonstration, you can keep it to just 2 files, similar to the MySQL demo.

backend/
├── src/
│   ├── config/
│   │   └── db.ts          ← MongoDB connection
│   └── server.ts          ← calls connection
├── .env
└── package.json
1. .env
MONGO_URI=mongodb://localhost:27017/eventhub

For MongoDB Atlas, it would be your Atlas connection string instead.

2. src/config/db.ts
import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
}

export default connectDB;

Here:

mongoose.connect(process.env.MONGO_URI!)

actually connects Node.js to MongoDB.

3. src/server.ts
import "dotenv/config";
import connectDB from "./config/db";

async function startServer() {
    try {
        await connectDB();

        console.log("Server started");
    } catch (error) {
        console.error("Failed to start server");
    }
}

startServer();

Run:

npx tsx src/server.ts

Output:

MongoDB connected successfully
Server started

==================

MYSQL                              MONGODB
────────────────────────────       ────────────────────────────
Database                           Database
   ↓                                  ↓
Table                              Collection
   ↓                                  ↓
Row                                Document
   ↓                                  ↓
Column                             Field
   ↓                                  ↓
Cell / Value                       Field value
Primary Key                        _id
Foreign Key                        Reference / ObjectId
Schema                             Flexible document structure


users → table
id, name, email → columns
(1, Ajay, ajay@gmail.com) → row
Ajay → value
id = 1 → primary key value



---
Example document:

{
    _id: ObjectId("..."),
    name: "Ajay",
    email: "ajay@gmail.com"
}
users → collection
_id, name, email → fields
Entire { ... } → document
"Ajay" → field value

MongoDB documents in the same collection can have different fields:

// Document 1
{
    name: "Ajay",
    email: "ajay@gmail.com",
    age: 31
}

// Document 2
{
    name: "Amit",
    email: "amit@gmail.com"
}

MongoDB is therefore flexible-schema, while MySQL is generally fixed/defined-schema.

Interview line

MySQL stores data in tables consisting of rows and columns, whereas MongoDB stores data in collections consisting of documents and fields.

Memory trick:

MySQL:
Database → Table → Row → Column

MongoDB:
Database → Collection → Document → Field