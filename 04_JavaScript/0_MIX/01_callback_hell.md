================================================================================
CALLBACK (JavaScript) – COMPLETE NOTES
================================================================================

DEFINITION
--------------------------------------------------------------------------------
A callback is a function passed as an argument to another function,
so it can be executed later.

✔ Function runs AFTER another function completes

👉 Mental Model:
"When you're done, call this next"


WHY CALLBACKS ARE USED
--------------------------------------------------------------------------------
Used to handle asynchronous operations where result is not immediate:

- File reading
- Network / API requests
- Database operations
- setTimeout / delays

👉 JavaScript is NON-BLOCKING
- Executes line by line
- Async tasks run in background (finish later)
- Callback runs AFTER task completes


SYNCHRONOUS vs ASYNCHRONOUS
--------------------------------------------------------------------------------
Synchronous:
- Code runs step-by-step
- Each task waits for previous

Asynchronous:
- Code does NOT wait
- Tasks run in background
- Results come later (via callback / Promise)


PROBLEM WITHOUT CONTROL (ASYNC ISSUE)
--------------------------------------------------------------------------------
Without callbacks, execution does NOT wait for async tasks.

Example:
function getData() {
  setTimeout(() => {
    return "Data";
  }, 2000);
}

let result = getData();
console.log(result);

OUTPUT:
undefined

REASON:
- setTimeout runs later (async)
- function already returned before data is ready

👉 Problem:
- No control over execution order
- Dependent code runs too early
- Incorrect results


SOLUTION (CALLBACK)
--------------------------------------------------------------------------------
function getData(callback) {
  setTimeout(() => {
    callback("Data");
  }, 2000);
}

getData((result) => {
  console.log(result);
});

✔ Callback ensures correct execution order
✔ Runs AFTER async task completes


CALLBACK WITH PARAMETERS
--------------------------------------------------------------------------------
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


CALLBACK WITH DOM
--------------------------------------------------------------------------------
HTML:
<h1 id="myH1"></h1>

function displayPage(result) {
  document.getElementById("myH1").textContent = result;
}

sum(1, 2, displayPage);

OUTPUT (Browser):
3


================================================================================
ASYNC BEHAVIOR (VERY IMPORTANT)
================================================================================

HOW IT WORKS
--------------------------------------------------------------------------------
- Async tasks run outside JS (Web APIs / Node APIs)
- JS continues executing next lines (non-blocking)
- When task completes → callback is executed

👉 Callback can run:
- Immediately (sync case)
- Later (async case)


EXECUTION RESPONSIBILITY
--------------------------------------------------------------------------------
❌ Callback does NOT control timing
✔ Function using callback decides WHEN to run it

👉 Rule:
"Callback = WHAT to run, not WHEN to run"


FLOW (EVENT LOOP MODEL)
--------------------------------------------------------------------------------
Call Stack        Web APIs          Callback Queue
----------        --------          --------------
setTimeout -----> Timer starts
(next code runs)                   (empty)

(after 2 sec)                      callback added

Event Loop checks:
- Is Call Stack empty? ✔ Yes

Event Loop → moves callback → Call Stack

Call Stack executes callback

👉 Callback = function waiting to execute


KEY POINTS
--------------------------------------------------------------------------------
- JS is single-threaded
- Async work handled outside JS
- Event Loop manages execution order
- Callback always executes via Call Stack
- Callback runs AFTER another function/task completes


ONE LINE SUMMARY
--------------------------------------------------------------------------------
JS doesn’t wait → delegates async work → executes callback later via Event Loop


================================================================================
WHERE CALLBACKS ARE USED
================================================================================

1) ASYNC OPERATIONS (MOST IMPORTANT)
-----------------------------------
API calls
Database queries
File reading
setTimeout

👉 JS does NOT wait → callback runs after completion


2) EVENT HANDLING (BROWSER)
---------------------------
button.addEventListener("click", function() {
  console.log("Clicked");
});

👉 Runs when event happens


3) ARRAY METHODS
----------------
[1,2,3].map(x => x * 2);
[1,2,3].forEach(x => console.log(x));

👉 Callback defines operation on each element


4) REUSABLE LOGIC
-----------------
function process(arr, callback) {
  callback(arr);
}

Examples:
- print
- saveToDB
- transform data


5) ERROR-FIRST CALLBACK (NODE.JS)
---------------------------------
connection.query(query, (err, result) => {
  if (err) {
    // handle error
  } else {
    console.log(result);
  }
});

👉 1st param = error
👉 2nd param = result


WHEN TO USE CALLBACKS
--------------------------------------------------------------------------------
- Unknown timing
- Async operations
- Event handling
- Reusable/custom logic


================================================================================
REAL ASYNC EXAMPLE
================================================================================
fetch("url")
    .then(res => res.json())
    .then(data => console.log(data));

👉 Callback runs when response is ready


================================================================================
ASYNC FLOW (VERY IMPORTANT)
================================================================================
console.log("Start");

setTimeout(() => {
    console.log("Callback");
}, 2000);

console.log("End");


EXECUTION FLOW
--------------------------------------------------------------------------------
1) "Start" prints
2) setTimeout sent to Web APIs
3) JS continues → "End" prints
4) Timer finishes → callback goes to queue
5) Event loop moves it to call stack
6) Callback executes

OUTPUT:
Start → End → Callback


WHO DOES WHAT
--------------------------------------------------------------------------------
JavaScript Engine → runs main code
Web APIs         → handle async tasks
Callback Queue   → stores callbacks
Event Loop       → moves callback to call stack
Call Stack       → executes callback
Callback         → function waiting to execute


FINAL ANSWERS
--------------------------------------------------------------------------------
Who continues main work?
👉 JavaScript engine

Who runs callback?
👉 Event loop (by moving it to call stack)

Event loop checks:
“Is call stack empty?”

If YES:
- takes callback from queue
- pushes to call stack
- executes it


================================================================================
FINAL SUMMARY
================================================================================
✔ Callback = function passed as argument
✔ Sync → executes immediately
✔ Async → executes later
✔ Callback runs AFTER another function/task completes
✔ Callback does NOT control timing
✔ Function receiving callback controls execution
✔ Used for async operations + reusable logic
✔ Event loop manages async execution

================================================================================
==================== CALLBACK HELL (JS) ====================


🔹 1. WHAT IS CALLBACK HELL?
------------------------------------------------------------
Callback Hell = deeply nested callbacks inside each other

✔ Happens in async code when tasks depend on previous ones
✔ Leads to pyramid-shaped code (Pyramid of Doom)

RESULT:
❌ Hard to read
❌ Hard to maintain
❌ Hard to debug


------------------------------------------------------------
🔹 2. WHY IT HAPPENS
------------------------------------------------------------
When execution must be SEQUENTIAL:

Task A → Task B → Task C → Task D

👉 Each task starts ONLY AFTER previous finishes
👉 So each callback goes inside previous → nesting grows


------------------------------------------------------------
🔹 3. REAL-LIFE ANALOGY
------------------------------------------------------------
Do chores in order:

Walk Dog → Clean Kitchen → Iron Clothes

❌ Cannot start next until previous is done
→ same pattern as nested callbacks


============================================================
🔹 4. CORE EXAMPLE (CLEAR UNDERSTANDING)
============================================================

function getUser(callback) {
    setTimeout(() => {
        console.log("User fetched");
        callback({ id: 1 });
    }, 1000);
}

function getOrders(userId, callback) {
    setTimeout(() => {
        console.log("Orders fetched");
        callback(["order1", "order2"]);
    }, 1000);
}

function processPayment(orders, callback) {
    setTimeout(() => {
        console.log("Payment done");
        callback("Success");
    }, 1000);
}


getUser((user) => {
    getOrders(user.id, (orders) => {
        processPayment(orders, (status) => {
            console.log("Final Status:", status);
        });
    });
});


OUTPUT FLOW:
User → Orders → Payment → Final Status


------------------------------------------------------------
🔹 VISUAL STRUCTURE
------------------------------------------------------------
getUser(() => {
    getOrders(() => {
        processPayment(() => {
            // grows deeper...
        });
    });
});

👉 Shape = Pyramid (rightward drifting code)


============================================================
🔹 5. SUPER SIMPLE VERSION (PURE NESTING)
============================================================

setTimeout(() => {
    console.log("1");

    setTimeout(() => {
        console.log("2");

        setTimeout(() => {
            console.log("3");
        }, 1000);

    }, 1000);

}, 1000);

👉 Even simple logic becomes messy due to nesting


============================================================
🔹 6. REAL-WORLD SCENARIO (IMPORTANT)
============================================================

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

👉 Very common in APIs / backend flows


============================================================
🔹 7. MAIN PROBLEMS
============================================================

❌ Deep nesting → unreadable code
❌ Flow is NOT linear (zig-zag)
❌ Debugging becomes painful
❌ Error handling must be repeated at each level
❌ Functions become tightly coupled
❌ Small change breaks large structure


------------------------------------------------------------
🔹 HOW CODE FLOWS
------------------------------------------------------------
Normal code:     TOP → DOWN

Callback Hell:   RIGHT → DOWN → RIGHT → DOWN


============================================================
🔹 8. KEY INSIGHT
============================================================

✔ Problem is NOT callbacks
✔ Problem = excessive nesting

✔ Callbacks → fine
❌ Nested callbacks → messy


------------------------------------------------------------
🔹 MENTAL MODEL
------------------------------------------------------------

Each function:
👉 "When I finish, call next"

But next again nests → chain becomes pyramid


============================================================
🔹 9. WHY IT DOESN’T SCALE
============================================================

Add 1 more step →

getUser(() => {
    getOrders(() => {
        processPayment(() => {
            sendEmail(() => {
                updateUI(() => {
                    // deeper...
                });
            });
        });
    });
});

👉 Complexity grows vertically → unreadable fast


============================================================
🔹 10. SOLUTION (DIRECTION)
============================================================

Callback Hell →
❌ Nested structure

Fix using:

✔ Promises → linear chaining (.then)
✔ Async/Await → synchronous-looking flow


------------------------------------------------------------
🔹 TRANSFORMATION IDEA
------------------------------------------------------------

Callback Hell:
getUser(() => {
    getOrders(() => { ... })
})

Promise:
getUser()
  .then(getOrders)
  .then(processPayment)

Async/Await:
const user = await getUser();


============================================================
🔹 FINAL SUMMARY
============================================================

✔ Callback Hell = nested async callbacks
✔ Caused by dependent sequential operations
✔ Creates pyramid structure
✔ Makes code unreadable & hard to maintain

👉 Root issue = nesting, not callbacks

👉 Solution = Promises / Async-Await
============================================================
===========================================
SIMPLE CALLBACK HELL (WORKING EXAMPLE)
===========================================

function step1(callback) {
    setTimeout(() => {
        console.log("Step 1 done");
        callback();
    }, 1000);
}

function step2(callback) {
    setTimeout(() => {
        console.log("Step 2 done");
        callback();
    }, 1000);
}

function step3(callback) {
    setTimeout(() => {
        console.log("Step 3 done");
        callback();
    }, 1000);
}


step1(() => {
    step2(() => {
        step3(() => {
            console.log("All steps completed");
        });
    });
});


OUTPUT:
(after 1s) Step 1 done
(after 2s) Step 2 done
(after 3s) Step 3 done
All steps completed


===========================================
WHY THIS IS CALLBACK HELL
===========================================

* Nested callbacks (pyramid shape)
* Hard to scale if more steps added
* Readability decreases quickly


===========================================
SUPER SIMPLE VERSION (MINIMAL)
===========================================

setTimeout(() => {
    console.log("1");

    setTimeout(() => {
        console.log("2");

        setTimeout(() => {
            console.log("3");
        }, 1000);

    }, 1000);

}, 1000);


===========================================
KEY IDEA
===========================================

Not about complexity — it's about nesting.

Even simple nesting = callback hell when it grows.