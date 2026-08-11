
JAVASCRIPT (JS)
============================================================================================================================

Definition

JavaScript (JS) is a high-level, lightweight, interpreted(executed line by line) programming language used to make web pages dynamic & interactive by manipulating the DOM, handling user events, communicating with server.


Why was JavaScript Created?

Originally, websites were built using only:
• HTML → Structure
• CSS  → Styling

Note:html/css alone couldn't change its content or behavior after it loaded without requesting a new page from the server.
These websites were static and offered very little user interaction.

on the other hand JavaScript can:
• Manipulate the DOM without reloading the page
• Handle user events (click, input, submit, scroll, etc.)
• API communication
• Validate forms on the client side
• Run in web browsers and on servers using Node.js
• Real-time updates

JavaScript Nature (Interview Point)

• Single-threaded language
  - JavaScript executes one task at a time using a single Call Stack.
  - It performs asynchronous operations (setTimeout, fetch, Promises, async/await, etc.) with the help of Browser APIs/Node APIs and the Event Loop.

Key Features

•• Platform-independent....JavaScript code can run on different operating systems (Windows, Linux, macOS)
 without modification.
• Event-driven...JavaScript executes code in response to events like button clicks, keyboard input, timers, or API responses.
• Asynchronous (Callbacks, Promises, Async/Await)
• Single-threaded with an Event Loop
• Prototype-based inheritance
• First-class functions
• Automatic Garbage Collection

Note:"Prototype-based inheritance allows one object to inherit properties and methods from another object through
the prototype chain. JavaScript uses this mechanism to enable code reuse and inheritance."

Core Concepts
JavaScript supports:
• Variables
• Functions
• Objects
• Arrays
• DOM Manipulation
• Events
• Asynchronous Programming


Interview Answer (30–45 seconds)

JavaScript is a high-level, lightweight, interpreted programming language used to make web pages dynamic, interactive, and responsive. It works with HTML and CSS and can manipulate the DOM, handle user events, validate forms, communicate with APIs, and perform asynchronous operations. JavaScript is single-threaded, meaning it executes one task at a time using a single Call Stack, but it achieves asynchronous behavior through Browser APIs/Node APIs and the Event Loop. It also supports objects, arrays, functions, prototype-based inheritance, first-class functions, and automatic garbage collection, making it one of the most widely used programming languages for both frontend and backend development.



Note:Historically

JavaScript was considered an interpreted language because browsers executed the code directly.
Modern JavaScript engines like:

V8 (Chrome, Node.js)
SpiderMonkey (Firefox)
JavaScriptCore (Safari)

use Just-In-Time (JIT) compilation.

The engine:

Parses(check the syntax) the JavaScript code.
Converts it to bytecode.
Interprets the bytecode.
Compiles frequently executed ("hot") code into optimized machine code.

So JavaScript is not purely interpreted anymore.

An interpreted language executes code at runtime, whereas a compiled language converts the entire program into machine code before execution. Modern JavaScript uses JIT compilation, so it's not purely interpreted.
------------------
What is the DOM?
-----------------
DOM (Document Object Model) is a programming interface provided by the browser that represents an HTML document as a tree of objects.

It allows JavaScript to:

Read HTML
Modify HTML
Modify CSS
Add or remove elements
Handle user events

In simple words:

The DOM is the bridge between JavaScript and HTML.
------------------------------------------------------------------------------------------------------------
Programming Language:A formal language used to write instructions that a computer can understand and execute.

------------------------------------------------------------------------------------------------------------
Web Page: A single document displayed in a web browser, built using:
• HTML → Structure   • CSS → Styling   • JavaScript → Behavior
Examples: Home, Login, Product, Contact Us, About Us.

------------------------------------------------------------------------------------------------------------
Dynamic: The webpage content can change without reloading.

Example: • Clicking "Show Details" displays additional information instantly.

------------------------------------------------------------------------------------------------------------
Interactive: Allows users to perform actions .
Examples: • Add to Cart • Submit Form • Open Dropdown

------------------------------------------------------------------------------------------------------------
Responsive:Reacts immediately to user actions by updating the UI or content.
Examples: • Live Search • Instant Form Validation • Auto Price Update

| **Interactive**                 | **Responsive**                                     |
| ------------------------------- | -------------------------------------------------- |
| Lets the user perform actions.  | Responds immediately to those actions.             |
| Focuses on **user input**.      | Focuses on the **system's reaction**.              |
| User initiates the interaction. | UI/content updates as a result of the interaction. |

Example 1: Add to Cart
Interactive: User clicks "Add to Cart".
Responsive: Cart count instantly changes from 2 → 3 without reloading.


form verifies email/password and responds accordingly.
-----------------------------------------------------------------------------------------------------------
Key Features:
✔ Change content, style, and layout dynamically (without page reload)
✔ Handle events like clicks, typing, scrolling, and form submission
✔ Perform validation, filtering, and real-time updates
✔ Run in browsers (client-side) and on servers (Node.js)
-----------------------------------------------------------------------------------------------------------
Use Cases:
• Form Validation • Interactive Menus/Buttons • Chat & Notifications
• Dynamic Content • Games • Dashboards • Single Page Applications (SPAs)
------------------------------------------------------------------------------------------------------------
Interview One-Liner:
JavaScript makes web pages interactive by adding dynamic behavior, real-time updates,
and user-driven functionality.



Event Loop
================================================================================

The Event Loop is what allows JavaScript to perform asynchronous operations even though it is single-threaded.
it is like a manager for handling asynchrnous tasks.

1. What is the Event Loop?

Interview Answer:
JavaScript is single-threaded, meaning it executes one task at a time using a single Call Stack. The Event Loop continuously checks whether the Call Stack is empty. If it is, it moves ready callbacks from the Callback Queue or Microtask Queue to the Call Stack for execution.

2. Why do we need Event Loop?

Imagine this code:

console.log("Start");

setTimeout(() => {
    console.log("Hello");
}, 3000);

console.log("End");

If JavaScript waited 3 seconds here, the whole browser would freeze.

Instead,
JS starts timer
Continues executing next line
Executes callback later

Output
Start
End
Hello

This is possible because of the Event Loop.

---------------------------------------------------
Event Loop Execution Order starts with 
Execute all synchronous code in the Call Stack.
When the Call Stack is empty, execute all Microtasks.
Then execute one Macrotask (Task).
After that macrotask finishes:
Process all newly added Microtasks.
Then execute the next Macrotask.
Repeat until there are no more tasks.
----------------------------------------------------------

3. JavaScript Runtime

                                JavaScript Runtime

        +----------------------+
        |      Call Stack      |
        +----------------------+
                   ↑
              Event Loop
                   ↑
        +----------------------+
        |   Microtask Queue    |
        +----------------------+
                   ↑
        +----------------------+
        |    Callback Queue    |
        +----------------------+
                   ↑
          Browser APIs / Node APIs
      (setTimeout, fetch, DOM events)

4. Components

A) Call Stack
The Call Stack is a data structure that keeps track of which function is currently executing.

Calling a function → push it onto the stack.
Function finishes → pop it off the stack. (LIFO)
Example

function one() {
    two();
}

function two() {
    console.log("Hello");
}

one();

Stack
Call one()
Call two()
console.log()
Remove console.log
Remove two()
Remove one()

B) Web APIs (Browser)

These are not part of JavaScript.

Examples
setTimeout()
setInterval()
fetch()
DOM events
click
XMLHttpRequest

When JS sees

setTimeout(fn, 2000);

It sends timer work to Browser API.

C) Callback Queue (Macrotask Queue)

Stores callbacks waiting to execute.

Examples
setTimeout()
setInterval()
DOM Events
MessageChannel

D) Microtask Queue

Higher priority than Callback Queue.

Contains
Promise.then()
Promise.catch()
Promise.finally()
queueMicrotask()
MutationObserver

Microtasks always execute before macrotasks.

5. Event Loop Working

Example

console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");

Execution

Step 1
Call Stack
console.log("A")

Output
A

Step 2
setTimeout()
Moves timer to Browser API.

Step 3
console.log("C")

Output
A
C

Step 4
Call Stack becomes empty.
Timer finishes.
Callback enters Callback Queue.

Step 5
Event Loop checks
Call Stack Empty?
Yes

Moves callback to Call Stack.

Output
A
C
B

6. Why does setTimeout(0) execute later?

console.log(1);

setTimeout(() => {
    console.log(2);
}, 0);

console.log(3);

Output
1
3
2

Reason

Even with 0 ms delay,
Callback goes to Browser API
Then Callback Queue
Event Loop waits until Call Stack is empty

7. Promise vs setTimeout

console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");

Output
Start
End
Promise
Timeout

Why?

Because

Promise
    ↓
Microtask Queue
    ↓
Higher Priority
    ↓
setTimeout
    ↓
Callback Queue

8. Multiple Promises

console.log(1);

Promise.resolve().then(() => {
    console.log(2);
});

Promise.resolve().then(() => {
    console.log(3);
});

console.log(4);

Output
1
4
2
3

Both Promises execute before any macrotask.

9. Promise inside setTimeout

setTimeout(() => {
    console.log("A");

    Promise.resolve().then(() => {
        console.log("B");
    });

    console.log("C");
}, 0);

Output
A
C
B

Reason

Inside the timeout callback:
A prints.
Promise callback goes to the Microtask Queue.
C prints.
After the current callback finishes, the microtask (B) runs.

10. Nested setTimeout

console.log(1);

setTimeout(() => {
    console.log(2);

    setTimeout(() => {
        console.log(3);
    }, 0);

}, 0);

console.log(4);

Output
1
4
2
3

11. Async/Await

async function test() {
    console.log("A");

    await Promise.resolve();

    console.log("B");
}

test();

console.log("C");

Output
A
C
B

Reason

await pauses the async function and resumes it as a microtask.

12. Execution Order (Very Important)

Priority:

1. Call Stack (current synchronous code)
                ↓
2. Microtask Queue
   - Promise.then
   - catch
   - finally
   - queueMicrotask
                ↓
3. Callback Queue (Macrotasks)
   - setTimeout
   - setInterval
   - DOM events

The Event Loop always empties the Microtask Queue before processing the next Macrotask.

13. Common Interview Questions

Q. Is JavaScript single-threaded?

Yes. JavaScript executes code on a single Call Stack, while browsers/Node.js provide asynchronous APIs.

Q. What is the Event Loop?

A mechanism that checks whether the Call Stack is empty and moves callbacks from the Microtask Queue or Callback Queue to the Call Stack.

Q. Which has higher priority: Promise or setTimeout?

Promise callbacks (.then, catch, finally) because they are microtasks.

Q. Why does setTimeout(fn, 0) run after synchronous code?

Because its callback is placed in the Callback Queue and runs only after the Call Stack is empty and all pending microtasks have finished.

One-line summary to remember

Synchronous code executes first → all Microtasks (Promises, await) execute next → then one Macrotask (setTimeout, setInterval, events) is executed → repeat


JavaScript Functions (Detailed)
=============================================================================
What is a Function?

A function is a reusable block of code designed to perform a specific task. It executes only when it is called (invoked).

Why do we need functions?
Without functions, if the same logic is needed multiple times, we have to write the same code repeatedly. This leads to code duplication, makes the code difficult to maintain, and increases the chances of errors. If the logic changes, we must update it in every place where it was written.

Functions solve this problem by allowing us to write the logic once and reuse it multiple times with different inputs (parameters). This improves code  readability, maintainability and allows us to use the logic again.

console.log(10 + 20);
console.log(50 + 60);
console.log(100 + 200);

With functions:

function add(a, b) {
    return a + b;
}

console.log(add(10, 20));
console.log(add(50, 60));
console.log(add(100, 200));

Benefits: Code Reusability | Easier Maintenance | Better Readability

Function Syntax

function functionName(parameters) {

    // code

    return value;

}

Example

function greet() {
    console.log("Hello");
}

greet();

Output: Hello

Function Components

function add(a, b) {
    return a + b;
}

function → Keyword    add → Function Name    a,b → Parameters    return → Returns value

Calling

add(10,20);

10,20 → Arguments

Parameters vs Arguments

function add(a,b) {
    return a+b;
}

add(10,20);

a,b → Parameters    10,20 → Arguments

Interview Question:

Difference?

Parameters are variables defined in the function declaration.
Arguments are actual values passed while calling the function.
Ways to Define (Write) Functions in JavaScript

1. Function Declaration

function greet() {
    console.log("Hello");
}

- Declared using the function keyword.
- Fully hoisted (can be called before its declaration).

--------------------------------------------------

2. Function Expression

const greet = function () {
    console.log("Hello");
};

- Function assigned to a variable.
- Not fully hoisted (cannot be called before assignment).

--------------------------------------------------

3. Anonymous Function

const greet = function () {
    console.log("Hello");
};

- A function without a name.
- Commonly used as callbacks in event listeners, array methods, and asynchronous operations.

--------------------------------------------------

4. Named Function Expression

const greet = function sayHello() {
    console.log("Hello");
};

- Function expression with a name.
- Useful for debugging and recursion.
- Rarely used in everyday code.

--------------------------------------------------

5. Arrow Function

const greet = () => {
    console.log("Hello");
};

- Shorter syntax for writing functions.
- Commonly used for callbacks.
- Inherits the surrounding `this` (lexical `this`).

Example:

numbers.map(num => num * 2);

--------------------------------------------------

6. Immediately Invoked Function Expression (IIFE)

(function () {
    console.log("Executed");
})();

Output:
Executed

- Executes immediately after it is defined.
- Used to create a private scope and avoid polluting the global scope.

----------------------------------
Return Keyword

Without return

function add(a,b){

    a+b;

}

console.log(add(2,3));

Output: undefined

With return

function add(a,b){

    return a+b;

}

console.log(add(2,3));

Output: 5

Default Parameters

function greet(name="Guest"){

    console.log(name);

}

greet();

Output: Guest

Rest Parameter

function sum(...numbers){

    console.log(numbers);

}

sum(1,2,3,4);

Output: [1,2,3,4]

Callback Function

function process(callback){

    callback();

}

process(function(){

    console.log("Done");

});

Higher Order Function

A function that:
accepts another function
returns another function

function greet(callback){

    callback();

}

Scope

let x=10;

function test(){

    let y=20;

}

x → Global    y → Local

-------------------------------------

5. this Keyword
this refers to the object that is executing the function.
Its value depends on how the function is called, not where it is defined.
In a regular function, this can change based on the caller.
In the global scope (non-strict mode), this refers to the global object (window in browsers).

Example:

const person = {
  name: "Ajay",
  greet() {
    console.log(this.name);
  }
};

person.greet(); // Ajay

6. Arrow Function
Introduced in ES6 as a shorter syntax for writing functions.
Arrow functions do not have their own this.
They inherit this from the surrounding (lexical) scope.
Commonly used in callbacks, array methods (map, filter, forEach), and React.

Example:

const person = {
  name: "Ajay",
  greet() {
    const say = () => console.log(this.name);
    say();
  }
};

person.greet(); // Ajay

7. Function Methods (call(), apply(), bind())
These methods are used to explicitly set the value of this for a function.
call() invokes the function immediately and accepts arguments individually.
apply() invokes the function immediately but accepts arguments as an array.
bind() does not invoke the function immediately; it returns a new function with this permanently bound.

Example:

function greet(city) {
  console.log(this.name + " from " + city);
}

const person = { name: "Ajay" };

greet.call(person, "Bangalore");        // Ajay from Bangalore
greet.apply(person, ["Hyderabad"]);     // Ajay from Hyderabad

const fn = greet.bind(person);
fn("Delhi");                            // Ajay from Delhi
8. First-Class Functions
In JavaScript, functions are first-class citizens, meaning they are treated like any other value.
Functions can be assigned to variables, passed as arguments, returned from other functions, and stored in objects or arrays.
This makes JavaScript powerful for callbacks, event handling, promises, and functional programming.

Examples:

// Stored in a variable
const greet = function () {
  console.log("Hello");
};

// Passed as an argument
function execute(fn) {
  fn();
}
execute(greet);

// Returned from another function
function getFunction() {
  return greet;
}
getFunction()();

// Stored inside an object
const obj = {
  sayHello: greet
};
obj.sayHello();

Interview Function Definition

A function is a reusable block of code that performs a specific task. In JavaScript, functions are first-class objects, meaning they can be assigned to variables, passed as arguments, returned from other functions, and stored inside objects. Functions support parameters, return values, closures, callbacks, and higher-order programming, making them a fundamental building block of JavaScript applications.


JAVASCRIPT OBJECTS
====================================================================================================

1. What is an Object?

An object is a collection of key-value pairs used to represent a single entity(employee, product) by grouping
its related data  and behavior together, making code easier to organize,
read, maintain, and pass between functions.

data -> property
behaviour -> methods

Example
const person = {
    name: "Ajay",
    age: 30,
    city: "Delhi"
};

Objects are reference types in JavaScript. Variables do not store the actual object; 
they store a reference (memory address) to the object. 
If two variables reference the same object, a change made through one variable is visible 
through the other because both point to the same object in memory.

const obj1 = {
    name: "Ajay"
};

const obj2 = obj1;

obj2.name = "Rahul";

console.log(obj1.name); // Rahul

2. Why do we use Objects?

Objects help group related data into a single unit, making code easier to organize,
read, maintain, and pass between functions.

Instead of creating multiple variables, we store everything inside one object.
• Better organization of related data.
• Improves readability and maintainability.

====================================================================================================

3. Object Structure
An object consists of properties (key-value pairs). A property stores information,
while a method is simply a function stored inside an object.

Interview Points
• Key = Property name.
• Value = Data or function.
• Methods are functions inside objects.

Example

const student = {
    name: "Ajay",
    age: 30,
    marks: 95
};

====================================================================================================

4. Creating Objects

JavaScript provides multiple ways to create objects.

Interview Points

1. Object Literal
• Simplest and most commonly used.
• Preferred in almost every project.

const student = {
    name: "Ajay"
};

------------------------------------------------------------

2. new Object()

• Creates an empty object using the Object constructor.
• Less commonly used.

const student = new Object();

------------------------------------------------------------

3. Object.create()

• Creates a new object that inherits from another object's prototype.
• Mainly used for prototype-based inheritance.

const dog = Object.create(animal);

====================================================================================================

5. Accessing Properties

Properties can be accessed using dot notation or bracket notation.

Interview Points

Dot Notation
• Used when the property name is known.

student.name

------------------------------------------------------------

Bracket Notation
• Used when the property name is dynamic.
• Also works with spaces or special characters.

student["name"]

====================================================================================================

6. Add, Update & Delete Properties

Objects are mutable, so properties can be added, modified, or removed.

Interview Points
• Add → object.newProperty
• Update → object.property = value
• Delete → delete object.property

====================================================================================================

7. Object Methods

A method is simply a function stored inside an object.

Methods usually operate on the object's own data.

Interview Points
• Method = Function inside an object.
• Invoked using object.method().

Example

const person = {
    greet() {
        console.log("Hello");
    }
};

====================================================================================================

8. Nested Objects

Objects can contain other objects, allowing complex data structures.

Interview Points
• Access nested properties using multiple dots.
• Common in API responses.

Example

student.address.city

====================================================================================================
9. Built-in Object Methods

--------------------------------------------------------------------------------
Object.keys()
--------------------------------------------------------------------------------

Returns an array containing all property names (keys).

Interview Point
Mostly used for looping through object properties.

Syntax / Example

const student = { name: "Ajay", age: 30 };

Object.keys(student);
// ["name", "age"]

--------------------------------------------------------------------------------
Object.values()
--------------------------------------------------------------------------------

Returns an array containing all property values.

Interview Point
Useful when only values are required.

Syntax / Example

const student = { name: "Ajay", age: 30 };

Object.values(student);
// ["Ajay", 30]

--------------------------------------------------------------------------------
Object.entries()
--------------------------------------------------------------------------------

Returns an array of key-value pairs.

Interview Point
Commonly used with for...of loops.

Syntax / Example

const student = { name: "Ajay", age: 30 };

Object.entries(student);
// [["name", "Ajay"], ["age", 30]]

--------------------------------------------------------------------------------
Object.assign()
--------------------------------------------------------------------------------

Copies properties from one object to another.

Interview Point
Used to create shallow copies or merge objects.

Syntax / Example

const student = { name: "Ajay", age: 30 };

const copy = Object.assign({}, student);
// Creates a shallow copy

const merged = Object.assign({}, student, { city: "Delhi" });
// Merges objects

--------------------------------------------------------------------------------
Object.freeze()
--------------------------------------------------------------------------------

Makes an object immutable.

Interview Points
• Cannot add properties.
• Cannot update properties.
• Cannot delete properties.

Syntax / Example

const student = { name: "Ajay" };

Object.freeze(student);

student.name = "Rahul";   // Ignored
student.city = "Delhi";   // Ignored

--------------------------------------------------------------------------------
Object.seal()
--------------------------------------------------------------------------------

Allows updating existing properties only.

Interview Points
• Update ✔
• Add ✘
• Delete ✘

Syntax / Example

const student = { name: "Ajay", age: 30 };

Object.seal(student);

student.age = 31;         // ✔ Allowed
student.city = "Delhi";   // ✘ Not Added
delete student.name;      // ✘ Not Deleted

--------------------------------------------------------------------------------
Object.hasOwn()
--------------------------------------------------------------------------------

Checks whether an object directly owns a property.

Interview Point
Returns true or false.

Syntax / Example

const student = { name: "Ajay" };

Object.hasOwn(student, "name");   // true
Object.hasOwn(student, "age");    // false

10. Spread Operator (...)

Used to copy or merge objects.

Interview Points
• Creates a shallow copy.
• Commonly used in React state updates.
• Does not deep copy nested objects.

Example

const employee = {
    ...person,
    salary: 50000
};

====================================================================================================

11. Object Destructuring

Extracts object properties into separate variables.

Interview Points
• Makes code cleaner.
• Very common in React props and state.

Example

const { name, age } = student;

====================================================================================================

12. Shallow Copy

Creates a new object, but nested objects are still shared.

Interview Points
• Top-level properties are copied.
• Nested objects remain referenced.

Ways
• Spread operator (...)
• Object.assign()


Note:
Spread (...)  = Expands things out.
                1 object → many properties
                1 array  → many elements

Rest (...)    = Collects things together.
                Many values → 1 array/object

====================================================================================================

13. Object Reference

Objects are stored by reference, not by value.

When two variables reference the same object, changes made through one variable
are reflected in the other.

Interview Points
• Variables store object references.
• Both variables point to the same memory location.

Example

const obj2 = obj1;

obj2.a = 20;

console.log(obj1.a); // 20

Memory

obj1 ───────┐
            ▼
         { a: 20 }
            ▲
obj2 ───────┘

14. Object vs Map

Object                               Map
-----------------------------------  ----------------------------------------
String/Symbol keys only              Any type of key
Dot / Bracket notation               get(), set(), delete()
Simple fixed data                    Dynamic key-value storage
Less suitable for frequent changes   Better for frequent add/remove operations

Interview Summary

✔ Object = Collection of key-value pairs
✔ Access using dot or bracket notation
✔ Add, Update, Delete properties
✔ Methods = Functions inside objects
✔ Objects can be nested
✔ Important methods:
      • Object.keys()
      • Object.values()
      • Object.entries()
      • Object.assign()
      • Object.freeze()
      • Object.seal()
      • Object.hasOwn()
✔ Spread operator copies/merges objects
✔ Destructuring extracts properties
✔ Objects are reference types
✔ Map is preferred when keys are dynamic or not strings

JavaScript Asynchronous Programming
====================================================
To understand Callbacks, Callback Hell, and Promises, you first need to understand Synchronous vs Asynchronous JavaScript.

1. Synchronous JavaScript

JavaScript executes code line by line.

The next line waits until the previous line finishes.

console.log("Start");

console.log("Middle");

console.log("End");

Output

Start
Middle
End

This is called synchronous execution.

Problem: Suppose fetching data from a server takes 5 seconds.

console.log("Start");

// Fetch Data (5 sec)

console.log("End");

If JavaScript waited for 5 seconds, the browser would freeze.

To solve this problem, JavaScript uses Asynchronous Programming.

2. Asynchronous JavaScript

JavaScript delegates long-running tasks such as timers, network requests, file operations, and event handling to Browser Web APIs or Node.js APIs. Once the task completes, the callback or Promise is queued, and the Event Loop executes it when the Call Stack is empty.

Example

console.log("Start");

setTimeout(() => {
    console.log("Hello");
}, 2000);

console.log("End");

Output

Start
End
Hello

Why?

Start
  ↓
Timer starts (2 sec)
  ↓
JavaScript continues
  ↓
End
  ↓
2 sec completed
  ↓
Hello


Callback
========================================================================================================================

Definition

A callback is a function that is passed as an argument to another function and is executed later, either after a task completes or when an event occurs. In JavaScript, callbacks are commonly used for asynchronous operations such as setTimeout, setInterval, event listeners, and API requests. Once the asynchronous task is complete, the callback is placed in the Callback Queue. The Event Loop continuously checks whether the Call Stack is empty. When it is, the Event Loop moves the callback from the Callback Queue to the Call Stack, where the JavaScript engine executes it. This mechanism allows JavaScript to perform asynchronous tasks while remaining single-threaded.

Example 1

document.getElementById("submitBtn").addEventListener("click", () => {
    console.log("Form submitted");
});
Output

Hello Ajay
Good Bye

Example 2

function calculate(a, b, operation) {
    operation(a, b);
}

function add(x, y) {
    console.log(x + y);
}

calculate(10, 20, add);

Output

30

Real Example

setTimeout(function () {
    console.log("Executed");
}, 3000);

The anonymous function is the callback.

Why Callbacks?

They execute code only after another task completes.

Examples

Reading a file
Fetching data
Database queries
Timers
Event listeners


Callback Hell
========================================================================================================================

Definition

When callbacks are nested inside callbacks repeatedly, the code becomes difficult to read, understand, and maintain. This is known as Callback Hell or the Pyramid of Doom.

Example

loginUser(function(user)){

getOrders(orders, function(payment)){

    getPaymemt
}

}

loginUser(function (user) {

    getOrders(user, function (orders) {

        getPayment(orders, function (payment) {

            sendEmail(payment, function () {

                console.log("Done");

            });

        });

    });

});

The important point is dependency:

You can't fetch orders until you know which user is logged in.
You can't fetch payment details until you know which order(s) you're checking.
You can't send the email until you have the payment information.
Looks like:

login
   |
   └── orders
          |
          └── payment
                 |
                 └── email

This deep nesting is hard to manage.

Problems with Callback Hell

Difficult to read
Hard to debug
Error handling is complicated
Difficult to maintain
Nested code grows quickly

Solution → Promises

Promise
========================================================================================================================

Definition

A Promise is an object that represents the eventual completion or failure of an asynchronous operation.

Instead of giving a callback immediately, an asynchronous function returns a Promise.

Promise States

                    Promise
                       │
             ┌─────────┼─────────┐
             │         │         │
         Pending   Fulfilled  Rejected
                       │          │
                   Success     Failure

1. Pending

Task is still running.

2. Fulfilled (success)

Task completed successfully.

3. Rejected

Task failed.

Creating a Promise

const promise = new Promise((resolve, reject) => {  //

    let success = true;

    if (success) {
        resolve("Data Loaded");
    } else {
        reject("Error");
    }

});

Consuming a Promise

promise
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });

Output

Data Loaded

Example 2

function checkAge(age) {

    return new Promise((resolve, reject) => {

        if (age >= 18)
            resolve("Eligible");

        else
            reject("Not Eligible");

    });

}

checkAge(20)
    .then(result => console.log(result))
    .catch(error => console.log(error));

Output

Eligible

Promise Chaining

Instead of nesting callbacks:

login()
.then(getOrders)
.then(getPayment)
.then(sendEmail)
.catch(error => console.log(error));

Much cleaner than callback hell.

then()

Runs when the promise is fulfilled.

promise.then(result => {
    console.log(result);
});

catch()

Runs when the promise is rejected.

promise.catch(error => {
    console.log(error);
});

finally()

Runs whether the promise succeeds or fails.

promise
    .then(...)
    .catch(...)
    .finally(() => {
        console.log("Completed");
    });

    Q: Why do we use finally()? (Interview Answer)

Answer:

finally() is used to execute code regardless of whether the Promise is fulfilled or rejected. It's commonly used for cleanup tasks that should always happen.

Real-world Uses
Hide a loading spinner.
Close a database connection.
Release a file/resource.
Re-enable a disabled button.
Stop a progress bar.

Real Example using fetch()


fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));

Flow

Request
   ↓
Promise Pending
   ↓
Success
   ↓
then()
   ↓
Data

or

Failure
   ↓
catch()


Callback vs Promise

Callback                                 Promise
--------                                 -------
Function passed as an argument           Object representing async result
Can lead to Callback Hell                Avoids Callback Hell
Hard error handling                      Centralized with .catch()
Difficult to chain                       Easy chaining with .then()


Callback Hell vs Promise

Callback Hell

login(function () {
    getOrders(function () {
        getPayment(function () {
            sendEmail();
        });
    });
});

Promise

login()
    .then(getOrders)
    .then(getPayment)
    .then(sendEmail)
    .catch(console.error);

Promises make asynchronous code flatter, easier to read, and easier to handle errors.


Complete Flow


Synchronous
      │
      ▼
Asynchronous
      │
      ▼
Callback
      │
      ▼
Callback Hell
      │
      ▼
Promises
      │
      ▼
Promise Chaining
      │
      ▼
Async/Await (Modern Approach)


Interview Answers


What is a Callback?

A callback is a function passed as an argument to another function and executed after a task completes. It is commonly used for asynchronous operations such as timers, event handling, API calls, and file operations.

What is Callback Hell?

Callback Hell is a situation where multiple asynchronous callbacks are nested inside one another, creating deeply indented code that is difficult to read, debug, and maintain. It is also known as the Pyramid of Doom.

What is a Promise?

A Promise is an object that represents the eventual completion or failure of an asynchronous operation. It has three states: Pending, Fulfilled, and Rejected. Promises simplify asynchronous programming by providing methods like .then(), .catch(), and .finally() for handling results and errors, making the code cleaner and avoiding callback hell.

=====================================================================================