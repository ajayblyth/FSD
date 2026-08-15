
JavaScript Functions (Detailed)



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