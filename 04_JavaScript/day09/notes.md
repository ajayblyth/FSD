============================================================================================================================
FUNCTION EXPRESSIONS
============================================================================================================================

DEFINITION
----------
- Function stored inside a variable
- Usually anonymous (no name)
  because variable name acts as identifier

SYNTAX
------
const variableName = function(arg1, arg2) {
    // logic
    return val;
};

EXAMPLE
-------
const sum = function(a, b) {
    return a + b;
};

sum(2, 3);  // 5


----------------------------------------------------------------

WHY FUNCTION EXPRESSIONS ARE POWERFUL
----------------------------------------------------------------

1️⃣ CAN CHANGE AT RUNTIME (REASSIGNMENT)
----------------------------------------
let action = function() {
    console.log("start");
};

action = function() {
    console.log("stop");
};

action();  // stop

👉 Explanation:
- Variables store function reference
- Reassignment changes the reference (pointer)
- Old function is replaced, not stored multiple times


NOTE:
-----
- Function declarations cannot be reassigned like this safely
- Function expressions can be changed dynamically


----------------------------------------------------------------

2️⃣ DYNAMIC BEHAVIOR (CONDITIONAL FUNCTIONS)
--------------------------------------------
let action;

if (true) {
    action = function() { console.log("A"); };
} else {
    action = function() { console.log("B"); };
}

👉 Based on condition, different function is assigned


EXAMPLE
-------
let mode = "dark";

let action;

if (mode === "dark") {
    action = () => console.log("Dark mode");
} else {
    action = () => console.log("Light mode");
}

action();


----------------------------------------------------------------

USE CASES
---------

✔ EVENT HANDLING
- Change behavior based on events (click, input, submit)
- Example: button click → different function runs

✔ CALLBACKS
- Function passed into another function
- Runs later when task completes (async)

✔ DYNAMIC BEHAVIOR
- Same variable can point to different functions
- Behavior changes at runtime based on condition

✔ STATE-BASED LOGIC (React, Node, APIs)
- Same variable → different behavior based on state/data
- Used in real apps for switching logic dynamically

👉 Same variable, different behavior at runtime


----------------------------------------------------------------

🧠 ONE-LINE
-----------
action does not store multiple functions — it only points to the latest assigned function

============================================================================================================================
HIGHER ORDER FUNCTIONS (HOF)
============================================================================================================================

Definition: Function that takes function(s) as argument OR returns a function

// Passing function as argument
function multipleGreet(func,n){
    for(let i=1;i<=n;i++){
         func();
          }
}

let greet = function(){
    console.log("hello"); 
    };

multipleGreet(greet,2);  // hello  hello


multipleGreet(function(){
     console.log("namaste");
      },3);  // namaste x3


// Returning function
function oddEvenTest(request){
    if(request=="odd"){ 
        return function(n){
             console.log(!(n%2==0)); } 
    }
    else if(request=="even"){ 
        return function(n){ console.log(n%2==0); } 
    }
    else { console.log("wrong request"); }
}

let checkOdd = oddEvenTest("odd"); //oddEvenTest("odd") RETURNS a FUNCTION, so now checkodd has function in it(like function expressions)

checkOdd(5);   // true (odd)...here we passing value in function which was returned in checkodd

let checkEven = oddEvenTest("even");
checkEven(10); // true (even)

FINAL FLOW
--------------------------------------------------
oddEvenTest("odd") → returns function
checkOdd           → stores returned function
checkOdd(5)        → executes stored function with 5


--------------------------------------------------
KEY POINT
--------------------------------------------------
✔ Variable is NOT storing a value
✔ Variable is storing a FUNCTION reference
✔ That function is executed later

Important Points:
- Functions can be passed or returned
- Returned function remembers outer variables (closure)

-------------------------------------------------------------
EXAMPLE HOF and callback difference
----------------------------------

function processUser(name, callback) {
  console.log("Processing user: " + name);
  callback();
}

function sayHello() {
  console.log("Hello!");
}

processUser("Ajay", sayHello);


--------------------------------------------------
IDENTIFICATION
--------------------------------------------------

👉 processUser = HOF
   (because it takes a function as argument)

👉 sayHello = CALLBACK
   (because it is passed into another function)


--------------------------------------------------
WHY?
--------------------------------------------------

- processUser accepts a function → so it is HOF
- sayHello is passed into processUser → so it is callback


--------------------------------------------------
DIFFERENCE (THEORY)
--------------------------------------------------

CALLBACK
--------
- Function passed into another function
- Used to execute later

HOF (Higher Order Function)
---------------------------
- Function that accepts a function OR returns a function
- Controls execution of callback

============================================================================================================================
METHODS IN JAVASCRIPT
============================================================================================================================

Definition: Function stored inside an object. Defines object actions.

const calculator = {
    add: function(a,b){ 
        return a+b; 
        },  // normal syntax,looks like a function inside add variable but with a colon

    sub(a,b){ 
        return a-b; 
        },            // shorthand syntax

};

calculator.add(5,3);   // 8
calculator.sub(10,4);  // 6

// Built-in Array methods
[1,2,3];                // [1,2,3]
typeof [1,2,3];          // "object"

[1,2,3].push(4);         // 4 → new length
[1,2,3].pop();           // 3 → removed element

Important Points:
- Method = function inside object
- Access with dot notation
- Many built-in objects have methods


THIS KEYWORD (JavaScript)
-------------------------

DEFINITION
----------
- "this" refers to the object that is currently executing the function
- "this" refers to calling object

👉 In object methods:
obj.method() → this = obj

Better definition

this is a runtime keyword that points to the object that invokes the function.

🔹 Why “runtime” keyword?
Because this is NOT decided when you write the code ❌
It is decided only when the function is executed ✅

Example:
this (runtime)
function show() {
  console.log(this);
}

👉 At this point, JS does NOT know:

who will call show()
🔹 Now depends on HOW it is called
Case 1
obj.show();

👉 this = obj

Case 2
show();

👉 this = window (or undefined in strict mode)

--------------------------------------------------

GLOBAL CONTEXT
--------------
console.log(this);

👉 Browser: window
👉 Node.js: global / {}

In regular functions:
- Non-strict mode → this = global object (window in browser)
- Strict mode → this = undefined


--------------------------------------------------

STRICT vs NON-STRICT MODE
-------------------------

| STRICT MODE ("use strict")        | NON-STRICT MODE (default JS)     |
|-----------------------------------|----------------------------------|
| Safer JS                          | Flexible JS                      |
| Shows errors                      | Hides some errors               |
| this = undefined (functions)      | this = window (browser)         |
| No auto global variables          | Allows accidental globals       |
| Prevents bad practices            | Older relaxed behavior          |

KEY DIFFERENCE
--------------
Strict → safe + errors visible
Non-strict → flexible + risky

ONE-LINE
--------
Strict = safe JS rules, Non-strict = relaxed JS behavior


--------------------------------------------------

ARROW FUNCTION (this behavior)
------------------------------
- Arrow functions do NOT have their own this
- They take this from surrounding (lexical) scope

Example:
const obj = {
  name: "Ajay",
  show: () => {
    console.log(this.name);
  }
};

👉 this is NOT obj
👉 this comes from outer scope


--------------------------------------------------

THIS DEPENDS ON HOW FUNCTION IS CALLED
--------------------------------------

Example:
const obj = {
  name: "Ajay",
  greet() {
    console.log(this.name);
  }
};

obj.greet();  
👉 this = obj (called as method)

If called normally:
greet();  
👉 this = global object (or undefined in strict mode)


--------------------------------------------------

PRACTICAL EXAMPLE
-----------------
const student = {
  name: "nithin",
  age: 23,
  eng: 95,
  math: 93,
  phy: 97,

  getAvg() {
    let avg = (this.eng + this.math + this.phy) / 3;
    console.log(avg);
  }
};

student.getAvg();
👉 this = student object


--------------------------------------------------

EVENT HANDLER
-------------
button.onclick = function() {
  console.log(this);
};

👉 this = button element


--------------------------------------------------

KEY RULES
---------
✔ this depends on HOW function is called
✔ NOT where function is written


--------------------------------------------------

ONE-LINE SUMMARY
----------------
this = object that is calling the function
-------------------------------------------------------------
THIS KEYWORD - COMPLETE PRACTICE SET
------------------------------------

Q1
--
const obj = {
  name: "Ajay",
  show: function () {
    console.log(this);
  }
};

obj.show();


Q2
--
function test() {
  console.log(this);
}

test();


Q3
--
const obj = {
  name: "Ajay",
  show: () => {
    console.log(this);
  }
};

obj.show();


Q4
--
const obj = {
  name: "Ajay",
  show() {
    function inner() {
      console.log(this);
    }
    inner();
  }
};

obj.show();


Q5
--
button.onclick = function () {
  console.log(this);
};


Q6
--
function show() {
  console.log(this);
}

const obj = { name: "Ajay" };

show.call(obj);


Q7
--
const obj = {
  name: "Ajay",
  show() {
    setTimeout(function () {
      console.log(this);
    }, 1000);
  }
};

obj.show();


Q8
--
const obj = {
  name: "Ajay",
  show() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
};

obj.show();


--------------------------------------------------

ANSWERS + EXPLANATION
--------------------------------------------------

Q1
--
this = obj
👉 called as obj.show()


Q2
--
this = window / undefined (strict mode)
👉 normal function call, no object


Q3
--
this = window (or outer scope)
👉 arrow function has no own this


Q4
--
this = window / undefined
👉 inner() is normal function, called directly


Q5
--
this = button element
👉 event handler sets this to DOM element


Q6
--
this = obj
👉 call() explicitly sets this


Q7
--
this = window / undefined
👉 setTimeout callback is normal function, loses object context


Q8
--
this = obj
👉 arrow function inherits lexical this from show()
============================================================================================================================
TRY & CATCH
============================================================================================================================

Definition: Handles runtime errors safely without crashing program

// Normal execution (error stops program)
console.log("hello");
console.log(a);   // ❌ error
console.log("world"); // not executed

// Using try & catch
try{
    console.log(a);  // risky code
}
catch{
    console.log("variable a doesn't exist");
}

console.log("program continues...");  // executed

Important Points:
- try → risky code
- catch → handles error
- Prevents crash
- Used in real projects for safe execution