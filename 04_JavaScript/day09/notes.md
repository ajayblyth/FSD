============================================================================================================================
FUNCTION EXPRESSIONS
============================================================================================================================

DEFINITION
A function expression is a function stored in a variable.
After a function expression has been stored in a variable, the variable can be used as a function:
Function expressions are commonly used to create anonymous functions



Why use functions as values?
- Values represent data (number, string, object, etc.).
- Functions represent behavior (logic/instructions).
- Passing a function lets JavaScript execute different logic dynamically.

SYNTAX
------
const variableName = function(arg1, arg2) {
    // logic
    return value;
};

EXAMPLE (Stored in a Variable)
------------------------------
const sum = function(a, b) {
    return a + b;
};

console.log(sum(2, 3));   // 5


OTHER WAYS TO USE FUNCTION EXPRESSIONS
--------------------------------------

1) Passed as an Argument (Callback)

arr.map(function(x) {
    return x * 2;
});

// Arrow Function
arr.map(x => x * 2);


2) Returned from Another Function

function createAdder() {
    return function(x) {
        return x + 1;
    };
}


3) Assigned to an Object Property

const person = {
    greet: function() {
        console.log("Hi");
    }
};


----------------------------------------------------------------------------------------------------------------------------
FIRST-CLASS CITIZENS
----------------------------------------------------------------------------------------------------------------------------

Functions are first-class citizens, meaning they can be treated like any other value.

They can be:
✔ Stored in variables
✔ Passed as arguments
✔ Returned from functions
✔ Assigned to object properties

This is why function expressions are so powerful.


----------------------------------------------------------------------------------------------------------------------------
WHY FUNCTION EXPRESSIONS ARE POWERFUL
----------------------------------------------------------------------------------------------------------------------------

1) REASSIGNMENT (CHANGE FUNCTION AT RUNTIME)
--------------------------------------------

let login = function() {
    console.log("Login with Password");
};

login();

login = function() {
    console.log("Login with OTP");
};

login();

Output:
Login with Password
Login with OTP

Explanation:
- `login` stores a reference to a function.
- Reassigning changes the reference.
- Only the latest assigned function is executed.


2) DYNAMIC BEHAVIOR
-------------------

let mode = "dark";

let action;

if (mode === "dark") {
    action = () => console.log("Dark Mode");
} else {
    action = () => console.log("Light Mode");
}

action();

Output:
Dark Mode

Explanation:
- Different functions are assigned based on a condition.
- The same variable can execute different logic at runtime.


----------------------------------------------------------------------------------------------------------------------------
REAL-WORLD USE CASES
----------------------------------------------------------------------------------------------------------------------------

1) Event Handling

button.addEventListener("click", function () {
    console.log("Button clicked");
});

✔ Pass the logic to execute when the button is clicked.


2) Callbacks

let result = [1,2,3].map(function(x) {
    return x * 2;
});

✔ Pass the logic for transforming each element.


3) Timers

setTimeout(function () {
    console.log("Executed after 2 seconds");
}, 2000);

✔ Pass the logic to execute after a delay.


4) Express Middleware

app.use(function(req, res, next) {
    console.log(req.url);
    next();
});

✔ Pass the logic to execute for every incoming request.


----------------------------------------------------------------------------------------------------------------------------
INTERVIEW POINT
----------------------------------------------------------------------------------------------------------------------------

Why are function expressions powerful?

- Functions are first-class citizens in JavaScript.
- They can be treated like values.
- Since they represent behavior (logic), they can be stored, passed, returned, or reassigned dynamically.
- This enables callbacks, event handling, middleware, timers, and dynamic application behavior.


ONE-LINER
---------

Function expressions are powerful because functions are first-class citizens—they represent behavior, can be treated like values, and enable dynamic, reusable code.

============================================================================================================================
HIGHER ORDER FUNCTIONS (HOF)
============================================================================================================================

A HOF often uses function expressions (or arrow functions) as arguments.

Example:

arr.map(function(x) {
    return x * 2;
});
function(x) { ... } → Function Expression
map() → Higher-Order Function (HOF)

Another example:

setTimeout(function() {
    console.log("Hello");
}, 1000);
Anonymous function → Function Expression
setTimeout() → Higher-Order Function


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