# 5. Authentication in Node.js

Authentication is an important REST API topic. We'll focus on the concepts you actually need for interviews and understand JWT-based authentication, which is very common in Node.js APIs.

1. Authentication vs Authorization

This is the first thing you must be clear about.

Authentication

Authentication verifies who the user is.

Example:

Username + Password
       ↓
Is this really Ajay?
       ↓
Authentication
Authorization

Authorization determines what an authenticated user is allowed to do.

Example:

Ajay is authenticated
       ↓
Can Ajay delete users?
       ↓
Authorization

Easy way to remember:

Authentication → Who are you?
Authorization  → What can you do?

2. Basic Authentication Flow

Suppose a user logs in:

Client
   ↓
POST /login
   ↓
username + password
   ↓
Server
   ↓
Verify credentials
   ↓
Authentication successful
   ↓
Create authentication information
   ↓
Send it to client

For subsequent requests:

Client
   ↓
Request + authentication information

   ↓
Server
   ↓
Verify authentication
   ↓
Allow / Reject request
3. Why can't we just send username/password every time?

We generally shouldn't.

Instead, after successful login, the server provides some form of credential/token that the client can use for later requests.

One popular approach is:

JWT (JSON Web Token)

4. What is JWT?
Interview answer

JWT is a compact, self-contained token format commonly used for stateless authentication. After successful login, the server generates a token and sends it to the client. The client sends that token with subsequent requests, allowing the server to verify the user's identity.

When a user logs in, the server verifies the credentials and generates a signed JWT containing appropriate claims.
The client sends this token with subsequent requests, usually through the Authorization Bearer header. Authentication middleware extracts and verifies the token. If valid, the decoded user information is attached to the request and execution continues to the protected route. Authorization can then check the user's roles or permissions before allowing the operation.


Typical flow:

Login
  ↓
username + password
  ↓
Server verifies
  ↓
JWT generated
  ↓
Client receives JWT

Then:

Client
  ↓
GET /profile
Authorization: Bearer <JWT>
  ↓
Server verifies JWT
  ↓
Request allowed

5. JWT Structure

A JWT looks roughly like:

xxxxx.yyyyy.zzzzz

It has three parts:

Header.Payload.Signature
1. Header

Contains information such as the signing algorithm.

Example conceptually:

{
  "alg": "HS256",
  "typ": "JWT"
}
2. Payload

Contains claims/data.

Example:

{
  "userId": 101,
  "role": "user"
}
3. Signature

Used to verify that the token hasn't been modified and, depending on the signing approach, to authenticate the issuer.

Conceptually:

Header + Payload
       ↓
Signing process + secret/private key
       ↓
Signature

6. Important: JWT Payload is NOT encrypted

This is a very common interview question.

JWT payload is typically encoded, not encrypted.

Therefore:

Do not put sensitive information such as passwords inside the JWT payload.

Someone who obtains the token can decode its header and payload.

The signature is what helps verify integrity/authenticity; it doesn't hide the payload.

7. JWT Authentication Flow

This is the most important diagram:

              LOGIN
                │
                ↓
      Username + Password
                │
                ↓
            Server
                │
          Verify password
                │
          ┌─────┴─────┐
          │           │
       Invalid       Valid
          │           │
          ↓           ↓
        401         Create JWT
                      │
                      ↓
                 Send to Client

Then:

Client
   │
   │ GET /profile
   │ Authorization: Bearer JWT
   ↓
Authentication Middleware
   │
   ↓
Verify JWT
   │
 ┌─┴─────────────┐
 │               │
Invalid         Valid
 │               │
 ↓               ↓
401           Continue
                 │
                 ↓
             Route Handler
                 │
                 ↓
              Response
8. Where does the JWT go?

Usually in the HTTP Authorization header:

Authorization: Bearer <token>

Example:

GET /profile
Authorization: Bearer eyJhbGciOi...

Bearer means:

The client is presenting this token as its authentication credential.

9. JWT Authentication in Express

A simplified example:

const jwt = require("jsonwebtoken");

const token = jwt.sign(
    { userId: 101 },
    "secret-key",
    { expiresIn: "1h" }
);

This generates a JWT.

Then middleware can verify it:

function authenticate(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "secret-key");

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

Then protect a route:

app.get("/profile", authenticate, (req, res) => {

    res.json({
        message: "Profile accessed",
        user: req.user
    });

});

Flow:

GET /profile
     ↓
authenticate middleware
     ↓
Verify JWT
     ↓
req.user = decoded data
     ↓
next()
     ↓
/profile handler
10. Why do we use Middleware for Authentication?

Because many routes may need authentication.

Without middleware:

app.get("/profile", verifyToken, handler);
app.get("/orders", verifyToken, handler);
app.get("/payments", verifyToken, handler);

The authentication logic is centralized in:

verifyToken middleware

So:

Request
   ↓
Authentication Middleware
   ↓
Valid?
 ┌─┴───┐
No    Yes
↓      ↓
401   next()
        ↓
      Route

This is one of the most important uses of Express middleware.

11. Passwords — Never Store Plain Text

Suppose user registers:

{
  "username": "ajay",
  "password": "mypassword123"
}

Never store:

mypassword123

directly in the database.

Instead, use a password hashing algorithm/library such as bcrypt or Argon2.

Conceptually:

Password
   ↓
Hashing algorithm
   ↓
Password hash
   ↓
Database

During login:

Entered password
       ↓
Compare with stored hash
       ↓
Match?

The original password should not need to be recovered from the stored hash.

12. Authentication vs JWT

Don't confuse these.

Authentication is the overall process:

"Verify who the user is."

JWT is one mechanism that can be used to maintain/represent authentication after login.

Other authentication approaches include:

Session-based authentication
JWT/token-based authentication
OAuth/OpenID Connect for certain delegated/federated authentication scenarios

For your Node.js fundamentals, JWT is the important one to understand well.

13. Session vs JWT — Basic Difference

## Session-based
Login
 ↓
Server creates session
 ↓
Session stored on server
 ↓
Client gets session identifier
 ↓
Client sends it later
 ↓
Server looks up session


## JWT
Login
 ↓
Server creates signed JWT
 ↓
Client stores token
 ↓
Client sends token
 ↓
Server verifies token

The important conceptual difference is:

Traditional server-side sessions keep authentication state on the server, while JWT-based authentication can carry the necessary claims in the token itself, allowing a more stateless design.

14. JWT Advantages
Stateless

The server doesn't necessarily need to maintain a session record for every authenticated client.

Scalable

Multiple server instances can verify the token using the appropriate signing key/secret without requiring a shared in-memory session store.

Self-contained

The token can contain claims such as:

{
  "userId": 101,
  "role": "admin"
}
15. JWT Limitations

JWT isn't automatically better than sessions.

Important limitations:

Token revocation can be harder

If a JWT is valid for 1 hour, simply deleting a server-side session doesn't automatically invalidate an already-issued token.

Token theft

If someone gets a valid token, they may be able to use it until it expires or is otherwise invalidated.

Therefore:

Use HTTPS.
Keep token lifetimes appropriate.
Protect token storage.
Don't put sensitive data in the payload.
Use strong signing keys/secrets.

16. Authentication vs Authorization Example

Suppose:

User logs in
     ↓
JWT verified
     ↓
Authentication successful

But the user tries:

DELETE /users/10

and only admins are allowed.

Then:

Authenticated?
      ↓
     YES
      ↓
Is user an admin?
      ↓
     NO
      ↓
403 Forbidden

So:

Authentication → JWT verification
Authorization  → Check role/permission
17. Interview Questions
Q: What is authentication?

Authentication is the process of verifying the identity of a user or client.

Q: What is authorization?

Authorization determines what an authenticated user or client is allowed to access or perform.

Q: What is JWT?

JWT is a compact, signed token format commonly used for stateless authentication. After login, the server issues a token, and the client sends it with subsequent requests.

Q: What are the three parts of JWT?

Header, Payload, and Signature.

Q: Is JWT encrypted?

Normally, no. A standard signed JWT is encoded and signed, not encrypted, so its payload should not contain sensitive information.

Q: Where is JWT usually sent?

Usually in the HTTP Authorization header using the Bearer scheme.

Q: Why use authentication middleware?

It centralizes authentication logic and allows us to protect multiple routes without duplicating token verification code.

Q: What is the difference between 401 and 403?

401 means valid authentication credentials are missing or invalid. 403 means the client is authenticated but does not have permission to perform the requested operation.

The complete authentication picture
                  REGISTER
                     ↓
              Password hashing
                     ↓
                  Database
                     ↓
                    LOGIN
                     ↓
             Verify credentials
                     ↓
                Create JWT
                     ↓
                  CLIENT
                     ↓
       Authorization: Bearer <JWT>
                     ↓
            Authentication Middleware
                     ↓
                Verify JWT
                 /       \
             Invalid     Valid
                ↓          ↓
              401       req.user
                           ↓
                       next()
                           ↓
                     Authorization
                     (role/permission)
                       /       \
                     No         Yes
                     ↓            ↓
                   403         Route
                                  ↓
                              Response


  When a user logs in, the server verifies the credentials and generates a signed JWT containing appropriate claims. The client sends this token with subsequent requests, usually through the Authorization Bearer header. Authentication middleware extracts and verifies the token. If valid, the decoded user information is attached to the request and execution continues to the protected route. Authorization can then check the user's roles or permissions before allowing the operation.

  ==========================

  # 6. Cluster in Node.js

Cluster is an advanced Node.js architecture concept. The main reason for using it is to take advantage of multiple CPU cores.

1. Why do we need Cluster?

Remember:

Node.js runs JavaScript on a single main thread.

Suppose your machine has:

8 CPU cores

A single Node.js process primarily uses one main JavaScript thread.

CPU
├── Core 1 → Node.js process
├── Core 2 → mostly unused by this process
├── Core 3 → mostly unused
├── Core 4 → mostly unused
...

For a CPU-heavy or high-throughput server, we may want to use multiple cores.

That's where Cluster comes in.

2. What is Cluster?
Interview answer

The Node.js Cluster module allows us to create multiple Node.js processes, called worker processes, that can run on different CPU cores and share the workload of handling incoming connections.

Conceptually:

                    Primary
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
       Worker 1     Worker 2     Worker 3
       Core 1       Core 2       Core 3
          │            │            │
          └────────────┼────────────┘
                       ↓
                   Requests

Modern Node.js documentation uses the term primary process.

3. Simple Cluster Example
const cluster = require("cluster");
const os = require("os");
const http = require("http");

if (cluster.isPrimary) {

    const cpuCount = os.cpus().length;

    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }

} else {

    http.createServer((req, res) => {
        res.end(`Handled by worker ${process.pid}`);
    }).listen(3000);
}

Suppose your machine has 4 CPU cores.

The primary process can create:

Worker 1
Worker 2
Worker 3
Worker 4

Each worker is a separate Node.js process.

4. How does a request get handled?

Conceptually:

             Incoming Requests
                    ↓
              Cluster system
                    ↓
        ┌───────────┼───────────┐
        ↓           ↓           ↓
     Worker 1    Worker 2    Worker 3
        ↓           ↓           ↓
     Response    Response    Response

The workload can therefore be distributed among workers.

The exact scheduling behavior is platform-dependent, so don't say:

"Request 1 always goes to worker 1, request 2 to worker 2..."

That's not guaranteed.

5. Why use Cluster?
Main reason:

To utilize multiple CPU cores by running multiple Node.js processes.

Benefits can include:

Better utilization of multi-core CPUs
Increased request-handling capacity
Improved resilience if one worker crashes
Ability to restart workers individually

For example:

Without Cluster

8 cores
   ↓
1 Node.js process

With Cluster:

8 cores
   ↓
8 Node.js worker processes

6. Important: Workers are separate processes

This is very important for interviews.

Each worker has its own:

Memory
Event Loop
V8 instance
JavaScript execution environment

Conceptually:

Worker 1
 ├── V8
 ├── Event Loop
 └── Memory

Worker 2
 ├── V8
 ├── Event Loop
 └── Memory

Therefore, workers do not automatically share normal JavaScript variables.

For example:

let count = 0;

If Worker 1 changes count:

Worker 1 → count = 10

Worker 2 doesn't automatically see:

count = 10

because it has its own memory.

For shared state, applications commonly use external systems such as a database or Redis, depending on the use case.

7. Cluster vs Event Loop

Don't confuse them.

Event Loop

Handles asynchronous work within a Node.js process.

Process
   ↓
Event Loop
   ↓
Async operations
Cluster

Creates multiple Node.js processes.

Cluster
 ├── Process 1 → Event Loop
 ├── Process 2 → Event Loop
 ├── Process 3 → Event Loop
 └── Process 4 → Event Loop

So Cluster doesn't replace the Event Loop.

It creates multiple processes, and each worker has its own Event Loop.

8. Cluster vs Worker Threads

This is a very common interview question.

Cluster

Creates multiple processes.

Cluster
 ↓
Process 1
Process 2
Process 3

Each process has separate memory.

Worker Threads

Creates multiple threads within a Node.js process.

Node.js Process
 ├── Main Thread
 ├── Worker Thread
 └── Worker Thread

Worker Threads are particularly useful for CPU-intensive JavaScript work.

Simple difference

Cluster is mainly used to run multiple Node.js processes and utilize multiple CPU cores, while Worker Threads are used to run JavaScript work in additional threads within a process, especially for CPU-intensive tasks.

9. Cluster vs Load Balancer

Don't confuse these either.

A load balancer distributes traffic between multiple server instances/processes.

For example:

                Load Balancer
                 /    |    \
                ↓     ↓     ↓
             Server Server Server

Cluster can distribute work among workers belonging to the same Node.js application/host.

In larger production systems, you may see both:

                Load Balancer
                 /         \
                ↓           ↓
          Node.js Server  Node.js Server
             Cluster         Cluster
             /  \             /  \
          Worker Worker    Worker Worker
10. What happens if a worker crashes?

One advantage of having workers is that the primary process can detect worker termination and create a replacement if the application is designed to do so.

Example:

cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);

    cluster.fork();
});

Conceptually:

Worker 1
   ↓
Crash
   ↓
Primary detects it
   ↓
Create replacement worker

This can improve resilience.

11. Is Cluster always necessary?

No.

Don't say:

"Every Node.js application should use Cluster."

Modern deployments often run multiple application instances using containers/process managers/platform orchestration and place them behind a load balancer.

Cluster is still important to understand for Node.js interviews, but whether to use it depends on the deployment architecture.

Interview Questions
Q: What is Cluster in Node.js?

The Cluster module allows Node.js applications to create multiple worker processes that can run across multiple CPU cores and handle incoming connections.

Q: Why do we use Cluster?

Primarily to utilize multiple CPU cores and increase the capacity of a Node.js server.

Q: Are cluster workers threads?

No. Cluster workers are separate Node.js processes.

Q: Do cluster workers share memory?

No. Each worker has its own memory space. Shared application state generally needs an external mechanism such as a database or Redis.

Q: Does every worker have an Event Loop?

Yes. Each worker is a separate Node.js process with its own Event Loop and V8 environment.

Q: Cluster vs Worker Threads?

Cluster creates multiple processes, while Worker Threads create additional threads within a process. Worker Threads are particularly useful for CPU-intensive JavaScript operations.

The complete picture
                    NODE.JS
                       │
                  One process
                       │
                   Event Loop
                       │
              ┌────────┴────────┐
              │                 │
        Async I/O          JS execution

With Cluster:

                    CLUSTER
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
       Worker 1     Worker 2     Worker 3
          │            │            │
     Event Loop    Event Loop    Event Loop
          │            │            │
       Memory       Memory       Memory
The one-line takeaway

Event Loop helps one Node.js process handle asynchronous work efficiently; Cluster allows multiple Node.js processes to utilize multiple CPU cores.