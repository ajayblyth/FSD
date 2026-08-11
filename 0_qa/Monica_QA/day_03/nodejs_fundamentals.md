# Part 1 — Node.js Fundamentals

# Node.js vs Browser

The key difference is **where JavaScript runs and what APIs are available**.

---

## Comparison

| Feature                | Browser                                                 | Node.js                              |
| ---------------------- | ------------------------------------------------------- | ------------------------------------ |
| **JavaScript engine**  | V8 (Chrome), SpiderMonkey (Firefox), etc.               | V8                                   |
| **Main purpose**       | Run web applications/UI                                 | Run server-side/backend applications |
| **DOM**                | ✅ Available                                             | ❌ Not available by default           |
| **`window`**           | ✅ Available                                             | ❌ Not available                      |
| **`document`**         | ✅ Available                                             | ❌ Not available                      |
| **File system access** | ❌ Restricted                                            | ✅ Through `fs` module                |
| **HTTP/server APIs**   | Client-side networking APIs such as `fetch()`           | ✅ `http`, networking APIs            |
| **Modules**            | ES Modules                                              | CommonJS + ES Modules                |
| **Package ecosystem**  | Packages commonly used through browser tooling/bundlers | npm ecosystem                        |
| **Global object**      | `window`                                                | `global` / `globalThis`              |
| **Typical use**        | UI, DOM manipulation, user interaction                  | APIs, servers, backend services      |

---

## Important Point

Both **Browser JavaScript and Node.js use JavaScript**, but they provide **different runtime environments and APIs**.

Browser:

JavaScript
    ↓
Browser Runtime
    ↓
DOM + Web APIs
    ↓
UI / User Interaction

Node.js:

JavaScript
    ↓
Node.js Runtime
    ↓
Node.js APIs
    ↓
Files / HTTP / Streams / Buffers / Backend

---

## Interview Answer

> Browser JavaScript runs inside a browser and provides APIs such as the DOM, `window`, and `document` for building and manipulating web interfaces. Node.js runs JavaScript outside the browser and provides server-side APIs such as file-system, HTTP, streams, and networking APIs. Node.js also provides access to the npm ecosystem for third-party packages.

what is Node.js
----------------------

Node.js is a JavaScript runtime environment that allows us to execute JavaScript code outside the browser. It is built on V8 JavaScript engine and provides a runtime environment with features such as non-blocking I/O, an event-driven architecture, built-in modules, and access to the npm ecosystem. This makes Node.js suitable for building server-side applications, REST APIs, real-time applications, and other backend services.

I/O = Input/Output operations, such as:

Reading/writing files
Database operations
Network requests
HTTP requests
Communication with external services

Non-blocking I/O
Node.js does not wait for slow I/O operations like file access, database queries, or network requests to finish before handling other requests.
It starts the operation and continues executing other code; when the operation completes, its callback/promise is handled.

Event-driven architecture
Node.js uses events and callbacks/listeners to respond when asynchronous operations or other events occur.
Instead of continuously waiting for an operation, Node.js reacts to the event when it is ready.


What each part means
Node.js
│
├── V8 Engine
│     → Executes JavaScript
│
├── Node.js APIs
│     → File system, HTTP, OS, streams, buffers, etc.
│
├── Built-in modules
│     → fs, http, path, os, events, crypto, etc.
│
├── npm ecosystem
│     → Access to thousands of third-party packages
│
├── Event-driven architecture
│     → Handles events and asynchronous operations
│
└── Non-blocking I/O
      → Doesn't unnecessarily wait for I/O operations

"Apart from executing JavaScript through V8, Node.js provides built-in APIs and modules for tasks such as file-system access, HTTP, networking, streams, buffers, and cryptography. It also has access to the npm ecosystem for installing third-party packages."


### Now understand the definition

There are three important things in that answer:

| JavaScript           | V8                                         | Node.js                                                                                   |
| -------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Programming language | JavaScript engine that executes JavaScript | Runtime environment that provides everything needed to run JavaScript outside the browser |

### Normally, JavaScript runs inside a browser

JavaScript
↓
Browser
↓
JavaScript Engine
↓
Executes

For example, Chrome uses the **V8 engine** to execute JavaScript.

### Node.js takes the V8 engine and provides additional capabilities

JavaScript
↓
Node.js
↓
V8 Engine
↓
Executes JavaScript

Node.js also provides APIs for things that browser JavaScript normally doesn't provide, such as:

**File System | Networking | HTTP | Operating System | Processes**

---

# 2. What does "runtime environment" mean?

This is important because interviewers may ask:

> "What do you mean by runtime environment?"

A **runtime environment** is the environment that provides the necessary components and APIs to execute a program while it is running.

### For JavaScript in a browser

JavaScript
↓
Browser Runtime
↓
V8 / JavaScript Engine
↓
Browser APIs
↓
Execution

The browser provides things like:

**document | window | localStorage | fetch()**

### Node.js provides a different environment

JavaScript
↓
Node.js Runtime
↓
V8
↓
Node APIs
↓
Execution

For example:

const fs = require("fs");

`fs` is a **Node.js API** that allows us to work with the file system.

So Node.js isn't just **"JavaScript."**

It provides an environment in which JavaScript can execute and interact with the **operating system / network / etc.**

---

# 3. Is Node.js a programming language?

### Interview answer

No. Node.js is **not a programming language**. JavaScript is the programming language, and Node.js is a runtime environment used to execute JavaScript outside the browser.

For example:

const name = "Ajay";
console.log(name);

Here:

**JavaScript → language | Node.js → environment executing the code | V8 → engine executing the JavaScript**

---

# 4. Is Node.js a framework?

### Interview answer

No. Node.js is a **runtime environment**, not a framework. Frameworks such as **Express.js** are built on top of Node.js.

Think of it like:

JavaScript
↓
Node.js
↓
Express.js
↓
Backend / REST API

We'll not go into Express now because that's outside our current scope.

---

# 5. Why was Node.js created?

Originally, JavaScript was mainly used in browsers.

For example:

Browser
↓
JavaScript
↓
UI interaction
DOM manipulation
Form validation

Backend development was commonly done using languages such as:

**Java | PHP | Python | C# | Ruby**

Node.js made it possible to use JavaScript on the **server side**.

So you could have:

**Frontend → JavaScript | Backend → JavaScript + Node.js**

This is one reason Node.js became very popular.

---

# 6. JavaScript vs Node.js

This is a very common interview question.

| JavaScript                        | Node.js                                        |
| --------------------------------- | ---------------------------------------------- |
| Programming language              | Runtime environment                            |
| Defines language features         | Provides environment to execute JS             |
| Can run in different environments | One environment for running JS outside browser |
| Browser provides browser APIs     | Node provides Node APIs                        |
| Can manipulate DOM in browser     | No built-in browser DOM                        |
| Used for frontend and backend     | Commonly used for backend                      |

For example, this is browser-specific:

document.getElementById("title");

`document` comes from the **browser's DOM environment**.

Node.js doesn't provide the browser DOM.

But Node.js provides APIs such as:

const fs = require("fs");

which can interact with the **file system**.

---

# 7. Node.js vs Browser JavaScript

This distinction is important.

### Browser

JavaScript
↓
Browser
↓
V8 Engine + Browser APIs
↓
DOM
Window
localStorage
etc.

### Node.js

JavaScript
↓
Node.js
↓
V8 Engine + Node APIs
↓
File System
HTTP
Networking
OS
etc.

So the **JavaScript language is largely the same**, but the **environment and APIs available to it are different**.

For example:

### Browser

console.log(window);

`window` is a browser global.

### Node.js

console.log(process);

`process` is a Node.js global object containing information/control related to the current Node.js process.

---

# 8. What is V8?

This is one of the most important fundamentals.

### Interview answer
V8 is Google's open-source JavaScript engine, primarily written in C++, and used by Chrome and Node.js.
It parses, compiles, and executes JavaScript code, converting it into optimized machine code that the CPU can execute.
In Node.js, V8 handles JavaScript execution, while Node.js provides additional APIs such as fs, http, streams, and other runtime features.

Parsing → V8 reads and analyzes your JavaScript code to understand its structure and check syntax.
Compilation → V8 converts that understood code into executable machine code (more precisely, V8 uses multiple execution/optimization stages rather than simply compiling everything straight to machine code).
### Simplified

JavaScript code
↓
V8
↓
Machine-level execution

For example:

const a = 10;
const b = 20;
console.log(a + b);

V8 is responsible for executing this JavaScript.


### Think

Node.js
├── V8
│   └── Executes JavaScript
│
├── Node APIs
│
└── libuv
└── Handles asynchronous operations

We'll study **libuv and the Event Loop** in the architecture section.

---

# 9. What are the main features of Node.js?

For interviews, know these properly:

### 1. JavaScript runtime

Allows JavaScript to execute outside the browser.

### 2. V8 engine

Executes JavaScript code.

### 3. Event-driven

Node.js uses **events and callbacks/promises** to handle asynchronous operations.

### 4. Non-blocking I/O

Node.js can initiate an I/O operation and continue processing other work instead of waiting for that operation to finish.

### 5. Single main JavaScript thread

JavaScript execution primarily happens on one main thread.

**Important:** This doesn't mean Node.js can never use other threads. We'll understand this properly when studying the thread pool.

### 6. Cross-platform

Node.js can run on:

**Windows | Linux | macOS**

### 7. Suitable for I/O-heavy applications

Examples:

**REST APIs | Web servers | Real-time applications | Chat applications | Microservices**

---

# 10. What does I/O mean?

You'll hear this constantly when learning Node.js architecture.

**I/O = Input / Output**

### Examples

| Input                   | Output                |
| ----------------------- | --------------------- |
| Read data from database | Write file            |
| Receive HTTP request    | Send HTTP response    |
| Read file               | Send data to database |
| Receive network data    | Send network data     |

So:

I/O
├── File system
├── Database
├── Network
└── External services

Node.js is particularly good at handling applications that perform a lot of these operations.

---

# 11. Why is Node.js good for I/O-heavy applications?

Suppose a request requires reading data from a database.

### A simplified blocking approach would look like:

Request 1
↓
Database operation
↓
WAIT
↓
Database result
↓
Continue

During that waiting period, the thread may not be able to efficiently handle other work depending on the execution model.

### Node.js uses an asynchronous, non-blocking model:

Request 1
↓
Start database operation
↓
Continue doing other work
↓
Request 2
Request 3
Request 4
↓
Database completes
↓
Handle result

This is one of the key ideas behind Node.js architecture.

**Don't memorize this flow yet. We'll understand exactly how the Event Loop makes this possible.**

---

# 12. Is Node.js single-threaded?

Very common interview question.

### Interview answer

Node.js executes JavaScript code primarily on a **single main thread**. However, Node.js can use **background threads** through its underlying mechanisms, such as **libuv's thread pool**, for certain operations.

So don't answer:

> ❌ **"Node.js has only one thread."**

That's not accurate.

Better:

> **The JavaScript execution model is single-threaded, while Node.js can use additional threads for certain background operations.**

We'll go deep into this in **Node.js Architecture**.

---

# 13. Simple Node.js program

Create:

app.js

const name = "Ajay";

console.log(`Hello ${name}`);

Run:

node app.js

Output:

Hello Ajay

Notice that you didn't need:

<script>

and you didn't need a browser.

Node.js directly executes the JavaScript file.

---

# 14. First important interview summary

If the interviewer asks:

### "What is Node.js?"

Say:

Node.js is a JavaScript runtime environment that allows us to execute JavaScript outside the browser. It is built on Google's V8 JavaScript engine and provides an event-driven, non-blocking I/O model, making it well suited for scalable server-side applications and APIs.

### If they cross-question:

**"Is Node.js a language?"**

No. JavaScript is the language; Node.js is the runtime environment.

**"Is Node.js a framework?"**

No. Node.js is a runtime environment. Frameworks such as Express.js are built on top of it.

**"What engine does Node.js use?"**

Google's V8 JavaScript engine.

**"Why is Node.js good for I/O-heavy applications?"**

Because its non-blocking, asynchronous I/O model allows it to continue handling other work while waiting for I/O operations to complete.

**"Is Node.js completely single-threaded?"**

No. JavaScript execution primarily occurs on a single main thread, but Node.js can use background threads for certain operations.

==========================
# 2. Synchronous vs Asynchronous

This is a fundamental Node.js concept because it leads directly to **blocking/non-blocking I/O and the Event Loop**.

---

## 1. Synchronous

### Interview definition

> **Synchronous execution means operations are performed one after another, and the next operation waits until the current operation finishes.**

In simple words:

**Do one thing → wait → finish → do next thing.**

### Example

console.log("Start");
console.log("Processing...");
console.log("End");

### Output

Start
Processing...
End

Each statement executes in order.

A more meaningful example:

const fs = require("fs");

console.log("Start");

const data = fs.readFileSync("file.txt", "utf8");

console.log(data);

console.log("End");

Here `readFileSync()` reads the file **synchronously**.

Node.js waits for the file-reading operation to finish before moving to:

console.log("End");

So:

Start
↓
Read file
↓
WAIT
↓
File completed
↓
Print file
↓
End

---

# 2. Asynchronous

### Interview definition

> **Asynchronous execution allows an operation to start without making the program wait for that operation to complete. Once the operation completes, its result can be handled through a callback, Promise, or async/await.**

Example:

const fs = require("fs");

console.log("Start");

fs.readFile("file.txt", "utf8", (err, data) => {
console.log(data);
});

console.log("End");

### Output will generally be:

Start
End
[file content]

Why?

`readFile()` starts the file operation, but Node.js doesn't wait for it to finish.

It continues executing:

console.log("End");

When the file operation completes, the callback is executed.

Conceptually:

Start
↓
Start file reading
↓
Don't wait
↓
End
↓
File reading completes
↓
Callback executes

---

# 3. Synchronous vs Asynchronous

| Synchronous           | Asynchronous                                    |
| --------------------- | ----------------------------------------------- |
| Executes sequentially | Operation can continue in background            |
| Next operation waits  | Next operation can continue                     |
| Can block execution   | Generally avoids blocking while waiting for I/O |
| Simpler flow          | Better for many I/O operations                  |
| `readFileSync()`      | `readFile()`                                    |

---

# 4. Important: Asynchronous does NOT mean "runs simultaneously"

This is a common misunderstanding.

If we say:

> "Node.js executes something asynchronously"

it doesn't necessarily mean JavaScript is running multiple pieces of JavaScript simultaneously on multiple threads.

It means:

> **Node.js can start an operation and continue executing other JavaScript instead of waiting for that operation to finish.**

For example:

console.log("A");

setTimeout(() => {
console.log("B");
}, 2000);

console.log("C");

### Output:

A
C
B

Node.js doesn't stop JavaScript execution for two seconds waiting for the timer.

The exact mechanism behind this involves the **Event Loop**, which we'll study shortly.

---

# 5. Blocking vs Non-blocking

These terms are closely related.

### Blocking

> **A blocking operation prevents further execution from proceeding until that operation completes.**

Example:

const data = fs.readFileSync("file.txt");

The execution is blocked while the file is being read.

Read file
↓
WAIT
↓
Continue

### Non-blocking

> **A non-blocking operation allows execution to continue while waiting for the operation to complete.**

Example:

fs.readFile("file.txt", (err, data) => {
console.log(data);
});

Conceptually:

Start file read
↓
Continue execution
↓
Other work
↓
File completes
↓
Handle result

---

# 6. Why is this important in Node.js?

Imagine a server receives 1,000 requests.

Suppose every request needs to perform some I/O operation:

Request
↓
Database
↓
Wait

With a blocking approach, the server can spend a lot of time waiting.

Node.js is designed around:

> **Asynchronous + non-blocking I/O**

So while one operation is waiting for I/O:

Request 1 → Database → waiting
Request 2 → Process
Request 3 → Process
Request 4 → Database → waiting
Request 5 → Process

Node.js can continue doing other work.

This is a major reason Node.js works well for applications with lots of:

**HTTP requests | Database operations | File operations | Network operations**

---

# 7. One important distinction

Don't say:

> "Asynchronous means non-blocking."

They are related, but not exactly the same concept.

Think of them this way:

**Synchronous / Asynchronous** → describes **how execution is organized in time**.

**Blocking / Non-blocking** → describes **whether execution has to wait before continuing**.

In Node.js, asynchronous APIs are generally designed to provide **non-blocking I/O**.

---

# Interview Questions

### Q: What is synchronous execution?

> Synchronous execution means operations execute sequentially, and the next operation waits for the current operation to complete.

### Q: What is asynchronous execution?

> Asynchronous execution allows an operation to start without waiting for it to finish. Once it completes, its result is handled through mechanisms such as callbacks, Promises, or async/await.

### Q: What is blocking?

> Blocking means the execution cannot proceed until the current operation completes.

### Q: What is non-blocking?

> Non-blocking means execution can continue without waiting for an operation, particularly an I/O operation, to complete.

### Q: Why does Node.js use non-blocking I/O?

> To efficiently handle many concurrent I/O operations without making the main JavaScript execution wait for each operation.

---

## Remember this flow

Synchronous
↓
Wait for operation
↓
Blocking

Asynchronous
↓
Don't wait
↓
Continue other work
↓
Handle result later
============================
3. Event-Driven Architecture

This is one of the core concepts of Node.js and directly connects to the Event Loop.

1. What is Event-Driven Architecture?
Interview answer

Event-driven architecture is a programming model where the flow of the application is determined by events. 
When an event occurs, a corresponding handler or callback is executed.
Node.js uses an event-driven architecture to efficiently handle asynchronous operations.

In simple words:

Something happens → an event occurs → Node.js reacts to it.

2. What is an Event?

An event is simply something that happens in the application.

Examples:

HTTP request received
File reading completed
Timer completed
Database operation completed
User sends data
Connection established

For example:

Client sends HTTP request
        ↓
   "request" event
        ↓
Request handler executes
        ↓
Response sent

3. Event Handler
An event handler is the function that runs when a particular event occurs.

Example:

const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("login", () => {
    console.log("User logged in");
});

emitter.emit("login");

Output:

User logged in

What's happening?

emitter.on("login", handler)
        ↓
Register handler

emitter.emit("login")
        ↓
"login" event occurs
        ↓
Handler executes
Important methods

on() → listens for/registers an event.

emitter.on("login", handler);

emit() → triggers the event.

emitter.emit("login");

You don't need to memorize EventEmitter deeply yet; we'll cover it as a Node.js API later.

4. Why is Node.js event-driven?

Because Node.js frequently deals with asynchronous operations.

For example:

const fs = require("fs");

fs.readFile("file.txt", "utf8", (err, data) => {
    console.log("File reading completed");
});

console.log("Other work");

Conceptually:

Start file read
      ↓
Continue other work
      ↓
File reading completes
      ↓
Completion event/callback becomes ready
      ↓
Callback executes

So Node.js doesn't sit waiting for the file operation.

5. Real-world analogy

Imagine a restaurant.

You order food:

You → "I want a pizza"

The waiter doesn't stand in the kitchen staring at the pizza until it's ready.

Instead:

Order placed
    ↓
Kitchen prepares pizza
    ↓
Waiter handles other customers
    ↓
Pizza ready event
    ↓
Waiter brings pizza

That's similar to the basic idea behind event-driven systems.

Node.js can:

Request 1 → waiting for database
Request 2 → being processed
Request 3 → waiting for file
Request 4 → being processed

When an asynchronous operation completes, Node.js can handle its result.

6. Event-Driven vs Traditional Sequential Thinking
Sequential/blocking thinking
Request 1
   ↓
Wait
   ↓
Finish
   ↓
Request 2
   ↓
Wait
   ↓
Finish
Event-driven/non-blocking model
Request 1 → Start operation ────────┐
                                    ↓
Request 2 → Start operation         │
                                    ↓
Request 3 → Process                 │
                                    ↓
Operation 1 completes → Handler ←───┘

The key idea is:

Node.js doesn't need to continuously wait for every asynchronous operation to finish.

7. Event-Driven Architecture + Event Loop

This is where the concepts start connecting.

You already learned:

Asynchronous
      ↓
Don't wait for I/O

Now:

Event-driven
      ↓
Wait for events/results
      ↓
Event Loop
      ↓
Execute the appropriate callback

The Event Loop is responsible for coordinating this asynchronous execution.

Don't worry about the detailed Event Loop phases yet—we'll cover that separately.

8. Important Interview Question
Q: What does event-driven mean in Node.js?

Node.js follows an event-driven architecture where operations generate events, and corresponding callback functions or handlers are executed when those events occur. This model allows Node.js to handle asynchronous operations efficiently without blocking the main JavaScript thread.

Q: Why is event-driven architecture useful?

It allows Node.js to handle many concurrent I/O operations efficiently by responding to events instead of waiting synchronously for each operation to complete.

Remember this

The three concepts we've learned are connected:

Asynchronous
     ↓
Don't wait for I/O
     ↓
Non-blocking
     ↓
Operation completes
     ↓
Event/result becomes available
     ↓
Event Loop
     ↓
Callback/handler executes
=======================================

# 4. Node.js Modules

 They explain **how we split code into multiple files and reuse it**.

---

## 1. What is a Module?

### Interview answer

> **A module is a reusable and independent piece of code that keeps related functionality at one place.
In Node.js, each file is treated as a separate module by default.**

Instead of putting everything in one file:

app.js
├── user logic
├── authentication
├── database logic
└── utility functions

we can split it:

app.js | user.js | auth.js | database.js | utils.js

Then import only what we need.

---

# 2. Why do we use modules?

Main reasons:

### 1. Code organization

Large applications can be divided into smaller files.

### 2. Reusability

Write functionality once and reuse it.

### 3. Maintainability

Changes to one functionality can be isolated to its module.

### 4. Encapsulation

A module can expose only the functionality that other files need.

---

# 3. Simple Example

### `math.js`

function add(a, b) {
return a + b;
}

module.exports = add;

### `app.js`

const add = require("./math");

console.log(add(10, 20));

### Output

30

### Flow

math.js
↓
exports add()
↓
app.js
↓
require("./math")
↓
uses add()

---

# 4. `module.exports`

This is an important Node.js concept.

`module.exports` is used to specify **what a module makes available to other modules**.

Example:

function add(a, b) {
return a + b;
}

module.exports = add;

Now another file can access it:

const add = require("./math");

Think:

module.exports
↓
"What should this file make available?"

---

# 5. Exporting Multiple Things

You can export multiple functions as an object.

### `math.js`

function add(a, b) {
return a + b;
}

function subtract(a, b) {
return a - b;
}

module.exports = {
add,
subtract
};

Then:

### `app.js`

const math = require("./math");

console.log(math.add(10, 5));
console.log(math.subtract(10, 5));

### Output

15
5

You can also destructure:

const { add, subtract } = require("./math");

---

# 6. What is `require()`?

### Interview answer

> **`require()` is the CommonJS mechanism used to import or load modules in Node.js.**

Example:

const math = require("./math");

This loads the module from:

./math

Then we can use whatever that module exported.

---

# 7. Built-in Modules

Node.js comes with many built-in modules.

You don't need to install them.

Examples:

**fs → File system | path → File/directory paths | http → HTTP functionality | os → Operating system information | events → Event handling**

Example:

const fs = require("fs");

const data = fs.readFileSync("file.txt", "utf8");

console.log(data);

Here:

require("fs")
↓
Node.js built-in module
↓
File system functionality

---

# 8. User-defined Modules

Modules we create ourselves are called user-defined/custom modules.

Example:

project/
│
├── app.js
└── calculator.js

`calculator.js`:

function multiply(a, b) {
return a * b;
}

module.exports = multiply;

`app.js`:

const multiply = require("./calculator");

console.log(multiply(5, 4));

### Output

20

Notice the `./`.

require("./calculator");

`./` means the module is located **relative to the current file**.

---

# 9. Types of Node.js Modules

For interviews, know these three categories:

### 1. Core/Built-in modules

Provided by Node.js itself.

require("fs");
require("path");
require("http");

### 2. Local/User-defined modules

Created by us.

require("./math");

### 3. Third-party modules

Installed using npm.

For example:

npm install express

Then:

const express = require("express");

We'll discuss npm separately.

---

# 10. CommonJS vs ES Modules

This is important in modern Node.js.

Node.js supports two major module systems:

**CommonJS | ES Modules (ESM)**

### CommonJS

Uses:

const fs = require("fs");

module.exports = something;

### ES Modules

Uses:

import fs from "fs";

export default something;

or:

export { add };

---

## Quick comparison

| CommonJS                          | ES Modules                           |
| --------------------------------- | ------------------------------------ |
| `require()`                       | `import`                             |
| `module.exports`                  | `export`                             |
| Traditional Node.js module system | Standard JavaScript module system    |
| Common in older Node.js projects  | Common in modern JavaScript projects |

For example:

### CommonJS

// math.js

const add = (a, b) => a + b;

module.exports = add;

// app.js

const add = require("./math");

console.log(add(2, 3));

### ES Modules

// math.js

export default function add(a, b) {
return a + b;
}

// app.js

import add from "./math.js";

console.log(add(2, 3));

---

# 11. Important Interview Question

### Q: What is a module in Node.js?

> A module is a reusable and independent unit of code. Node.js treats each file as a separate module, which helps with code organization, reusability, and encapsulation.

### Q: What is `require()`?

> `require()` is the CommonJS mechanism used to load or import a module.

### Q: What is `module.exports`?

> `module.exports` defines the values or functionality that a CommonJS module exposes to other modules.

### Q: What are the types of modules in Node.js?

> Core modules, user-defined modules, and third-party modules.

### Q: CommonJS vs ES Modules?

> CommonJS uses `require()` and `module.exports`, while ES Modules use `import` and `export`.

---

## One thing to remember

Module
↓
A reusable piece of code

require()
↓
Loads a CommonJS module

module.exports
↓
Defines what the module exposes
=====================================
# 5. npm, package.json & Dependencies

These three concepts are closely related, so we'll learn them together.

---

## 1. What is npm?

### Interview answer

> **npm stands for Node Package Manager. It is the default package manager for Node.js and is used to install, manage, update, and share JavaScript packages and their dependencies.**

For example, if your project needs Express:

npm install express

npm downloads Express and adds it to your project.

---

## 2. Is npm part of Node.js?

Technically, **npm is a separate package manager**, but it is distributed with Node.js.

When you install Node.js, npm is normally installed along with it.

You can check:

node -v
npm -v

For example:

v22.x.x
10.x.x

---

# 3. What is a package?

A **package** is reusable JavaScript/Node.js code that can be installed and used in a project.

Examples:

**express | mongoose | axios | jsonwebtoken**

Instead of writing everything yourself, you can install an existing package.

For example:

npm install express

Then:

const express = require("express");

---

# 4. What is `package.json`?

This is one of the **most important Node.js fundamentals**.

### Interview answer

> **`package.json` is the configuration and metadata file of a Node.js project. It contains information such as the project name, version, scripts, dependencies, and other project configuration.**

A basic example:

{
"name": "my-app",
"version": "1.0.0",
"scripts": {
"start": "node app.js"
},
"dependencies": {
"express": "^5.0.0"
}
}

Think of `package.json` as the **identity and configuration file of your project**.

---

# 5. How do we create `package.json`?

Run:

npm init

npm asks questions such as:

**package name | version | description | entry point | author | license**

Or use:

npm init -y

This creates `package.json` with default values.

---

# 6. What are dependencies?

Suppose your application uses Express:

npm install express

npm adds Express under:

"dependencies": {
"express": "^5.0.0"
}

### Interview definition

> **Dependencies are packages required by the application at runtime.**

Examples:

**express | mongoose | jsonwebtoken**

These are normally installed using:

npm install package-name

---

# 7. What are devDependencies?

Some packages are needed only during development, testing, or building.

For example:

**nodemon | eslint | testing libraries**

Install them using:

npm install --save-dev nodemon

They appear under:

"devDependencies": {
"nodemon": "^3.0.0"
}

### Interview answer

> **Dependencies are required for the application to run, while devDependencies are primarily required during development, testing, or build processes.**

## Simple comparison

| dependencies          | devDependencies                  |
| --------------------- | -------------------------------- |
| Needed by application | Needed mainly during development |
| Runtime packages      | Development/build/test tools     |
| `npm install express` | `npm install --save-dev nodemon` |

---

# 8. What are npm scripts?

`package.json` can contain scripts:

{
"scripts": {
"start": "node app.js",
"dev": "nodemon app.js"
}
}

Now instead of typing:

node app.js

you can run:

npm start

And:

npm run dev

### Interview point

> **npm scripts provide shortcuts for commonly used project commands.**

---

# 9. What is `package-lock.json`?

When you install packages, npm creates:

package-lock.json

### Interview answer

> **`package-lock.json` records the exact versions of installed packages and their dependency tree, helping ensure consistent installations across different environments.**

Why is that important?

Suppose:

Developer machine → Express 5.0.1
Production server → Express 5.0.3

Different versions could potentially behave differently.

The lock file records the exact resolved versions.

So when another developer runs:

npm install

npm can reproduce the dependency tree more consistently.

---

# 10. `package.json` vs `package-lock.json`

Very common interview question.

### `package.json`

Contains:

**Project metadata | Scripts | Dependency declarations | Configuration**

### `package-lock.json`

Contains:

**Exact resolved package versions | Dependency tree | Integrity information**

Easy way to remember:

package.json
↓
"What packages does my project need?"

package-lock.json
↓
"Exactly which versions were installed?"

---

# 11. What is `node_modules`?

When you run:

npm install

npm downloads packages into:

node_modules/

For example:

project/
│
├── node_modules/
├── package.json
├── package-lock.json
└── app.js

`node_modules` contains your installed packages **and their dependencies**.

### Important

Usually you **don't commit `node_modules` to Git**.

Instead, commit:

**package.json | package-lock.json**

Then another developer can run:

npm install

to recreate `node_modules`.

---

# 12. `npm install` vs `npm install package`

This distinction is useful.

### Install all project dependencies

npm install

npm reads:

**package.json | package-lock.json**

and installs the required packages.

### Install a new package

npm install express

This installs Express and adds it to `dependencies`.

---

# 13. One complete example

Suppose we're creating a Node.js project.

mkdir my-app
cd my-app
npm init -y

Then:

npm install express

Project becomes:

my-app/
│
├── node_modules/
├── package.json
├── package-lock.json
└── app.js

`package.json` contains something like:

{
"name": "my-app",
"version": "1.0.0",
"dependencies": {
"express": "^5.0.0"
}
}

Now our project knows:

> "I depend on Express."

---

# Interview Questions

### Q: What is npm?

> npm is the default package manager for Node.js, used to install, manage, update, and share packages and dependencies.

### Q: What is package.json?

> It is the main configuration and metadata file of a Node.js project. It contains project information, scripts, and dependency declarations.

### Q: What is package-lock.json?

> It records the exact resolved versions and dependency tree of installed packages to provide more consistent installations.

### Q: What is the difference between dependencies and devDependencies?

> Dependencies are required by the application at runtime, while devDependencies are mainly used during development, testing, or building.

### Q: What is node_modules?

> It is the directory where npm installs the project's packages and their dependencies.

---

## Current Fundamentals Picture

We've covered:

Node.js
↓
Runtime environment
↓
V8 executes JavaScript
↓
Synchronous vs Asynchronous
↓
Blocking vs Non-blocking
↓
Event-driven architecture
↓
Modules
↓
npm
↓
package.json
↓
Dependencies
