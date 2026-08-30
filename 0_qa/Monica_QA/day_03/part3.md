Eventloop
Streams 
Buffers
Rest api
Authentication 
Cluster
===================
# 1. Node.js Event Loop

### Interview answer

> **The Event Loop is the mechanism that allows Node.js to handle asynchronous/ non-blocking operations while JavaScript runs on a single main thread. It continuously checks for work that is ready to be executed and schedules callbacks for execution when the Call Stack is available.**

That's the core answer.

---

## How it works in Node.js

Consider:

const fs = require("fs");

console.log("Start");a

fs.readFile("data.txt", "utf8", (err, data) => {
console.log("File completed");
});

console.log("End");

### Simplified flow

"Start"
↓
Call Stack
↓
fs.readFile()
↓
Node.js / libuv handles file operation
↓
Call Stack is free
↓
"End"
↓
File operation completes
↓
Callback becomes ready
↓
Event Loop
↓
Callback → Call Stack
↓
"File completed"

### Output

Start
End
File completed

### The important point

The Event Loop **doesn't itself perform the file/database/network operation**.

It mainly **coordinates when the JavaScript callback can execute** after the asynchronous operation is ready.

---

# Event Loop + libuv

This is the Node.js-specific part you should know.

Node.js
│
├── **V8** → Executes JavaScript
│
└── **libuv**
    ├── Async I/O
    ├── Event Loop
    ├── OS
    └── Thread Pool
        ↓
    Operation complete
        ↓
    Callback ready
        ↓
    Event Loop
        ↓
    Call Stack

### Remember

**V8** → executes JavaScript

**libuv** → provides Node's asynchronous I/O infrastructure and Event Loop

**Event Loop** → coordinates ready asynchronous work

**Thread Pool** → handles certain operations in the background

**Call Stack** → executes the JavaScript callback

---

.# Does every async operation use the Thread Pool?
Async operation
      │
      ├──→ OS / Kernel asynchronous mechanisms
      │       └── Network I/O, sockets, etc.
      │
      └──→ libuv Thread Pool
              └── Certain fs, DNS, crypto, etc.


**No.**

This is an important interview point.

Some operations can use libuv's thread pool, such as certain:

**File system operations | DNS operations | Cryptographic operations**

Network I/O is often handled using the operating system's asynchronous networking capabilities rather than the thread pool.

So don't say:

> "Node sends every async operation to the thread pool."

❌ Incorrect.

---

#. Event Loop and Microtasks

Your existing understanding is useful here.

Suppose:

console.log("A");

Promise.resolve().then(() => {
console.log("B");
});

setTimeout(() => {
console.log("C");
}, 0);

console.log("D");

### Important general idea

A
D
B
C

Because Promise callbacks are **microtasks**, which are given priority over normal timer/callback work.

You already know this model, so **we don't need to relearn it**.

The only thing to remember for Node.js is that Node has a more detailed internal Event Loop structure than the simplified:

Call Stack
↓
Microtasks
↓
Callback Queue

model you learned in JavaScript.

You don't need those detailed phases right now.

---

#. Why is Event Loop important for Node.js?

Because Node.js doesn't create a new JavaScript thread for every incoming request.

Imagine:

100 requests
↓
Node.js
↓
Main JS thread + Event Loop
↓
Asynchronous I/O handled efficiently

For example:

Request 1 → Database
Request 2 → File
Request 3 → Network
Request 4 → Database

While those operations are waiting:

Node.js
↓
continues processing other work

When results are ready:

Result ready
↓
Callback scheduled
↓
Event Loop
↓
Call Stack
↓
JavaScript processes result

That's the **main reason the Event Loop is so important to Node.js**.

---

#. One important limitation

The Event Loop doesn't magically make CPU-heavy JavaScript asynchronous.

For example:

while (true) {
// heavy CPU work
}

This blocks the main JavaScript thread:

CPU-heavy task
↓
Call Stack occupied
↓
Event Loop can't process normal JS work
↓
Other requests get delayed

That's why Node.js is particularly good for **I/O-heavy applications**, while CPU-heavy work needs special handling such as Worker Threads or separate processes.

---

#. Interview Questions

### Q: What is the Event Loop?

> The Event Loop is the mechanism that coordinates asynchronous operations and schedules their callbacks for execution on the JavaScript thread when the Call Stack is available.

### Q: Does Event Loop execute asynchronous operations?

> No. Asynchronous operations are handled through Node.js/libuv and the operating system or thread pool as appropriate. The Event Loop coordinates when their callbacks are executed by JavaScript.

### Q: Why does Node.js need an Event Loop?

> To handle asynchronous, non-blocking operations without blocking the main JavaScript thread.

### Q: Is Event Loop a separate thread?

> The Event Loop runs as part of Node.js's main execution model; it is not a separate JavaScript execution thread for running application code.

### Q: Does every async operation use the thread pool?

> No. Certain operations use libuv's thread pool, while many network operations rely on the operating system's asynchronous I/O mechanisms.

---

## That's enough Event Loop for your current path.

You already had the JavaScript-level understanding, so we only added the **Node.js-specific pieces:**

Your existing knowledge
+
libuv
+
OS / Thread Pool
+
Node.js Event Loop
↓
**Complete foundation**
================================



# 2. Buffers in Node.js


A Buffer is a Node.js object used to work with raw binary data directly in memory. It is commonly used when handling files, network data, streams, and other data that isn't necessarily in text format.

Why do we need Buffers?

JavaScript normally works with strings and objects:

const name = "Ajay";

But computers also deal with binary data:

Images
Videos
PDFs
Audio
Network packets
File data

For this kind of data, Node.js provides Buffer.

Simple example
const buffer = Buffer.from("Hello");

console.log(buffer);

You might get:

<Buffer 48 65 6c 6c 6f>

Those hexadecimal values represent the bytes of "Hello".

You can convert it back:

console.log(buffer.toString());

Output:

Hello

So:

"Hello"
   ↓
Buffer
   ↓
Binary bytes


Creating a Buffer
From a string
const buffer = Buffer.from("Hello");
Allocate a fixed amount of memory
const buffer = Buffer.alloc(10);

This creates a Buffer with 10 bytes.

Why are Buffers important in Node.js?

Because Node.js frequently deals with data coming from:

File System
     ↓
Network
     ↓
Streams
     ↓
Buffer

For example, when reading a large file, Node.js doesn't necessarily need to load the entire file into memory at once. Data can be processed in chunks, and those chunks can be represented using Buffers.

This leads directly to Streams.

Buffer vs String
String	Buffer
Represents text	Represents raw binary data
Human-readable	Byte-based
"Hello"	<Buffer 48 65...>
Good for text	Good for files/network/binary data

Important interview point

Is Buffer part of JavaScript?
No. Buffer is provided by Node.js.

It is a Node.js-specific API for handling binary data.

What is a Buffer?

A Buffer is a Node.js object that represents a sequence of bytes and is used to handle raw binary data efficiently.

Where are Buffers used?

Buffers are commonly used with file systems, streams, network communication, and other binary data processing.

One concept to remember
Buffer = raw binary data in memory

And:

Large data
   ↓
Stream
   ↓
Chunks
   ↓
Buffers

That relationship is the main reason we learned Buffers before Streams.

===============================

# 3. Streams in Node.js

Streams are an important Node.js concept because they allow us to work with large amounts of data efficiently.

1. What is a Stream?
Interview answer

A Stream is a mechanism for processing data piece by piece, or in chunks, instead of loading the entire data into memory at once.

For example, imagine a 1 GB video file.

Without a stream:

1 GB file
   ↓
Load entire file into memory
   ↓
Process it

This can consume a lot of memory.

With a stream:

1 GB file
   ↓
Chunk → process
Chunk → process
Chunk → process
Chunk → process
...

Only a portion of the data needs to be handled at a time.

2. Why are Streams useful?

Streams are especially useful for:

Large files
Video/audio
File uploads/downloads
HTTP requests/responses
Network communication
Main advantage

Streams reduce memory usage and allow data processing to begin before the entire data source is available.

3. Streams and Buffers

Remember what we just learned:

Buffer = raw binary data

A stream processes data in chunks, and those chunks are commonly represented as Buffers when dealing with binary data.

Large file
    ↓
Stream
    ↓
Chunks
    ↓
Buffer
    ↓
Process

4. Types of Streams

This is important for interviews.

Node.js has four main types:

1. Readable
2. Writable
3. Duplex
4. Transform

1. Readable Stream

Used to read data.

Example:

const fs = require("fs");

const stream = fs.createReadStream("large-file.txt");

stream.on("data", (chunk) => {
    console.log(chunk);
});

Instead of reading the whole file at once, the file is received in chunks.

Conceptually:

File
 ↓
Chunk 1
 ↓
Chunk 2
 ↓
Chunk 3

Examples:

Reading a file
Receiving HTTP request data

2. Writable Stream

Used to write data.

Example:

const fs = require("fs");

const stream = fs.createWriteStream("output.txt");

stream.write("Hello");
stream.write(" World");

stream.end();

Conceptually:

Data
 ↓
Writable Stream
 ↓
File


3. Duplex Stream

A Duplex stream can both read and write.

Readable
    ↕
Duplex
    ↕
Writable

A common example is a TCP network socket.

It can:

receive data
    +
send data

4. Transform Stream
A Transform stream can read data, modify/transform it, and output the transformed data.

Input
  ↓
Transform
  ↓
Modified Output

For example:

Original data
     ↓
Compression
     ↓
Compressed data

Compression libraries commonly use Transform streams.

5. pipe()

This is a very important Stream concept.

pipe() connects a Readable Stream to a Writable Stream.

Example:

const fs = require("fs");

const readable = fs.createReadStream("input.txt");
const writable = fs.createWriteStream("output.txt");

readable.pipe(writable);

Flow:

input.txt
    ↓
Readable Stream
    ↓
pipe()
    ↓
Writable Stream
    ↓
output.txt

or instagram upload example

Network request
      ↓
Readable Stream
      ↓
Instagram server
      ↓
Writable Stream
      ↓
Storage

Instead of manually handling every chunk, pipe() connects the streams and manages the flow.

6. Why is pipe() useful?

Imagine copying a 5 GB file.

You don't want:

5 GB file
   ↓
Memory
   ↓
Write file

Instead:

5 GB file
   ↓
Readable Stream
   ↓
small chunks
   ↓
Writable Stream
   ↓
destination

This is much more memory-efficient.

7. Stream Events

You may see these frequently:

Readable stream
stream.on("data", (chunk) => {
    console.log(chunk);
});

data → a chunk of data is available.

stream.on("end", () => {
    console.log("Reading finished");
});

end → no more data is available.

For errors:

stream.on("error", (err) => {
    console.log(err);
});

You don't need to memorize every stream event now. These are the important ones to recognize.

8. Streams vs Buffers

This is a common confusion.

Buffer

Holds a chunk of binary data in memory.

Stream

Controls the continuous flow of data, usually processing it chunk by chunk.

Think:

Stream = conveyor belt
Buffer = one box of data on the belt

9. Streams in HTTP

Streams are heavily used in Node.js HTTP communication.

For example:

Client
  ↓
HTTP Request Stream
  ↓
Node.js
  ↓
Process chunks

And:

Node.js
  ↓
HTTP Response Stream
  ↓
Client

This becomes useful when handling things like:

Large file downloads
File uploads
Video streaming
Interview Questions
Q: What is a Stream?

A Stream is a mechanism for processing data incrementally in chunks instead of loading the entire data into memory.

Q: Why use Streams?

Streams improve memory efficiency and allow processing to begin before the entire data is available.

Q: What are the four types of Streams?

Readable, Writable, Duplex, and Transform.

Q: What is pipe()?

pipe() connects a readable stream to a writable stream and transfers data between them efficiently.

Q: Buffer vs Stream?

A Buffer represents a chunk of binary data in memory, while a Stream provides a mechanism for continuously processing data, usually chunk by chunk.

The important picture
                    STREAMS
                       │
       ┌───────────────┼────────────────┐
       ↓               ↓                ↓
   Readable         Writable         Duplex
       │                                │
       │                          Read + Write
       ↓
    Transform
       │
   Read + modify + output

And the key relationship:

Large Data
    ↓
  Stream
    ↓
  Chunks
    ↓
  Buffers
    ↓
  Process

That's enough for Streams at your current level.

=================================================================

1. What is a REST API?

Interview answer
A REST API allows clients and servers to communicate using HTTP and follows REST principles such as stateless communication and resource-based URLs. In Node.js, Express is commonly used to build REST APIs. Requests contain methods, URLs, headers, and optionally a body. Express routes the request to the appropriate handler, which processes the request and returns a response containing a status code, headers, and usually JSON data.

A REST API is an API that follows REST principles and uses HTTP methods to perform operations on resources. In Node.js applications, frameworks such as Express are commonly used to build REST APIs.

Example resource:

/users

Operations:

GET     /users       → Get users
GET     /users/10    → Get user 10
POST    /users       → Create user
PUT     /users/10    → Update user
DELETE  /users/10    → Delete user


# 4. REST API with Node.js

## 1. What is an API?

### Interview answer

> **An API (Application Programming Interface) is a way for two software applications to communicate with each other.**

For example:

Frontend
↓ HTTP Request
Backend API
↓
Database
↓
Backend API
↓ HTTP Response
Frontend

A frontend doesn't directly need to access the database. It communicates with the backend through APIs.

---

# 2. What is a REST API?

### Interview answer

> **A REST API is an API that follows REST (Representational State Transfer) principles and uses HTTP to perform operations on resources.**

A **resource** is the data/entity our API works with.

Examples:

**/users | /products | /orders | /books**

For a user resource:

GET /users
POST /users
GET /users/10
PUT /users/10
PATCH /users/10
DELETE /users/10

---

# 3. How does a REST API work?

Suppose a frontend wants user #10.

Frontend
│
│ GET /users/10
↓
Node.js REST API
│
│ Find user
↓
Database
│
│ User data
↓
Node.js
│
│ JSON response
↓
Frontend

The client and server communicate using **HTTP requests and responses**.

---

# 4. HTTP Request

An HTTP request generally contains:

HTTP Request
├── Method
├── URL
├── Headers
├── Body (optional)
└── Query parameters

Example:

POST /users?active=true
Content-Type: application/json
Authorization: Bearer token

{
"name": "Ajay",
"age": 30
}

Here:

**POST → HTTP method | /users → URL path | ?active=true → query parameter | Content-Type → header | Authorization → header | {name, age} → request body**

---

# 5. HTTP Response

The server sends a response containing things such as:

HTTP Response
├── Status code
├── Headers
└── Body

Example:

HTTP/1.1 200 OK
Content-Type: application/json

{
"id": 10,
"name": "Ajay"
}

So:

**Status → 200 | Header → Content-Type | Body → JSON user object**

---

# 6. HTTP Methods

These are essential for REST APIs.

### GET

Used to **retrieve data**.

GET /users

Get all users.

GET /users/10

Get user 10.

---

### POST

Used to **create a new resource**.

POST /users

Body:

{
"name": "Ajay",
"age": 30
}

---

### PUT

Used to **replace/update an existing resource**.

PUT /users/10

Example:

{
"name": "Ajay Sharma",
"age": 31
}

Conceptually, PUT sends the representation of what the resource should become.

---

### PATCH

Used for a **partial update**.

PATCH /users/10

Body:

{
"age": 31
}

Only the age is changed.

### PUT vs PATCH

> **PUT generally replaces the complete resource representation, while PATCH modifies only selected fields.**

---

### DELETE

Used to delete a resource.

DELETE /users/10

---

# 7. REST Endpoint

An **endpoint** is a specific URL + HTTP method through which an API provides functionality.

For example:

GET /users

is different from:

POST /users

Even though the path is the same, they represent different operations.

Think:

GET /users → retrieve
POST /users → create

---

# 8. URL Parameters

Suppose:

GET /users/25

Here `25` is a **path parameter** (also called a route parameter).

It identifies a specific resource.

`/users/:id`
        ↑
      parameter

Example in Express:

app.get("/users/:id", (req, res) => {
console.log(req.params.id);
});

Request:

/users/25

Result:

req.params.id → "25"

---

# 9. Query Parameters

Query parameters are used to provide additional information to the server, commonly for filtering, searching, sorting, or pagination.

Example:

GET /users?city=bangalore&age=30

Here:

city = bangalore
age = 30

Express:

app.get("/users", (req, res) => {
console.log(req.query.city);
console.log(req.query.age);
});

Result:

bangalore
30

### Path vs Query parameter

/users/25
        ↑
identifies a specific resource

/users?city=bangalore
       ↑
additional/filtering information

---

# 10. Request Body

The body contains data sent to the server, commonly with `POST`, `PUT`, or `PATCH`.

Example:

{
"name": "Ajay",
"email": "[ajay@example.com](mailto:ajay@example.com)"
}

In Express:

app.use(express.json());

app.post("/users", (req, res) => {
console.log(req.body);
});

`express.json()` is middleware that parses incoming JSON request bodies and makes the parsed data available through:

req.body

---

# 11. HTTP Headers

Headers contain additional information about the request or response.

Example:

Content-Type: application/json
Authorization: Bearer token
Accept: application/json

Common headers you'll encounter:

### `Content-Type`

Tells the server what format the request body uses.

Content-Type: application/json

### `Authorization`

Usually carries authentication credentials/token.

Authorization: Bearer eyJ...

### `Accept`

Tells the server what response format the client prefers.

---

# 12. HTTP Status Codes

You should know these very well for interviews.

### 2xx — Success

**200 OK**

Request succeeded.

**201 Created**

A new resource was successfully created.

**204 No Content**

Request succeeded but there's no response body.

---

### 4xx — Client-side/request error

**400 Bad Request**

Request is invalid.

**401 Unauthorized**

Authentication is missing or invalid.

**403 Forbidden**

The client is authenticated but doesn't have permission.

**404 Not Found**

Requested resource doesn't exist.

**409 Conflict**

Request conflicts with the current state of the resource, such as attempting to create a duplicate resource where uniqueness is required.

---

### 5xx — Server error

**500 Internal Server Error**

Something went wrong on the server.

Simple way to remember:

**2xx → Success | 4xx → Client/request problem | 5xx → Server problem**

---

# 13. 401 vs 403 — Important Interview Question

### 401

> **The request does not have valid authentication credentials.**

Think:

> "Who are you?"

Example:

**No token | Invalid token | Expired token**

### 403

> **The user is authenticated but doesn't have permission to perform the operation.**

Think:

> "I know who you are, but you're not allowed to do this."

Example:

User → authenticated
User → tries admin-only operation
↓
403 Forbidden

---

# 14. REST API in Node.js using Express

Node.js provides the runtime, while **Express is commonly used to simplify HTTP server and REST API development**.

Install:

npm install express

Example:

const express = require("express");

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
res.status(200).json([
{ id: 1, name: "Ajay" },
{ id: 2, name: "Rahul" }
]);
});

app.post("/users", (req, res) => {
const user = req.body;

res.status(201).json({
    message: "User created",
    user: user
});

});

app.listen(3000, () => {
console.log("Server running on port 3000");
});

---

# 15. What happens when we call `GET /users`?

Browser/Postman
↓
GET /users
↓
Express receives request
↓
Matches GET /users route
↓
Route handler executes
↓
res.status(200).json(...)
↓
HTTP Response
↓
Client

---

# 16. What is Routing?

### Interview answer

> **Routing is the process of determining how an application responds to a particular HTTP method and URL path.**

Example:

app.get("/users", handler);
app.post("/users", handler);
app.get("/users/:id", handler);
app.delete("/users/:id", handler);

Each route handles a different request.

---

# 17. Middleware in REST APIs

Middleware sits between the request and the final route handler.

Request
↓
Middleware
↓
Middleware
↓
Route Handler
↓
Response

Example:

app.use((req, res, next) => {
console.log(req.method, req.url);
next();
});

`next()` passes control to the next middleware/route.

Middleware is commonly used for:

**Authentication | Authorization | Validation | Logging | Parsing JSON | Error handling**

We'll use this heavily when we learn **Authentication**.

---

# 18. REST Principles — What should you know?

You don't need to memorize a huge definition, but know the important REST concepts.

### 1. Client-Server

Client and server are separate.

Client → API → Server

### 2. Stateless

Each request should contain the information needed to process it.

The server shouldn't depend on previous requests to understand the current request.

For example:

Request 1 → contains authentication token
Request 2 → also contains authentication token

The server doesn't assume:

> "This is the same client who made the previous request."

This becomes particularly important when we study JWT.

### 3. Resource-based

REST focuses on resources:

**/users | /products | /orders**

rather than action-oriented URLs like:

/getAllUsers
/createUser
/deleteUser

Prefer:

GET /users
POST /users
DELETE /users/10

### 4. Uniform interface

Clients interact with resources using standard HTTP methods and representations such as JSON.

---

# 19. REST API Best Practices

For interviews, know these:

### Use nouns for resources

Prefer:

**/users | /products | /orders**

Instead of:

/getUsers
/createProduct
/deleteOrder

### Use HTTP methods correctly

GET → retrieve
POST → create
PUT → replace
PATCH → partial update
DELETE → delete

### Use appropriate status codes

Don't return `200` for every situation.

Created → 201
Not found → 404
Invalid request → 400
Not authenticated → 401
Not authorized → 403
Server failure → 500

### Return consistent JSON

Example:

{
"id": 10,
"name": "Ajay"
}

For errors, you might use:

{
"message": "User not found"
}

---

# 20. REST API Complete Flow

This is the main picture to remember:

CLIENT
│
│ HTTP Request
↓
Express / Node.js
│
Middleware
│
Route
│
Controller
│
Business Logic
│
Database
│
↓
Response
│
JSON + Status
│
↓
CLIENT
==================



2. Why Express?

Node.js itself provides the http module, but writing a complete REST API using only http.createServer() becomes cumbersome.

Express provides convenient features for:

Routing
Middleware
Request/response handling
Error handling
Building REST APIs

So the typical stack is:

Client
   ↓
HTTP
   ↓
Express
   ↓
Node.js
   ↓
   
Database
3. Basic Express Server

Install Express:

npm install express

Then:

const express = require("express");

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
    res.json([
        { id: 1, name: "Ajay" },
        { id: 2, name: "Rahul" }
    ]);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

Now:

GET http://localhost:3000/users

returns:

[
  {
    "id": 1,
    "name": "Ajay"
  },
  {
    "id": 2,
    "name": "Rahul"
  }
]
4. What is a Route?

A route defines:

Which HTTP request should execute which handler.

Example:

app.get("/users", (req, res) => {
    res.json(users);
});

Breakdown:

app.get()
   ↓
HTTP method = GET

"/users"
   ↓
URL path

(req, res)
   ↓
Request + Response

res.json(...)
   ↓
Send response
5. Request and Response
req

Contains information about the incoming request.

For example:

req.params
req.query
req.body
req.headers
res

Used to send the response.

Examples:

res.json(data);
res.send("Hello");
res.status(201).json(data);
6. URL Parameters

Suppose:

GET /users/10

Route:

app.get("/users/:id", (req, res) => {
    console.log(req.params.id);
});

Output:

10

Here:

req.params.id

gets the value from:

/users/:id
7. Query Parameters

Suppose:

GET /users?city=bangalore

Access it with:

app.get("/users", (req, res) => {
    console.log(req.query.city);
});

Output:

bangalore
Difference
/users/10
       ↑
   URL parameter

/users?city=bangalore
       ↑
   Query parameter
8. Request Body

For a POST request:

{
    "name": "Ajay",
    "age": 30
}

Express needs:

app.use(express.json());

Then:

app.post("/users", (req, res) => {
    console.log(req.body);

    res.status(201).json({
        message: "User created",
        user: req.body
    });
});

req.body contains:

{
    name: "Ajay",
    age: 30
}
9. HTTP Methods

For REST APIs, remember:

Method	Purpose
GET	Retrieve data
POST	Create data
PUT	Replace/update a resource
PATCH	Partially update a resource
DELETE	Delete a resource

Example:

GET     /users
POST    /users
GET     /users/10
PUT     /users/10
PATCH   /users/10
DELETE  /users/10
10. HTTP Status Codes

You should definitely know these for interviews:

Status	Meaning
200	Successful request
201	Resource created
204	Success, no response body
400	Bad request
401	Authentication required/failed
403	Authenticated but not allowed
404	Resource not found
500	Internal server error
Important interview distinction
401 → "Who are you?"
403 → "I know who you are, but you're not allowed."
11. Middleware

This is very important in Express.

Interview answer

Middleware is a function that runs during the request-response cycle and can access the request, response, and the next middleware function.

Example:

app.use((req, res, next) => {
    console.log("Request received");
    next();
});

Flow:

Request
   ↓
Middleware
   ↓
next()
   ↓
Route handler
   ↓
Response

Middleware is commonly used for:

Authentication
Logging
Validation
Parsing request body
Error handling

You'll use middleware heavily when we reach Authentication.

12. REST API Architecture

In a real application, you normally don't put everything inside app.js.

A common structure is:

src/
│
├── routes/
│   └── userRoutes.js
│
├── controllers/
│   └── userController.js
│
├── services/
│   └── userService.js
│
├── models/
│   └── userModel.js
│
└── app.js

Conceptually:

Request
   ↓
Route
   ↓
Controller
   ↓
Service
   ↓
Database
   ↓
Service
   ↓
Controller
   ↓
Response

This is similar to the layered architecture you've used with Spring Boot.

Interview Questions
Q: How do you create REST APIs in Node.js?

We can use Node's built-in HTTP module, but frameworks such as Express are commonly used because they provide convenient routing, middleware, request handling, and error handling features.

Q: What is Express?

Express is a lightweight Node.js web framework used to build web servers and REST APIs.

Q: What is middleware?

Middleware is a function that executes during the request-response cycle and can modify the request or response, perform logic, or pass control to the next middleware using next().

Q: Difference between req.params, req.query, and req.body?

req.params contains values from URL parameters, req.query contains query-string parameters, and req.body contains data sent in the request body.

Example:

/users/10?active=true
req.params.id      // 10
req.query.active   // true

For:

{
    "name": "Ajay"
}
req.body.name      // Ajay
What you need to remember
Express
   ↓
Routes
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Database



