==================== CALLBACK (JavaScript) ====================

A callback is a function passed as an argument to another function,
so it can be executed later.

WHY CALLBACKS ARE USED
---------------------
Used to handle asynchronous operations where result is not immediate:

- File reading
- Network / API requests
- Database operations
- setTimeout / delays

👉 JavaScript is NON-BLOCKING
- Executes line by line
- Async tasks finish later
- Callback runs AFTER task completes

👉 Mental Model
"When you're done, call this next"

Note:
Synchronous: Code runs step-by-step, each task waits for the previous to finish.

Asynchronous: Code doesn’t wait; tasks run in background and results come later (via callback/Promise).

PROBLEM WITHOUT CONTROL (ASYNC ISSUE)
------------------------------------
Without callbacks, execution does not wait for async tasks.

Example:

function getData() {
  setTimeout(() => {
    return "Data";
  }, 2000);
}

let result = getData();
console.log(result);

Output:
undefined

Reason:
- setTimeout runs later (async)
- function already returned before data is ready

👉 Problem:
- No control over execution order
- Dependent code runs too early
- Leads to incorrect results


SOLUTION (CALLBACK)
------------------
function getData(callback) {
  setTimeout(() => {
    callback("Data");
  }, 2000);
}

getData((result) => {
  console.log(result); // correct output
});

🔹 KEY POINTS

✔ Callback ensures execution order
✔ Function runs AFTER another function completes
✔ Useful for async tasks

🔹 CALLBACK WITH PARAMETERS

function sum(x, y, callback) {
let result = x + y;
callback(result);
}

function displayConsole(result) {
console.log(result);
}

sum(1, 2, displayConsole);

OUTPUT:
3

🔹 CALLBACK WITH DOM

HTML:

<h1 id="myH1"></h1>

function displayPage(result) {
document.getElementById("myH1").textContent = result;
}

sum(1, 2, displayPage);

OUTPUT (Browser):
3

----------------------------------------------
CALLBACK ASYNC BEHAVIOR (JS)
----------------------------

HOW IT WORKS
------------
- Async tasks run outside JS (Web APIs / Node APIs)
- JS continues executing next lines (non-blocking)
- When task completes → callback is executed

👉 Callback can run:
- Immediately (sync case)
- Later (async case)


EXECUTION RESPONSIBILITY
-----------------------
❌ Callback does NOT control timing
✔ The function using callback decides WHEN to run it

👉 Rule:
"Callback = WHAT to run, not WHEN to run"


FLOW (EVENT LOOP MODEL)
----------------------

Call Stack        Web APIs          Callback Queue
----------        --------          --------------
setTimeout -----> Timer starts
(next code runs)                   (empty)

(after 2 sec)                      callback added

Event Loop checks:
- Is Call Stack empty? ✔ Yes

Event Loop → moves callback → Call Stack

Call Stack executes callback


KEY POINTS
----------
- JS is single-threaded
- Async work handled outside JS
- Event Loop manages execution order
- Callback always runs via Call Stack only


ONE LINE SUMMARY
----------------
JS doesn’t wait → delegates async work → executes callback later via Event Loop



==================== WHERE CALLBACKS ARE USED ====================

1️⃣ ASYNC OPERATIONS (MOST IMPORTANT)
API calls
Database queries
File reading
setTimeout

👉 JS does NOT wait → callback runs after completion

2️⃣ EVENT HANDLING (BROWSER)

button.addEventListener("click", function() {
console.log("Clicked");
});

👉 Runs when event happens

3️⃣ ARRAY METHODS

[1,2,3].map(x => x * 2);
[1,2,3].forEach(x => console.log(x));

👉 Callback defines operation on each element

4️⃣ REUSABLE LOGIC

function process(arr, callback) {
callback(arr);
}

Examples:

print
saveToDB
transform data
5️⃣ ERROR-FIRST CALLBACK (NODE.JS)

connection.query(query, (err, result) => {
if (err) {
// handle error
} else {
console.log(result);
}
});

👉 1st param = error
👉 2nd param = result

==================== FINAL SUMMARY ====================

🔹 CORE IDEA
✔ Callback = function passed to another function
✔ Runs after task completes
✔ Used for async behavior and custom logic

🔹 WHEN USED
- Unknown timing
- Async operations
- Event handling
- Reusable/custom logic

============================================================
==================== REAL ASYNC EXAMPLE ====================
============================================================

fetch("url")
    .then(res => res.json())
    .then(data => console.log(data));

👉 Callback runs when response is ready


============================================================
==================== ASYNC FLOW (VERY IMPORTANT) ===========
============================================================

console.log("Start");

setTimeout(() => {
    console.log("Callback");
}, 2000);

console.log("End");


------------------------------------------------------------
🔹 EXECUTION FLOW
------------------------------------------------------------
Step 1: "Start" prints  
Step 2: setTimeout sent to Web APIs  
Step 3: JS continues → "End" prints  
Step 4: Timer finishes → callback goes to callback queue  
Step 5: Event loop moves it to call stack  
Step 6: Callback executes  


OUTPUT:
Start → End → Callback


------------------------------------------------------------
🔹 WHO DOES WHAT
------------------------------------------------------------
JavaScript Engine → runs main code  
Web APIs → handle async tasks (timers, fetch, etc.)  
Callback Queue → stores waiting callbacks  
Event Loop → moves callback to call stack  
Callback → function waiting to execute  


------------------------------------------------------------
🔥 FINAL ANSWERS
------------------------------------------------------------

Who continues main work?
👉 JavaScript engine  

Who runs callback?
👉 Event loop  

👉 Event loop constantly checks:
“Is call stack empty?”

If YES:
- takes callback from queue
- pushes to call stack
- executes it


============================================================
==================== FINAL SUMMARY =========================
============================================================

✔ Callback = function passed as argument  
✔ Sync → executes immediately  
✔ Async → executes later  
✔ Callback has no control over timing  
✔ Function receiving callback controls execution  
✔ Used for async operations + reusable behavior  
✔ Event loop handles async callback execution  
=======================================================================================================

==================== CALLBACK HELL (JavaScript) ====================


🔹 1. WHAT IS CALLBACK HELL?
------------------------------------------------------------
Callback Hell is a situation where multiple nested callbacks are
used inside each other, making code:

- Hard to read
- Hard to maintain
- Difficult to debug

👉 Also called “Pyramid of Doom” (because of shape)


------------------------------------------------------------
🔹 2. WHY IT HAPPENS
------------------------------------------------------------
Occurs when:

✔ Multiple async tasks depend on each other
✔ Each task must run AFTER previous one finishes

Example chain:
Task A → Task B → Task C → Task D


------------------------------------------------------------
🔹 3. SIMPLE REAL-LIFE EXAMPLE
------------------------------------------------------------
DO THESE CHORES IN ORDER:

1. Walk Dog
2. Clean Kitchen
3. Iron clothes


============================================================
🔹 4. CALLBACK HELL EXAMPLE
============================================================

function walkDog(callback) {
    setTimeout(() => {
        console.log("Walked the dog");
        callback();
    }, 1500);
}

function cleanKitchen(callback) {
    setTimeout(() => {
        console.log("Cleaned the kitchen");
        callback();
    }, 2000);
}

function ironClothes(callback) {
    setTimeout(() => {
        console.log("Finished ironing clothes");
        callback();
    }, 1000);
}


------------------------------------------------------------
🔹 NESTED EXECUTION (CALLBACK HELL)
------------------------------------------------------------

walkDog(() => {
    cleanKitchen(() => {
        ironClothes(() => {
            console.log("All chores completed");
        });
    });
});


------------------------------------------------------------
🔹 OUTPUT
------------------------------------------------------------
Walked the dog
Cleaned the kitchen
Took out the trash
All chores completed


------------------------------------------------------------
🔹 PROBLEM (WHY THIS IS BAD)
------------------------------------------------------------

✔ Deep nesting (indentation increases)
✔ Hard to read flow
✔ Hard to debug errors
✔ Hard to reuse functions
✔ Code becomes messy quickly


👉 This structure looks like a pyramid:
        callback
          callback
            callback
              callback


============================================================
🔹 5. WHY CALLBACK HELL IS A PROBLEM IN REAL LIFE
============================================================

Example (real-world async flow):

- Login user
- Get user data
- Fetch posts
- Fetch comments
- Display UI

Each depends on previous step → nesting grows fast


------------------------------------------------------------
🔹 CALLBACK HELL VERSION
------------------------------------------------------------

loginUser(() => {
    getUserData(() => {
        getPosts(() => {
            getComments(() => {
                renderUI(() => {
                    console.log("Done");
                });
            });
        });
    });
});


------------------------------------------------------------
🔹 PROBLEMS AGAIN
------------------------------------------------------------
❌ Hard to read flow
❌ Error handling becomes complex
❌ Debugging becomes painful
❌ Code is tightly coupled


============================================================
🔹 6. KEY INSIGHT
============================================================

👉 Callback Hell is NOT about callbacks
👉 It is about excessive nesting of callbacks

✔ Callbacks themselves are fine
❌ Nesting too many = problem


------------------------------------------------------------
🔹 MENTAL MODEL
------------------------------------------------------------

Each function says:
👉 “When I finish, call next function”

But next function again adds another callback → nesting increases


============================================================
🔹 7. HOW IT FEELS IN REAL CODE
============================================================

👉 Code flows RIGHT → DOWN → RIGHT → DOWN

Instead of clean top-to-bottom logic


============================================================
🔹 8. WHY IT BECOMES HARD TO MAINTAIN
============================================================

✔ Small change affects whole structure
✔ Logic is not linear
✔ Error handling must be repeated at each level


============================================================
🔹 9. SOLUTION (NEXT TOPIC PREVIEW)
============================================================

Callback Hell is solved using:

✔ Promises (.then chaining)
✔ Async/Await (clean synchronous style)


------------------------------------------------------------
🔹 TRANSITION IDEA
------------------------------------------------------------

Callback Hell:
❌ Nested callbacks → messy code

Promise:
✔ Linear chain → readable code

Async/Await:
✔ Looks like normal synchronous code


============================================================
🔹 FINAL SUMMARY
============================================================

✔ Callback Hell = deeply nested callbacks
✔ Happens in dependent async operations
✔ Makes code messy and unreadable
✔ Known as “Pyramid of Doom”
✔ Solved by Promises and Async/Await
=================================================================================================
