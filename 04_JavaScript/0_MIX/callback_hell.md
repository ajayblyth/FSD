==================== CALLBACK ====================

A callback is a function passed as an argument to another function, so that the receiving function can execute it later when needed. 
The control of when to execute it lies with the function that receives it.                          
                                                         OR
👉 “A callback is a function (Function A) passed as an argument to another function (Function B), 
  so that Function B can execute it when needed. The control of when to execute it lies with Function B.”

❌ Wrong/irrelevant:
- A loop that never stops because condition always remains TRUE

---------------------------------------------------------------

🔹 Basic Example
function greet(name) {
   console.log("Hello " + name); }

function processUserInput(callback) {
    let name = "Ajay";
    callback(name);
}

processUserInput(greet);

Flow:
greet is normal function -> passed into processUserInput -> called inside -> becomes callback

---------------------------------------------------------------

🔹 Key Understanding
❌ processUserInput(greet());  // runs immediately
✅ processUserInput(greet);    // pass reference

👉 We pass function, not execute it


---------------------------------------------------------------

🔹 Parameter Confusion (IMPORTANT)
function processUserInput(callback)
function processUserInput(greet)

👉 Both SAME
👉 Name is just variable

Internally:
let greet = function(name) { console.log("Hello " + name); }

🔥 Best practice: use generic name → callback

---------------------------------------------------------------
---------------------------------------------------------------

👉 🔹 Callback Execution (How it works)

Some tasks take time: Reading file -> Database query -> API call
JavaScript does NOT wait for async tasks (non-blocking nature)

So instead:
👉 JS continues other work
👉 When async task completes -> runs given function (callback)

👉 Callback can run immediately (sync) OR later (async)

🔹 Important:
❌ Callback itself does NOT wait
❌ Callback does NOT control execution
✅ Function receiving it controls execution

---------------------------------------------------------------

🔹 Simple Mental Model
Function A says:
"Hey Function B, after your work is done, run THIS function"

👉 Function B = decides WHEN to run
👉 Callback = WHAT to run

🔥 One-line clarity:
👉 “Callback is about who controls execution, not when it runs.”
------------------------------------------------------------------

🔹 Callback vs Nested Function
Nested (NOT callback):
function outer() { function inner() {} }

Callback:
function process(cb) { cb(); }
process(greet)

---------------------------------------------------------------

🔹 Callback ≠ Lambda
- Callback = concept
- Arrow function = syntax

arr.forEach(function(x){})
arr.forEach(x => {})

👉 both are callbacks

---------------------------------------------------------------

🔹 Purpose of Callback (WHY we use it)

👉 Callback is used when we want to:
- pass a function as a parameter
- decide later when/how to execute it
- handle tasks that depend on another function or time

---------------------------------------------------------------

🔹 WHERE we use Callback

1) Async operations (MOST IMPORTANT)
👉 When task takes time

Examples:
- API calls
- Database queries
- File reading
- setTimeout

👉 JS does NOT wait → callback runs when task finishes

---------------------------------------------------------------

2) Event Handling (Browser)
👉 When user does something

Examples:
- click
- input
- submit

button.addEventListener("click", function() {
    console.log("Clicked");
});

👉 callback runs when event happens

---------------------------------------------------------------

3) Array Methods (Data processing)
👉 When we want custom behavior

Examples:
- forEach → loop
- map
- filter

[1,2,3].map(x => x * 2)
forEach → loop
callback → operation

👉 callback tells WHAT to do with each element

---------------------------------------------------------------

4) Reusable logic (custom behavior)
👉 Same function, different actions

function process(arr, callback) {
    callback(arr);
}

arr.forEach(print)
arr.forEach(saveToDB)

---------------------------------------------------------------

🔹 Error-first callback (Node.js pattern)
connection.query(q, (err, result) => {
    if (err) {
        // handle error
    } else {
        console.log(result);
    }
});

👉 First parameter = error
👉 Second = success result

---------------------------------------------------------------

🔹 BASIC EXAMPLE
[1,2,3].forEach(x => console.log(x))

---------------------------------------------------------------

🔥 SIMPLE SUMMARY

👉 Callback is used when:
- we don’t know exact timing
- we want custom behavior
- we depend on another operation

👉 One-line:
“Callback is used to pass behavior (function) to another function for later execution.”

---------------------------------------------------------------

==================== SYNC vs ASYNC CALLBACK ====================

❗ Callback ≠ async

🔹 1) Synchronous Callback
[1,2,3].forEach(x => console.log(x))

Flow:
forEach starts -> calls immediately -> runs in order

✔ No waiting
✔ Instant execution

---------------------------------------------------------------

🔹 2) Asynchronous Callback
setTimeout(() => console.log("Hello"), 2000)

Flow:
start -> JS continues -> later callback runs

✔ Runs later
✔ Non-blocking

---------------------------------------------------------------

🔹 Key Rule
Pure JS → SYNC (loops, array methods)
External work → ASYNC (DB, API, file)

Examples:
SYNC: map()
ASYNC: fetch(), query(), fs.readFile()

---------------------------------------------------------------

🔹 Who calls callback?
SYNC:
👉 Function B directly calls callback

ASYNC:
👉 Event loop calls callback (after task completes)

---------------------------------------------------------------

🔹 Important Correction
❌ callback waits
✅ function decides timing

sync → immediate
async → later

---------------------------------------------------------------

==================== FUNCTION B CONTROL ====================

🔹 Function B = function receiving callback

Example:
processUserInput(callback)

👉 B decides WHEN to call callback

---------------------------------------------------------------

🔹 Case 1: Sync
function B(cb){
  console.log("Start");
  cb();
  console.log("End");
}

Output:
Start -> Callback -> End

---------------------------------------------------------------

🔹 Case 2: Async
function B(cb){
  console.log("Start");
  setTimeout(()=>cb(),2000);
  console.log("End");
}

Output:
Start -> End -> (later) Callback

👉 Same callback, different timing

---------------------------------------------------------------

🔹 Key Insight
Callback has NO power
Function B controls everything

---------------------------------------------------------------

🔹 Callback behavior
Function B can:
- call callback once
- call multiple times
- never call it

---------------------------------------------------------------

🔹 Analogy
Restaurant = Function B
Your number = callback

👉 they decide:
call now / later / never

---------------------------------------------------------------

==================== SYNTAX CLARITY ====================

function B(callback)

👉 callback = variable (parameter)

Same as:
function add(a,b)

---------------------------------------------------------------

🔹 Why callback() ?
Because variable holds function

B(() => console.log("Callback"))

Inside B:
callback = function

callback() → execute function

---------------------------------------------------------------

🔹 Difference
callback   → reference
callback() → execution

---------------------------------------------------------------

🔹 Real async example (API)
fetch("url")
  .then(res => res.json())
  .then(data => console.log(data));

---------------------------------------------------------------

==================== ASYNC FLOW (VERY IMPORTANT) ====================

console.log("Start");

setTimeout(() => {
  console.log("Callback");
}, 2000);

console.log("End");

---------------------------------------------------------------

🔹 Execution Flow

Step 1: Start prints
Step 2: setTimeout given to Web API
Step 3: JS continues -> End prints
Step 4: timer finishes -> callback goes to queue
Step 5: Event loop runs it

Output:
Start -> End -> Callback

---------------------------------------------------------------

🔹 Who does what

JavaScript Engine → runs code
Web APIs → handle async work
Callback Queue → holds callbacks
Event Loop → checks call stack & moves callback to execute
Callback → just waits

---------------------------------------------------------------

🔥 Final Answers

Who continues work?
👉 JavaScript engine

Who runs callback?
👉 Event loop

👉 Event loop continuously checks: “Is call stack empty?”
👉 If yes → takes callback from queue → pushes to stack → executes


---------------------------------------------------------------

==================== FINAL SUMMARY ====================

- Callback = function passed as argument
- Function controls execution
- Sync → immediate
- Async → later
- Callback has no control
- Used for behavior, reuse, async