Node.js Architecture — Complete Picture

Interview answer

Node.js follows an event-driven, non-blocking I/O architecture. JavaScript runs primarily on a single main thread using the V8 engine. The Event Loop, provided by libuv, coordinates asynchronous operations. Operations that require background processing may use libuv's thread pool or the operating system's asynchronous I/O facilities. Once an operation completes, its callback is scheduled and eventually executed on the main JavaScript thread.

Now understand the flow.

1. Main components
                    Node.js
                       │
          ┌────────────┴────────────┐
          │                         │
       V8 Engine                  libuv
          │                         │
     Executes JS              Event Loop
          │                         │
     Call Stack              Async I/O handling
                                    │
                         ┌──────────┴──────────┐
                         │                     │
                       OS                 Thread Pool
                         │                     │
                         └──────────┬──────────┘
                                    ↓
                              Operation complete
                                    ↓
                               Callback Queue
                                    ↓
                               Event Loop
                                    ↓
                                Call Stack
                                    ↓
                              JavaScript runs

The important components are:

V8 → executes JavaScript
Call Stack → tracks currently executing JavaScript
Event Loop → coordinates asynchronous work
libuv → provides the Event Loop and async I/O mechanisms
Thread Pool → handles certain background operations
Queues → hold callbacks/tasks waiting to be processed
2. What actually happens with an async operation?

Consider:

const fs = require("fs");

console.log("Start");

fs.readFile("data.txt", "utf8", (err, data) => {
    console.log(data);
});

console.log("End");

Simplified flow:

1. "Start" → Call Stack
                 ↓
2. readFile() → Node/libuv
                 ↓
3. File reading happens asynchronously
                 ↓
4. Main thread continues
                 ↓
5. "End" → Call Stack
                 ↓
6. File reading completes
                 ↓
7. Callback becomes ready
                 ↓
8. Event Loop picks it when appropriate
                 ↓
9. Callback → Call Stack
                 ↓
10. console.log(data)

Output:

Start
End
[file contents]
The key idea

The main JavaScript thread doesn't sit waiting for the file.

That's the heart of Node.js's non-blocking architecture.

3. What exactly does the Event Loop do?
Interview answer

The Event Loop continuously checks whether the JavaScript Call Stack is available and processes callbacks/tasks that are ready to execute, allowing Node.js to handle asynchronous operations without blocking the main JavaScript thread.

Simplified:

        Event Loop
            ↓
Is Call Stack free?
       /       \
     No         Yes
     ↓           ↓
Keep            Take
processing      ready task
                 ↓
             Call Stack


4. What is the Call Stack?

The Call Stack tracks JavaScript functions currently being executed.

Example:

function a() {
    b();
}

function b() {
    console.log("Hello");
}

a();

Conceptually:

a()
 ↓
b()
 ↓
console.log()

When console.log() finishes:

console.log() removed
 ↓
b() removed
 ↓
a() removed
Important interview point

JavaScript execution happens on the Call Stack, which is primarily a single stack/thread in Node.js.

# 5. What is libuv?
Interview answer

libuv is a  library used by Node.js to provide asynchronous I/O capabilities. It provides the Event Loop and manages a thread pool for certain operations.

Think:

Node.js
   ↓
libuv
 ├── Event Loop
 ├── Async I/O coordination
 └── Thread Pool

You don't need to memorize libuv's internal implementation.

Just remember:

V8 executes JavaScript; libuv enables Node.js's asynchronous I/O architecture.

6. What is the Thread Pool?

Node.js has a main JavaScript thread, but certain operations can be handled using background threads.

libuv provides a thread pool for operations such as:

Some file-system operations
Some DNS operations
Cryptographic operations
Certain CPU-related library operations

Conceptually:

Main JS Thread
      │
      ↓
   Event Loop
      │
      ↓
Background operation
      │
      ↓
Thread Pool
      │
      ↓
Operation complete
      │
      ↓
Event Loop
      │
      ↓
Main JS Thread
Important correction

Don't say:

"Every asynchronous operation uses the thread pool."

❌ Incorrect.

Some network I/O is handled using the operating system's asynchronous networking mechanisms rather than libuv's thread pool.

7. Why does Node.js say "single-threaded"?

This is a favorite interview trap.

Wrong:

"Node.js has only one thread."

Better:

Node.js executes JavaScript primarily on a single main thread, but it can use additional background threads for certain operations.

So:

                 Node.js
                    │
          Main JavaScript Thread
                    │
               Event Loop
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
       Network             Thread Pool
        / OS                 │
                            ↓
                     Background work

This is why Node.js can handle many concurrent I/O operations even though JavaScript itself runs on one main thread.

8. What happens when multiple requests arrive?

Imagine:

Request 1 → Database
Request 2 → File
Request 3 → API
Request 4 → CPU calculation

Node.js doesn't create a new JavaScript thread for every request.

Instead, it uses the same main JavaScript execution thread and asynchronous mechanisms:

                Node.js
                   │
              Event Loop
                   │
       ┌───────────┼───────────┐
       ↓           ↓           ↓
   Request 1   Request 2   Request 3ls
       ↓           ↓           ↓
     Async       Async       Async
      I/O         I/O         I/O
       │           │           │
       └───────────┴───────────┘
                   ↓
             Results ready
                   ↓
              Event Loop
                   ↓
             Call Stack

This is why Node.js can handle a large number of concurrent I/O-bound requests efficiently.

9. What about CPU-heavy work?

This is an important limitation.

Suppose you run:

while (true) {
    // extremely heavy work
}

The main JavaScript thread is busy.

The Event Loop cannot process other JavaScript work effectively.

Heavy CPU task
      ↓
Main thread busy
      ↓
Event Loop can't process normally
      ↓
Other requests are delayed

Therefore:

Node.js is excellent for I/O-heavy workloads, but CPU-intensive operations can block the main JavaScript thread unless they are moved to appropriate mechanisms such as Worker Threads or separate processes.

That's an important interview point.

10. Complete Architecture in One Diagram

This is the diagram I'd recommend remembering:

                         NODE.JS
                            │
             ┌──────────────┴──────────────┐
             │                             │
          V8 Engine                      libuv
             │                             │
      Executes JavaScript              Event Loop
             │                             │
        Call Stack                 Async operations
                                           │
                              ┌────────────┴────────────┐
                              │                         │
                           OS / Network             Thread Pool
                              │                         │
                              └────────────┬────────────┘
                                           ↓
                                    Operation completes
                                           ↓
                                    Callback/Task Queue
                                           ↓
                                      Event Loop
                                           ↓
                                      Call Stack
                                           ↓
                                   JavaScript executes
Architecture — Interview Questions
Q: Explain Node.js architecture.

Node.js uses an event-driven, non-blocking architecture. V8 executes JavaScript on the main thread, while libuv provides the Event Loop and asynchronous I/O mechanisms. Certain operations can use a background thread pool. When asynchronous operations complete, their callbacks are scheduled and eventually executed on the main JavaScript thread.

Q: What is V8?

V8 is Google's JavaScript engine used by Node.js to execute JavaScript code.

Q: What is libuv?

libuv is a cross-platform library that provides Node.js with asynchronous I/O capabilities, including the Event Loop and thread pool.

Q: What is the Event Loop?

The Event Loop coordinates asynchronous operations and schedules ready callbacks for execution on the JavaScript thread when the Call Stack is available.

Q: Is Node.js single-threaded?

JavaScript execution primarily occurs on a single main thread, but Node.js can use background threads for certain operations.

Q: Why is Node.js good for I/O-heavy applications?

Because its non-blocking I/O model allows the main JavaScript thread to continue processing other work while I/O operations are being handled asynchronously.

Q: What is a major limitation of Node.js?

CPU-intensive operations can block the main JavaScript thread and delay other requests, so CPU-heavy work should be handled using mechanisms such as Worker Threads or separate processes.

===============
Creating an HTTP Server in Node.js

Node.js provides a built-in http module that allows us to create an HTTP server without installing any external package.

Interview answer

The Node.js http module provides APIs to create HTTP servers and handle incoming HTTP requests and outgoing responses.

Basic example
const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end("Hello from Node.js server");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});

Run:

node app.js

Then open:

http://localhost:3000

You'll get: