=====================================================================
ASYNC / AWAIT - JAVASCRIPT
=====================================================================

DEFINITION
--------------------------------------------------------------------------------
• async and await are modern JavaScript keywords used to handle asynchronous
operations in a cleaner and more readable way. They are built on top of
Promises and make asynchronous code look synchronous.

  → async/await does not replace Promises. It is simply a cleaner syntax that
    internally uses Promises to handle asynchronous operations.

👉 CORE IDEA:
Promise       → “I will give result later”
Async/Await   → “Wait here until result comes, then continue”

ASYNC FUNCTION


DEFINITION
--------------------------------------------------------------------------------
• Placing the `async` keyword before any function declaration or 
  expression transforms it into an **async function**.  
• Async functions **always return a Promise**, regardless of the 
  contents of the function.  (Without async, you cannot use await.)
• Regular functions return values directly.  
• Async functions wrap return values automatically in a resolved Promise.

await keyword
✔ What it does:
Pauses execution of the async function
Waits for a Promise to resolve or reject
Resumes execution after completion

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

👉 IMPORTANT:
• Only pauses execution inside the async function  
• Does NOT block the entire program

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

function step1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Step 1 done");
            resolve("Step1 Result");
        }, 1000);
    });
}

function step2(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Step 2 done using:", data);
            resolve("Step2 Result");
        }, 1000);
    });
}

function step3(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Step 3 done using:", data);
            resolve("All Done");
        }, 1000);
    });
}

// async/await version
async function runSteps() {
    try {
        const res1 = await step1();
        const res2 = await step2(res1);
        const res3 = await step3(res2);

        console.log(res3);
    } catch (err) {
        console.log("Error:", err);
    }
}

runSteps();


⚠️ Now the REAL difference (very important)
1️⃣ Promise chaining (.then())
step1().then(() => step2()).then(() => step3());
What actually happens:
step1 starts

JS says:

“When step1 finishes, run next function”

step2 is NOT executed yet — only scheduled
step3 is also just scheduled later

👉 Nothing is “paused”
👉 Only callbacks are registered

So mentally:
step1 runs
→ register callback for step2
→ register callback for step3

2️⃣ async/await
await step1();
await step2();
await step3();
What actually happens:
step1 runs
execution of THIS function pauses

JS remembers:

“resume here after step1 finishes”

then continues line by line

👉 It looks like “pausing”
👉 But only this function pauses, not JS thread

🔥 KEY DIFFERENCE (simple truth)
Feature	            .then()	              async/await
Flow	              callback scheduling	function pausing
Code style	            fragmented	          linear
Internal model	        event callbacks	   suspended function resume
🧠 The confusion you're having

You are thinking:

“Both wait, so they must be same internally”

But actually:
YES both enforce order

BUT:

.then() → “call this later”
await → “pause here, resume later”

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

KEY POINTS
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