=====================================================================
CALLBACK (JavaScript)
=====================================================================

Definition
A callback is a function passed as an argument to another function
and executed later after a task is completed.

Purpose
--------------------------------------------------------------------------------
1) Allows one function to run after another function completes.
2) Helps handle asynchronous operations.
3) Makes code flexible by letting functions decide what to do next.

Example
--------------------------------------------------------------------------------
function mainFunction(callback){
    // some work
    callback();          // execute callback
}

OR with parameter:

function greet(name, callback) {
    console.log("Hello " + name);
    callback();          // execute callback
}

function sayBye() {
    console.log("Goodbye!");
}

greet("Ajay", sayBye);

Output
Hello Ajay
Goodbye!

Explanation
• sayBye is passed to greet() as a function argument.
• greet() executes the callback after printing the greeting.

--------------------------------------------------------------------------------
CALLBACK vs HIGHER ORDER FUNCTION
=====================================================================

Callback
--------------------------------------------------------------------------------
A callback is the function that is passed as an argument and executed later.

Higher Order Function
--------------------------------------------------------------------------------
A Higher Order Function is a function that:
1) Takes another function as an argument OR
2) Returns a function.

Relationship:
Higher Order Function  → receives the function.
Callback               → the function being passed.

Example
--------------------------------------------------------------------------------
function greet(){
    console.log("Hello");
}

function processUser(callback){   // Higher Order Function
    callback();                   // executes callback
}

processUser(greet);               // greet is the callback

Meaning
--------------------------------------------------------------------------------
processUser()  → Higher Order Function
greet()        → Callback

--------------------------------------------------------------------------------
CALLBACK IN EVENT HANDLING
=====================================================================

Definition
--------------------------------------------------------------------------------
In event handling, a callback is a function that runs when a specific event
occurs (like click, hover, keypress, etc).

Why Callbacks Are Used in Events
--------------------------------------------------------------------------------
JavaScript does not know when a user will interact with the page.
So we provide a function (callback) that should run whenever the event occurs.

Syntax
--------------------------------------------------------------------------------
element.addEventListener("event", callbackFunction);

Example
--------------------------------------------------------------------------------
let btn = document.querySelector("button");

btn.addEventListener("click", function(){
    console.log("Button clicked");
});

How It Works
--------------------------------------------------------------------------------
1) JavaScript registers the event listener.
2) It waits for the event.
3) When the event occurs (user clicks).
4) The callback function executes.

Flow
--------------------------------------------------------------------------------
User clicks button
        ↓
Event occurs
        ↓
Browser detects event
        ↓
Callback function executes

Another Example
--------------------------------------------------------------------------------
let heading = document.querySelector("h1");

heading.addEventListener("mouseover", function(){
    heading.style.color = "red";
});

Key Idea
--------------------------------------------------------------------------------
A callback is simply a function that is executed later when another
operation or event is completed.

--------------------------------------------------------------------------------
CALLBACK HELL
=====================================================================

Definition
--------------------------------------------------------------------------------
Callback hell occurs when multiple callbacks are nested inside
each other, creating a pyramid-like structure that makes the
code difficult to read, debug, and maintain.
It usually happens when asynchronous tasks depend on the result
of previous tasks.

Why It Happens
--------------------------------------------------------------------------------
When one asynchronous operation must finish before the next one
starts, developers place the next callback inside the previous
callback.

Example (Artificial)
--------------------------------------------------------------------------------
setTimeout(() => {
    console.log("Step 1");
    setTimeout(() => {
        console.log("Step 2");
        setTimeout(() => {
            console.log("Step 3");
            setTimeout(() => {
                console.log("Step 4");
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);

Execution
--------------------------------------------------------------------------------
Step 1 → waits 1 sec
Step 2 → waits 1 sec
Step 3 → waits 1 sec
Step 4 → waits 1 sec

Structure (Pyramid of Doom)
--------------------------------------------------------------------------------
callback
   └─ callback
        └─ callback
             └─ callback

Realistic Example
--------------------------------------------------------------------------------
Saving data step by step where each step depends on the previous one:

saveToDb(data1, function(){
    saveToDb(data2, function(){
        saveToDb(data3, function(){
            console.log("All data saved");
        });
    });
});

Problems
--------------------------------------------------------------------------------
• Code becomes deeply nested.
• Hard to read.
• Hard to debug.
• Hard to maintain.
• Error handling becomes complex.

--------------------------------------------------------------------------------
WHY PROMISES WERE INTRODUCED
=====================================================================

Before Promises, JavaScript handled asynchronous operations using callbacks,
which often led to deeply nested code called "Callback Hell".

Example:
task1(() => {
    task2(() => {
        task3(() => {
            task4(() => {

            });
        });
    });
});

Promises allow chaining instead of nesting.

Problems Before Promises
--------------------------------------------------------------------------------
1) CALLBACK HELL
   - Multiple asynchronous tasks nested inside each other
     creating a pyramid structure.
   - Hard to read and maintain.

2) DIFFICULT ERROR HANDLING
   - Errors must be handled separately in every callback.

Example:
task1((err,data)=>{
    if(err){ console.log(err); return; }
    task2((err,data)=>{
        if(err){ console.log(err); return; }
        task3((err,data)=>{
            if(err){ console.log(err); return; }
        });
    });
});

- Leads to repetitive and messy error handling.

3) POOR CODE READABILITY
   - Deep nesting makes it hard to understand the flow of execution.

4) HARD TO MANAGE MULTIPLE ASYNC OPERATIONS
   - Running multiple asynchronous tasks in sequence or parallel
     was complicated with plain callbacks.
     
=====================================================================
PROMISES IN JAVASCRIPT
=====================================================================

Definition
--------------------------------------------------------------------------------
A Promise is an object that represents the eventual completion
(success) or failure of an asynchronous operation and its resulting value.

Promises provide a cleaner way to handle asynchronous operations
compared to callbacks and help avoid callback hell.

=====================================================================
PROMISE STATES
=====================================================================

A Promise has three states:

1) Pending
--------------------------------------------------------------------------------
- Initial state.
- The asynchronous operation is still running.

2) Fulfilled (Resolved)
--------------------------------------------------------------------------------
- The operation completed successfully.
- The promise returns a value.

3) Rejected
--------------------------------------------------------------------------------
- The operation failed.
- The promise returns an error or reason for failure.

Visual Flow
--------------------------------------------------------------------------------
Pending
   ↓
Fulfilled (success)

OR

Pending
   ↓
Rejected (failure)

=====================================================================
CREATING A PROMISE
=====================================================================

Syntax
--------------------------------------------------------------------------------
let promise = new Promise(function(resolve, reject){

});

Meaning
--------------------------------------------------------------------------------
resolve() → called when operation succeeds.
reject()  → called when operation fails.

Example
--------------------------------------------------------------------------------
let promise = new Promise(function(resolve, reject){
    let success = true;
    if(success){
        resolve("Task completed");
    }
    else{
        reject("Task failed");
    }
});

=====================================================================
CONSUMING A PROMISE
=====================================================================

Promises are handled using:

• .then()  
• .catch()  
• .finally()  

THEN METHOD
--------------------------------------------------------------------------------
Runs when the promise is fulfilled.

promise.then(function(result){
    console.log(result);
});

CATCH METHOD
--------------------------------------------------------------------------------
Runs when the promise is rejected.

promise.catch(function(error){
    console.log(error);
});

FINALLY METHOD
--------------------------------------------------------------------------------
Runs regardless of success or failure.

promise.finally(function(){
    console.log("Operation finished");
});

Complete Example
=====================================================================
let promise = new Promise(function(resolve, reject){
    let internetSpeed = 6;
    if(internetSpeed > 4){
        resolve("Data saved");
    }
    else{
        reject("Weak internet");
    }
});

promise
.then(function(result){
    console.log(result);
})
.catch(function(error){
    console.log(error);
});

Output
--------------------------------------------------------------------------------
Data saved

=====================================================================
HOW PROMISES SOLVE CALLBACK HELL
=====================================================================

Promises allow chaining instead of nesting.

Example Using Promises
--------------------------------------------------------------------------------
saveToDb(data1)
.then(() => {
    return saveToDb(data2);
})
.then(() => {
    return saveToDb(data3);
})
.then(() => {
    console.log("All data saved");
})
.catch(() => {
    console.log("Error saving data");
});

Advantages
--------------------------------------------------------------------------------
• Flatter code structure  
• Easier error handling  
• Better readability  
• Better control over async operations  

=====================================================================
PROMISE CHAINING
=====================================================================

Multiple asynchronous operations can be executed sequentially.  
Each .then() returns a new promise.

Example
--------------------------------------------------------------------------------
function step1(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Step 1 completed");
            resolve();
        },1000);
    });
}

function step2(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Step 2 completed");
            resolve();
        },1000);
    });
}

step1()
.then(()=>{
    return step2();
})
.then(()=>{
    console.log("All steps done");
});

=====================================================================
PROMISE VS CALLBACK
=====================================================================

Callbacks
--------------------------------------------------------------------------------
• Can cause callback hell  
• Hard to manage errors  
• Deep nesting  

Promises
--------------------------------------------------------------------------------
• Use chaining (.then)  
• Better error handling (.catch)  
• More readable code  

=====================================================================
KEY METHODS OF PROMISE
=====================================================================

.then()     → handles success  
.catch()    → handles failure  
.finally()  → runs regardless of result

=====================================================================
ADDITIONAL PROMISE CONCEPTS
=====================================================================

=====================================================================
PROMISE RESOLUTION RULE
=====================================================================

A Promise can be settled only once.

Meaning
--------------------------------------------------------------------------------
A promise can either be resolved OR rejected, but not both,
and only one time.

Example
--------------------------------------------------------------------------------
let p = new Promise((resolve, reject) => {
    resolve("Success");
    reject("Failure");     // ignored
});

p.then((res)=>{
    console.log(res);
});

Output
--------------------------------------------------------------------------------
Success

Explanation
--------------------------------------------------------------------------------
Once resolve() runs, the promise state becomes Fulfilled
and it cannot change again.

=====================================================================
RETURN VALUE IN .then()
=====================================================================

Each .then() returns a new Promise.  
The value returned from one .then() becomes the input
of the next .then().

Example
--------------------------------------------------------------------------------
Promise.resolve(5)
.then((num)=>{
    return num * 2;
})
.then((result)=>{
    console.log(result);
});

Output
--------------------------------------------------------------------------------
10

=====================================================================
PROMISE STATIC METHODS
=====================================================================

JavaScript provides built-in methods to handle multiple promises.

Promise.all()
--------------------------------------------------------------------------------
- Runs multiple promises in parallel.  
- Resolves only when ALL promises resolve.  
- If any promise fails → it rejects.

Promise.race()
--------------------------------------------------------------------------------
- Returns the result of the FIRST settled promise
  (resolved or rejected).

Promise.allSettled()
--------------------------------------------------------------------------------
- Waits for all promises to finish regardless of success or failure.

Promise.any()
--------------------------------------------------------------------------------
- Returns the first successful promise.  
- Fails only if all promises fail.

=====================================================================
EXAMPLE USING PROMISE STATIC METHODS
=====================================================================

function task(name, delay, shouldFail=false){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(shouldFail){
                reject(name + " failed");
            }
            else{
                resolve(name + " completed");
            }
        }, delay);
    });
}

let p1 = task("Task1", 1000);
let p2 = task("Task2", 2000);
let p3 = task("Task3", 1500, true);

Promise.all([p1, p2])
.then((result)=>{
    console.log("Promise.all →", result);
})
.catch((err)=>{
    console.log("Promise.all Error →", err);
});

Promise.race([p1, p2])
.then((result)=>{
    console.log("Promise.race →", result);
})
.catch((err)=>{
    console.log("Promise.race Error →", err);
});

Promise.allSettled([p1, p2, p3])
.then((result)=>{
    console.log("Promise.allSettled →", result);
});

Promise.any([p3, p1, p2])
.then((result)=>{
    console.log("Promise.any →", result);
})
.catch((err)=>{
    console.log("Promise.any Error →", err);
});

=====================================================================
INTERVIEW ONE-LINE ANSWERS
=====================================================================

Callback
--------------------------------------------------------------------------------
A function passed as an argument to another function and executed
later after the task completes.

Callback Hell
--------------------------------------------------------------------------------
A situation where nested callbacks make asynchronous code difficult
to read, maintain, and debug.

Promise
--------------------------------------------------------------------------------
A Promise is an object that represents the eventual success
or failure of an asynchronous operation.

Promise States
--------------------------------------------------------------------------------
Pending, Fulfilled, Rejected.

Promise Chaining
--------------------------------------------------------------------------------
Executing multiple asynchronous operations sequentially
using multiple .then() methods.

=====================================================================
CORE IDEA
=====================================================================

Promises help manage asynchronous code in a structured way,
avoiding deeply nested callbacks and improving readability.
=====================================================================
ASYNC / AWAIT - JAVASCRIPT
=====================================================================

DEFINITION
--------------------------------------------------------------------------------
• `async` and `await` are modern syntax to handle asynchronous 
  operations in JavaScript.  
• Makes asynchronous code look **synchronous**, easier to read.  
• Built on top of Promises.

=====================================================================
ASYNC FUNCTION
=====================================================================

DEFINITION
--------------------------------------------------------------------------------
• Placing the `async` keyword before any function declaration or 
  expression transforms it into an **async function**.  
• Async functions **always return a Promise**, regardless of the 
  contents of the function.  
• Regular functions return values directly.  
• Async functions wrap return values automatically in a resolved Promise.

SYNTAX
--------------------------------------------------------------------------------
1. Function declaration:
async function functionName() {
    return value;   // wrapped in Promise automatically
}

2. Function expression:
const func = async function() {
    return value;   // returns a Promise
};

3. Arrow function:
const funcArrow = async () => {
    return value;   // returns a Promise
};

EXAMPLES
--------------------------------------------------------------------------------
Example 1: Simple async function
async function greet() {
    return "Hello World";
}
greet().then(msg => console.log(msg));

OUTPUT
--------------------------------------------------------------------------------
Hello World
> Explanation: greet() returns a Promise, not a direct string.

Example 2: Async function with await
async function fetchData() {
    let response = await fetch("https://api.example.com/data");
    let data = await response.json();
    return data;
}
fetchData().then(result => console.log(result));
> `await` pauses execution until the Promise resolves.

KEY POINTS
--------------------------------------------------------------------------------
1. Async functions = syntactic sugar over Promises.  
2. Return values are automatically wrapped in a resolved Promise.  
3. Works with function declarations, expressions, and arrow functions.  
4. Enables use of `await` for cleaner async code.  
5. Always use try/catch to handle errors inside async functions.

INTERVIEW LINE
--------------------------------------------------------------------------------
"Using the async keyword converts any function into a Promise-returning
function, allowing the use of await inside it for readable asynchronous code."

=====================================================================
AWAIT KEYWORD
=====================================================================

• Used inside `async` function.  
• Pauses execution until Promise is resolved.  

Syntax:
let result = await promise;  
> Execution waits here until the promise resolves or rejects.

Example 1: Simple await
--------------------------------------------------------------------------------
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncTask() {
    console.log("Start");
    await wait(2000);             // pauses 2 seconds
    console.log("End after 2 sec");
}

asyncTask();

OUTPUT (after 2 seconds)
--------------------------------------------------------------------------------
Start
End after 2 sec

Example 2: Fetch data (async/await)
--------------------------------------------------------------------------------
async function fetchData() {
    try {
        let response = await fetch("https://api.example.com/data");
        let data = await response.json();
        console.log(data);
    } catch(err) {
        console.log("Error:", err);
    }
}

fetchData();

Example 3: Multiple async operations
--------------------------------------------------------------------------------
async function getData() {
    try {
        let user = await fetchUser(1);   
        console.log(user);

        let posts = await fetchPosts(user.id);
        console.log(posts);

        let comments = await fetchComments(posts[0].id);
        console.log(comments);

    } catch(err) {
        console.log("Error:", err);
    }
}
> Sequential execution, looks like synchronous code.

Async function + return value
--------------------------------------------------------------------------------
async function add(a, b) {
    return a + b;   // wrapped in Promise
}
add(5, 10).then(result => console.log(result));

OUTPUT
--------------------------------------------------------------------------------
15

Error Handling
--------------------------------------------------------------------------------
• Use `try { } catch { }` inside async function  
• Or use `.catch()` after calling the async function

async function demo() {
    try {
        let result = await Promise.reject("Oops");
    } catch(err) {
        console.log(err);
    }
}

OUTPUT
--------------------------------------------------------------------------------
Oops

Concurrent promises with await
--------------------------------------------------------------------------------
• Use `Promise.all()` to run multiple async tasks in parallel

async function concurrentTasks() {
    let [res1, res2] = await Promise.all([
        fetchData1(),
        fetchData2()
    ]);
    console.log(res1, res2);
}

> Improves performance compared to sequential await.

Key Points
--------------------------------------------------------------------------------
1. `async` marks a function as asynchronous.  
2. `await` pauses execution until the Promise resolves.  
3. Makes async code readable like sync code.  
4. Can replace complex Promise chaining.  
5. Always use `try/catch` to handle errors.  
6. `Promise.all()` + async/await is useful for parallel tasks.

INTERVIEW LINE
--------------------------------------------------------------------------------
"async/await is syntactic sugar over Promises in JavaScript 
that allows writing asynchronous code in a synchronous manner 
while handling errors using try/catch."

=====================================================================
ASYNC JS EVOLUTION: CALLBACK → PROMISE → ASYNC/AWAIT
=====================================================================

1. CALLBACK HELL (OLD WAY)
--------------------------------------------------------------------------------
fetchUser(1, function(user) {
    fetchPosts(user.id, function(posts) {
        fetchComments(posts[0].id, function(comments) {
            console.log(comments);
        });
    });
});

Problems:
• Nested callbacks → hard to read  
• Difficult error handling  
• Hard to maintain

2. PROMISE CHAINING
--------------------------------------------------------------------------------
fetchUser(1)
.then(user => fetchPosts(user.id))
.then(posts => fetchComments(posts[0].id))
.then(comments => console.log(comments))
.catch(err => console.log(err));

Benefits:
• Flat structure  
• Better error handling with .catch()  
• Sequential async flow

3. ASYNC / AWAIT (MODERN WAY)
--------------------------------------------------------------------------------
async function showComments() {
    try {
        let user = await fetchUser(1);
        let posts = await fetchPosts(user.id);
        let comments = await fetchComments(posts[0].id);
        console.log(comments);
    } catch(err) {
        console.log(err);
    }
}

Benefits:
• Looks like synchronous code  
• Very readable  
• Easy to debug and maintain  
• Works seamlessly with try/catch

Visual Summary
--------------------------------------------------------------------------------
CALLBACK HELL:        Nested →   📦📦📦  
PROMISE CHAINING:      → Flat   🔗🔗🔗  
ASYNC/AWAIT:           → Sync-like ✅✅✅

=====================================================================
JAVASCRIPT ASYNC OPERATIONS
=====================================================================

1. THE changeColor FUNCTION (WITH RANDOM ERROR)
--------------------------------------------------------------------------------
function changeColor(color, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let num = Math.random();
            if(num < 0.5) {
                reject("Error in changing color"); 
            } else {
                console.log(color);               
                resolve(color);                   
            }
        }, delay);
    });
}

2. IMPLEMENTATION METHODS
--------------------------------------------------------------------------------
A. PROMISE CHAINING (OLD WAY)
changeColor("Red", 1000)
.then(() => changeColor("Green", 1000))
.then(() => changeColor("Blue", 1000))
.then(() => changeColor("Yellow", 1000))
.then(() => changeColor("Pink", 1000))
.catch(error => console.log("Caught:", error));

• Each .then() waits for previous Promise to resolve.  
• Random rejection can occur at any step and is caught by .catch().  
• Can be lengthy if many sequential steps are required.

B. ASYNC / AWAIT (MODERN WAY)
--------------------------------------------------------------------------------
async function demo() {
    try {
        await changeColor("Red", 1000);
        await changeColor("Green", 1000);
        await changeColor("Blue", 1000);
        await changeColor("Yellow", 1000);
        await changeColor("Pink", 1000);
    } catch(error) {
        console.log("Caught:", error);
    }
}

demo();

• Each `await` pauses execution until the Promise resolves.  
• Errors are handled immediately in the try...catch block.  
• Sequential and readable, avoids deep nesting.

Key Concepts / Takeaways
--------------------------------------------------------------------------------
1. **Promises**: Represent future values; can resolve or reject.  
2. **Random rejection** simulates real-world async errors.  
3. **await**: Pauses async function until Promise resolves.  
4. **async function**: Always returns a Promise.  
5. **try...catch**: Handles any rejection inside async functions.  
6. Async/await improves readability and maintains sequential logic even with errors.

INTERVIEW LINE
--------------------------------------------------------------------------------
"Using async/await with Promises allows clean sequential execution
of asynchronous operations while handling errors gracefully with
try/catch, even when some Promises may fail randomly."
======================================================================
               ASYNC JS EVOLUTION: CALLBACK → PROMISE → ASYNC/AWAIT
======================================================================

1. CALLBACK HELL (OLD WAY)
----------------------------------------------------------------------
fetchUser(1, function(user) {
    fetchPosts(user.id, function(posts) {
        fetchComments(posts[0].id, function(comments) {
            console.log(comments);
        });
    });
});

PROBLEMS:
• Nested callbacks → hard to read
• Difficult error handling
• Hard to maintain

----------------------------------------------------------------------
2. PROMISE CHAINING
----------------------------------------------------------------------
fetchUser(1)
.then(user => fetchPosts(user.id))
.then(posts => fetchComments(posts[0].id))
.then(comments => console.log(comments))
.catch(err => console.log(err));

BENEFITS:
• Flat structure
• Better error handling with .catch()
• Sequential async flow

----------------------------------------------------------------------
3. ASYNC / AWAIT (MODERN WAY)
----------------------------------------------------------------------
async function showComments() {
    try {
        let user = await fetchUser(1);
        let posts = await fetchPosts(user.id);
        let comments = await fetchComments(posts[0].id);
        console.log(comments);
    } catch(err) {
        console.log(err);
    }
}

BENEFITS:
• Looks like synchronous code
• Very readable
• Easy to debug and maintain
• Works seamlessly with try/catch

----------------------------------------------------------------------
VISUAL SUMMARY
----------------------------------------------------------------------
CALLBACK HELL:        Nested →   📦📦📦
PROMISE CHAINING:      → Flat   🔗🔗🔗
ASYNC/AWAIT:           → Sync-like ✅✅✅

==========================
==============================================================================
ASYNC / AWAIT (COMPLETE NOTES)
==============================================================================

DEFINITION
------------------------------------------------------------------------------
• async/await is used to handle asynchronous operations
• Makes async code look like synchronous (easy to read)

------------------------------------------------------------------------------
WHY USE
------------------------------------------------------------------------------
• Avoid callback hell
• Better readability than Promises (.then)
• Easier error handling

------------------------------------------------------------------------------
1. ASYNC KEYWORD
------------------------------------------------------------------------------
• Makes a function return a Promise

Example:
async function test() {
    return "Hello";
}

→ Actually returns: Promise("Hello")

------------------------------------------------------------------------------
2. AWAIT KEYWORD
------------------------------------------------------------------------------
• Waits for a Promise to resolve
• Can be used only inside async function

Example:
let result = await promise;

→ Pauses execution until promise resolves

------------------------------------------------------------------------------
3. BASIC EXAMPLE
------------------------------------------------------------------------------
function getData() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Data received"), 2000);
    });
}

async function fetchData() {
    let data = await getData();
    console.log(data);
}

fetchData();

------------------------------------------------------------------------------
4. ERROR HANDLING
------------------------------------------------------------------------------
Use try-catch

async function fetchData() {
    try {
        let data = await getData();
    } catch (err) {
        console.log(err);
    }
}

------------------------------------------------------------------------------
5. WITHOUT ASYNC/AWAIT (PROMISE STYLE)
------------------------------------------------------------------------------
getData()
.then(data => console.log(data))
.catch(err => console.log(err));

------------------------------------------------------------------------------
6. MULTIPLE AWAIT
------------------------------------------------------------------------------
async function load() {
    let a = await task1();
    let b = await task2();
}

→ Runs sequentially

------------------------------------------------------------------------------
7. PARALLEL EXECUTION
------------------------------------------------------------------------------
async function load() {
    let [a, b] = await Promise.all([task1(), task2()]);
}

→ Runs in parallel (faster)

------------------------------------------------------------------------------
8. IMPORTANT POINTS
------------------------------------------------------------------------------
• async → always returns Promise
• await → waits for Promise
• Only inside async function
• Use try-catch for errors
• Improves readability

------------------------------------------------------------------------------
9. REAL USE CASES
------------------------------------------------------------------------------
• API calls (fetch/axios)
• Database queries
• File operations
• Network requests

------------------------------------------------------------------------------
10. INTERVIEW DIFFERENCE (PROMISE vs ASYNC/AWAIT)
------------------------------------------------------------------------------
PROMISE (.then)           ASYNC/AWAIT
---------------------------------------------
Chained                  Cleaner syntax
Harder to read           Easy to read
Callback style           Looks synchronous
Manual error handling    try-catch

------------------------------------------------------------------------------
INTERVIEW LINE
------------------------------------------------------------------------------
"async/await is syntactic sugar over Promises that makes asynchronous
code easier to write, read, and handle errors."
------------------------------------------------------------------------------

======================================================================
=====================================================================
API (APPLICATION PROGRAMMING INTERFACE)
=====================================================================

DEFINITION
--------------------------------------------------------------------------------
• An API is a set of rules and protocols that allows one software application 
  to communicate with another.
• It defines methods, inputs, outputs, and data formats for integration.
• APIs enable functionality sharing without exposing internal code.

KEY POINTS
--------------------------------------------------------------------------------
1. Acts as a bridge between applications.
2. Can be web-based (HTTP/HTTPS) or local (library-based).
3. Promotes modularity and reuse of code.
4. Enables automation, third-party integrations, and microservices architecture.

TYPES OF API
--------------------------------------------------------------------------------
1. **Open/Public API**  → Available to any developer. Example: Twitter API.
2. **Private API**      → Internal use only, not exposed publicly.
3. **Partner API**      → Shared with business partners, requires authorization.
4. **Composite API**    → Combines multiple APIs into one call.

WEB API
--------------------------------------------------------------------------------
• Operates over HTTP/HTTPS.
• Commonly uses REST, SOAP, or GraphQL standards.

1. **REST API**  
   - Stateless, resource-based, uses HTTP methods: GET, POST, PUT, DELETE.  
   - Example: GET /users → fetch all users.

2. **SOAP API**  
   - XML-based, supports strict messaging standards.  
   - Used in enterprise systems requiring high security.

3. **GraphQL API**  
   - Query language for APIs, allows clients to request exactly the data needed.

HTTP METHODS
--------------------------------------------------------------------------------
• GET    → Read data from server
• POST   → Create new data
• PUT    → Update existing data
• PATCH  → Partial update
• DELETE → Remove data

API REQUEST STRUCTURE
--------------------------------------------------------------------------------
1. **Endpoint / URL**   → https://api.example.com/users
2. **HTTP Method**      → GET / POST / PUT / DELETE
3. **Headers**          → Metadata (e.g., Authorization, Content-Type)
4. **Query Parameters** → Optional filters (?id=123)
5. **Request Body**     → Data sent for POST/PUT/PATCH (usually JSON)

API RESPONSE STRUCTURE
--------------------------------------------------------------------------------
1. **Status Code**      → 200, 404, 500 etc.
2. **Headers**          → Metadata about response
3. **Body**             → Actual data (JSON/XML)

EXAMPLE (REST API REQUEST)
--------------------------------------------------------------------------------
GET https://api.example.com/users/1
Headers:
    Authorization: Bearer <token>
Response:
{
    "id": 1,
    "name": "Ajay Sharma",
    "email": "ajay@example.com",
    "city": "Jammu"
}

ERROR HANDLING
--------------------------------------------------------------------------------
• Use HTTP status codes:  
  - 2xx → Success  
  - 4xx → Client error (e.g., 404 Not Found, 401 Unauthorized)  
  - 5xx → Server error  
• Include error messages in response body for clarity.

INTERVIEW LINE
--------------------------------------------------------------------------------
"API allows applications to communicate by exposing functions and data 
through standardized protocols without sharing internal code."

=====================================================================
JSON (JAVA SCRIPT OBJECT NOTATION)
=====================================================================

DEFINITION
--------------------------------------------------------------------------------
• JSON is a lightweight format for exchanging data between client and server.
• Human-readable and easy for machines to parse.
• Mostly used with web APIs to send/receive structured data.

DATA TYPES
--------------------------------------------------------------------------------
1. String   → "Hello World"
2. Number   → 123 or 12.5
3. Boolean  → true / false
4. Null     → null
5. Array    → [1,2,3], ["a","b","c"]
6. Object   → {"key":"value"}

JSON STRUCTURE
--------------------------------------------------------------------------------
1. **Objects** → Key-value pairs inside curly braces {}
{
    "id": 1,
    "name": "Ajay Sharma",
    "email": "ajay@example.com"
}

2. **Arrays** → Ordered list inside square brackets []
[
    {"id":1,"name":"Ajay"},
    {"id":2,"name":"Priya"}
]

3. **Nested Objects**
{
    "id": 1,
    "name": "Ajay Sharma",
    "address": {
        "city": "Jammu",
        "state": "J&K",
        "pin": "180001"
    }
}

4. **Nested Arrays**
{
    "id": 1,
    "name": "Ajay Sharma",
    "skills": ["JavaScript", "Java", "SQL"]
}

EXAMPLE JSON RESPONSE (FROM API)
--------------------------------------------------------------------------------
{
    "status": "success",
    "data": {
        "users": [
            {"id":1, "name":"Ajay", "email":"ajay@example.com"},
            {"id":2, "name":"Priya", "email":"priya@example.com"}
        ]
    }
}

PARSING JSON IN JAVASCRIPT
--------------------------------------------------------------------------------
// Convert JSON string to JS object
let obj = JSON.parse(jsonString);

// Convert JS object to JSON string
let jsonStr = JSON.stringify(obj);

ADVANTAGES OF JSON
--------------------------------------------------------------------------------
1. Lightweight and faster than XML.
2. Easy to read and write.
3. Supported by almost all programming languages.
4. Perfect for web APIs and AJAX calls.

INTERVIEW LINE
--------------------------------------------------------------------------------
"JSON is a lightweight, language-independent data format used for exchanging 
structured data between client and server in APIs."

=====================================================================
RULES OF JSON OBJECT
=====================================================================

1. JSON objects are enclosed in **curly braces { }**.
   Example:
   {
       "key": "value"
   }

2. Each key must be a **string** enclosed in double quotes "".
   Correct:  "name": "Ajay"
   Incorrect: name: "Ajay"      // missing quotes

3. Keys must be **unique** within the same object.
   {
       "id": 1,
       "id": 2   // ❌ invalid
   }

4. Values can be:
   - String  → "Hello"
   - Number  → 123, 12.5
   - Boolean → true / false
   - Null    → null
   - Object  → {"nestedKey":"nestedValue"}
   - Array   → [1,2,3], ["a","b","c"]

5. Key-value pairs are separated by **colon :**.
   {
       "name": "Ajay"
   }

6. Multiple key-value pairs are separated by **comma ,**.
   {
       "name": "Ajay",
       "age": 25,
       "city": "Jammu"
   }

7. **Strings must be in double quotes ""** (single quotes ' ' are invalid in standard JSON).
   Correct:  "city": "Jammu"
   Incorrect: 'city': 'Jammu'

8. JSON objects **cannot have functions, undefined, or comments**.
   ❌ Invalid:
   {
       "func": function(){},
       "data": undefined,
       // comment
   }

9. JSON can be **nested**, but must follow all rules for each nested object.
   {
       "user": {
           "id": 1,
           "name": "Ajay"
       }
   }

10. Arrays inside JSON can contain **objects, strings, numbers, booleans, or null**, but must follow JSON syntax rules.
    {
        "users": [
            {"id":1, "name":"Ajay"},
            {"id":2, "name":"Priya"}
        ]
    }

11. JSON is **case-sensitive** (keys and string values must match exactly).
    Correct: "Name": "Ajay"
    Incorrect: "name" != "Name" (treated differently)

12. Whitespace (spaces, tabs, newlines) is **ignored** and used only for readability.

INTERVIEW LINE
--------------------------------------------------------------------------------
"JSON objects are collections of key-value pairs with unique string keys, 
enclosed in curly braces, following strict syntax rules including double 
quotes, valid data types, and no functions or comments."