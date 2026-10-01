
“I’m a software developer with over 3 years of experience in backend development, and recently I’ve been working extensively with the MERN stack. My main focus has been building REST APIs, implementing business logic, working with databases, and integrating frontend and backend applications.

On the backend, I work with Node.js, Express.js, MongoDB, and REST APIs, and on the frontend I work with React, JavaScript, HTML, and CSS. I’m comfortable with concepts like authentication and authorization, JWT, CRUD operations, API integration, React Hooks, and state management.

In my projects, we mainly use a combination of React on the frontend and Node.js with Express on the backend, where the frontend communicates with the backend through REST APIs. I’m now looking for an opportunity where I can work on real-world MERN applications, take more ownership, and continue growing as a full-stack developer.”
JavaScript Functions (Detailed)
JAVASCRIPT OBJECTS


# 1. WHAT IS AN OBJECT?

An object is a collection of related data and functionality stored as key-value pairs.

It is used to represent a real-world entity or keep related information together. Instead of storing related data in different variables and remembering which variables belong together, an object groups everything in one place.

Example:

const name = "Ajay";
const age = 31;
const address = "Bangalore";

Instead:

const person = {
name: "Ajay",
age: 31,
address: "Bangalore"
};

Now name, age, and address are clearly related because they belong to the same person object.

Main purpose:
Organize related data and functionality together, making the data easier to access, manage, and understand.

data      → property
behaviour → methods

Example:

const person = {
name: "Ajay",
age: 30,
city: "Delhi"
};

NOTE: Objects are reference types in JavaScript. Variables do not store the actual object; they store a reference (memory address) to the object.

If two variables reference the same object, a change made through one variable is visible through the other because both point to the same object in memory.

const obj1 = {
name: "Ajay"
};

const obj2 = obj1;

obj2.name = "Rahul";

console.log(obj1.name); // Rahul

====================================================================================================

2. WHY DO WE USE OBJECTS?

Objects help group related data into a single unit, making code easier to organize, read, maintain, and pass between functions.

Instead of creating multiple variables, we store everything inside one object.

• Better organization of related data
• Improves readability
• Improves maintainability

====================================================================================================

3. OBJECT STRUCTURE

An object consists of properties (key-value pairs).

A property stores information, while a method is simply a function stored inside an object.

Interview Points:
• Key   = Property name
• Value = Data or function
• Method = Function inside an object

Example:

const student = {
name: "Ajay",
age: 30,
marks: 95
};

====================================================================================================

4. CREATING OBJECTS

JavaScript provides multiple ways to create objects.

INTERVIEW POINTS:

1. Object Literal

• Simplest and most commonly used
• Preferred in almost every project

const student = {
name: "Ajay"
};

---

2. new Object()

• Creates an empty object using the Object constructor
• Less commonly used

const student = new Object();

student.name = "Ajay";
student.age = 31;

console.log(student.name); // Ajay

-----
new Object() essentially means:
Create a new object using Object as the constructor.

WHAT DOES new ACTUALLY DO?

When you use:

new SomeFunction()

JavaScript roughly does 4 things:

1. Create a new empty object
   ↓
2. Connect that object to SomeFunction's prototype
   ↓
3. Call SomeFunction with this pointing to the new object
   ↓
4. Return the new object

WHAT IS A CONSTRUCTOR?

A constructor is a function used to  initialize objects.

Object is a built-in JavaScript constructor.

Example: custom constructor function

function Person(name, age) {
this.name = name;
this.age = age;
}

const person1 = new Person("Ajay", 31);
const person2 = new Person("Rahul", 28);

console.log(person1.name); // Ajay
console.log(person2.name); // Rahul

Flow:

Person
↓
constructor function
↓
new Person(...)
↓
creates a new object

WHAT DOES this MEAN HERE?

When you do:

const person1 = new Person("Ajay", 31);

this inside Person refers to the newly created object.

So:

this.name = name;

means:

person1.name = "Ajay";

WHY DO WE NEED new?

Without new:

const person1 = Person("Ajay", 31);

You are simply calling the function normally. It does not automatically create a new object for you.

With:

const person1 = new Person("Ajay", 31);

JavaScript creates a new object and sets this to that object.

new WITH CLASSES

This is also why you see:

class Person {
constructor(name) {
this.name = name;
}
}

const person = new Person("Ajay");

Person is a class, and new Person() creates an instance/object from that class.

Flow:

class Person
↓
new Person("Ajay")
↓
new object / instance
↓
person

IMPORTANT TERMS

## Term             Meaning

new               Creates a new object/instance using a constructor
Constructor       Function/class used to initialize an object
this              Refers to the newly created object when used with new
Instance          The object created by a constructor/class
Prototype         Object from which another object can inherit properties/methods

INTERVIEW ANSWER:

The new keyword is used to create a new object or instance from a constructor function or class. It creates a new object, links it to the constructor's prototype, calls the constructor with this referring to the new object, and returns that object.

---

3. Object.create()

• Creates a new object that inherits from another object's prototype.
• Mainly used for prototype-based inheritance.

Example:

const animal = {
eat() {
console.log("Eating...");
}
};

const dog = Object.create(animal);

dog.name = "Bruno";

console.log(dog.name); // Bruno
dog.eat();             // Eating...

====================================================================================================

5. ACCESSING PROPERTIES

Properties can be accessed using dot notation or bracket notation.

DOT NOTATION

• Used when the property name is known.

student.name

BRACKET NOTATION

• Used when the property name is dynamic.
• Also works with spaces or special characters.

student["name"]

ex:
const person = {
  name: "Ajay",
  "full name": "Ajay Sharma"
};

// Normal property
console.log(person["name"]); // Ajay

// Property with space
console.log(person["full name"]); // Ajay Sharma

// Dynamic property
const key = "name";
console.log(person[key]); // Ajay

====================================================================================================

6. ADD, UPDATE & DELETE PROPERTIES

Objects are mutable, so properties can be added, modified, or removed.

Add:
object.newProperty

Update:
object.property = value

Delete:
delete object.property

====================================================================================================

7. OBJECT METHODS

A method is simply a function stored inside an object.

Methods usually operate on the object's own data.

Interview Points:
• Method = Function inside an object
• Invoked using object.method()

Example:
const person = {
  name: "Ajay",
  age: 31,

  greet() {
    console.log("Hello, I am " + this.name);
  }
};

person.greet(); // Hello, I am Ajay




====================================================================================================

8. NESTED OBJECTS

Objects can contain other objects, allowing complex data structures.

Interview Points:
• Access nested properties using multiple dots.
• Common in API responses.

Example:

student.address.city

====================================================================================================

9. BUILT-IN OBJECT METHODS

---

## Object.keys()

Returns an array containing all property names (keys).

Interview Point:
Mostly used for looping through object properties.

Example:

const student = { name: "Ajay", age: 30 };

Object.keys(student);

// ["name", "age"]

---

## Object.values()

Returns an array containing all property values.

Interview Point:
Useful when only values are required.

Example:

const student = { name: "Ajay", age: 30 };

Object.values(student);

// ["Ajay", 30]

---

## Object.entries()

Returns an array of key-value pairs.

Interview Point:
Commonly used with for...of loops.

Example:

const student = { name: "Ajay", age: 30 };

Object.entries(student);

// [["name", "Ajay"], ["age", 30]]

---

## Object.assign()

Copies properties from one object to another.

Interview Point:
Used to create shallow copies or merge objects.

Example:

const student = { name: "Ajay", age: 30 };

const copy = Object.assign({}, student);
// Creates a shallow copy

const merged = Object.assign({}, student, { city: "Delhi" });
// Merges objects
---

merge example:
const student = {
  name: "Ajay",
  age: 30
};

const details = {
  city: "Bangalore",
  course: "MERN"
};

const result = Object.assign({}, student, details);

console.log(result);
---

Note: {} the first argument is the target object — the object into which properties will be copied.

## Object.freeze()

Makes an object immutable.

Interview Points:
• Cannot add properties
• Cannot update properties
• Cannot delete properties
✅ Can read existing properties

Example:

const student = { name: "Ajay" };

Object.freeze(student);

student.name = "Rahul";  // Ignored
student.city = "Delhi"; // Ignored

---

## Object.seal()

Allows updating existing properties only.

Interview Points:
• Update ✔
• Add    ✘
• Delete ✘

Example:

const student = { name: "Ajay", age: 30 };

Object.seal(student);

student.age = 31;          // ✔ Allowed
student.city = "Delhi";   // ✘ Not Added
delete student.name;      // ✘ Not Deleted

---

## Object.hasOwn()

Checks whether an object directly owns a property.

Interview Point:
Returns true or false.

Example:

const student = { name: "Ajay" };

Object.hasOwn(student, "name"); // true
Object.hasOwn(student, "age");  // false

====================================================================================================

10. SPREAD OPERATOR (...)

Used to copy or merge objects.

Interview Points:
• Creates a shallow copy
• Commonly used in React state updates
• Does not deep copy nested objects

Example:

const person = {
  name: "Ajay",
  age: 31
};

const employee = {
  ...person,
  salary: 50000
};

console.log(employee);

//{
  name: "Ajay",
  age: 31,
  salary: 50000
}
====================================================================================================

11. OBJECT DESTRUCTURING

Extracts object properties into separate variables.

Interview Points:
• Makes code cleaner
• Very common in React props and state

Example:

const { name, age } = person;

====================================================================================================

12. SHALLOW COPY

Creates a new object, but nested objects are still shared.

Interview Points:
• Top-level properties are copied
• Nested objects remain referenced

Ways:
• Spread operator (...)
• Object.assign()

SPREAD vs REST

Spread (...) = Expands things out.

1 object → many properties
1 array  → many elements

Rest (...) = Collects things together.

Many values → 1 array/object

====================================================================================================

13. OBJECT REFERENCE

Objects are stored by reference, not by value.

When two variables reference the same object, changes made through one variable are reflected in the other.

Interview Points:
• Variables store object references
• Both variables point to the same memory location

Example:

const obj2 = obj1;

obj2.a = 20;

console.log(obj1.a); // 20

Memory:

obj1 ───────┐
▼
{ a: 20 }
▲
obj2 ───────┘

====================================================================================================

14. OBJECT vs MAP

## Object                              Map

String/Symbol keys only             Any type of key
Dot / Bracket notation              get(), set(), delete()
Simple fixed data                   Dynamic key-value storage
Less suitable for frequent changes  Better for frequent add/remove operations

INTERVIEW SUMMARY

✔ Object = Collection of key-value pairs
✔ Access using dot or bracket notation
✔ Add, Update, Delete properties
✔ Methods = Functions inside objects
✔ Objects can be nested

Important methods:
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

# ====================================================================================================

SYNCHRONOUS, ASYNCHRONOUS JAVASCRIPT, CALLBACKS & PROMISES

To understand Callbacks, Callback Hell, and Promises, first understand Synchronous vs Asynchronous JavaScript.

1. SYNCHRONOUS JAVASCRIPT

JavaScript executes code line by line.

The next line waits until the previous line finishes.

Example:

console.log("Start");
console.log("Middle");
console.log("End");

Output:

Start
Middle
End

This is called synchronous execution.

PROBLEM:

Suppose fetching data from a server takes 5 seconds.

console.log("Start");

// Fetch Data (5 sec)

console.log("End");

If JavaScript waited for 5 seconds, the browser would freeze.

To solve this problem, JavaScript uses Asynchronous Programming.

====================================================================================================

2. ASYNCHRONOUS JAVASCRIPT

JavaScript delegates long-running tasks such as  network requests, file operations, timers and event handling to Browser Web APIs or Node.js APIs.

Once the task completes, the callback or Promise is queued, and the Event Loop executes it when the Call Stack is empty.

Example:

console.log("Start");

setTimeout(() => {
console.log("Hello");
}, 2000);

console.log("End");

Output:

Start
End
Hello

WHY?

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

====================================================================================================

3. PROMISE

DEFINITION:

A Promise is an object that represents the eventual completion or failure of an asynchronous operation.

Instead of giving a callback immediately, an asynchronous function returns a Promise.

PROMISE STATES

                Promise
                   │
         ┌─────────┼─────────┐
         │         │         │
      Pending   Fulfilled  Rejected
                   │         │
                Success    Failure

1. Pending
   Task is still running.

2. Fulfilled (Success)
   Task completed successfully.

3. Rejected
   Task failed.

====================================================================================================

4. CREATING A PROMISE

const promise = new Promise((resolve, reject) => {
let success = true;

if (success) {
    resolve("Data Loaded");
} else {
    reject("Error");
}

});

CONSUMING A PROMISE

promise
.then(result => {
console.log(result);
})
.catch(error => {
console.log(error);
});

Output:

Data Loaded

ex 2:
const bookingPromise = new Promise((resolve, reject) => {

  const paymentSuccessful = true;

  if (paymentSuccessful) {
    resolve("Booking successful");
  } else {
    reject("Payment failed");
  }

});

bookingPromise
  .then((message) => console.log(message))
  .catch((error) => console.log(error));



====================================================================================================

5. PROMISE EXAMPLE

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

Output:

Eligible

====================================================================================================

6. PROMISE CHAINING

Instead of nesting callbacks:

function login() {
  return Promise.resolve("Ajay");
}

function getOrders(username) {
  console.log("User:", username);
  return Promise.resolve(["Order1", "Order2"]);
}

function getPayment(orders) {
  console.log("Orders:", orders);
  return Promise.resolve("Payment successful");
}

function sendEmail(payment) {
  console.log("Payment:", payment);
  return Promise.resolve("Email sent");
}

login()
  .then(getOrders)
  .then(getPayment)
  .then(sendEmail)
  .then(result => console.log(result))
  .catch(error => console.log(error));

Much cleaner than callback hell.

Flow:

login()
↓
getOrders()
↓
getPayment()
↓
sendEmail()
↓
catch errors

====================================================================================================

7. then()

Runs when the Promise is fulfilled.

promise.then(result => {
console.log(result);
});

====================================================================================================

8. catch()

Runs when the Promise is rejected.

promise.catch(error => {
console.log(error);
});

====================================================================================================

9. finally()

Runs whether the Promise succeeds or fails.

promise
.then(...)
.catch(...)
.finally(() => {
console.log("Completed");
});

Q: WHY DO WE USE finally()? — INTERVIEW ANSWER

finally() is used to execute code regardless of whether the Promise is fulfilled or rejected.

It is commonly used for cleanup tasks that should always happen.

Real-world uses:
• Hide a loading spinner
• Close a database connection
• Release a file/resource
• Re-enable a disabled button
• Stop a progress bar

====================================================================================================

10. REAL EXAMPLE USING fetch()

fetch("https://jsonplaceholder.typicode.com/users")
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.log(error));

FLOW:

Request
↓
Promise Pending
↓
Success
↓
then()
↓
Data

OR

Failure
↓
catch()

====================================================================================================

11. CALLBACK vs PROMISE

## Callback                              Promise

Function passed as an argument       Object representing async result
Can lead to Callback Hell             Avoids Callback Hell
Hard error handling                   Centralized with .catch()
Difficult to chain                    Easy chaining with .then()

====================================================================================================

12. CALLBACK HELL vs PROMISE

CALLBACK HELL:

login(function () {
getOrders(function () {
getPayment(function () {
sendEmail();
});
});
});

PROMISE:

login()
.then(getOrders)
.then(getPayment)
.then(sendEmail)
.catch(console.error);

Promises make asynchronous code flatter, easier to read, and easier to handle errors.

====================================================================================================

13. COMPLETE FLOW

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

====================================================================================================

14. INTERVIEW ANSWERS

Q: What is a Callback?

A callback is a function passed as an argument to another function and executed after a task completes. It is commonly used for asynchronous operations such as timers, event handling, API calls, and file operations.

---

Q: What is Callback Hell?

Callback Hell is a situation where multiple asynchronous callbacks are nested inside one another, creating deeply indented code that is difficult to read, debug, and maintain.

It is also known as the Pyramid of Doom.

---

Q: What is a Promise?

A Promise is an object that represents the eventual completion or failure of an asynchronous operation.

It has three states:
• Pending
• Fulfilled
• Rejected

Promises simplify asynchronous programming by providing methods like .then(), .catch(), and .finally() for handling results and errors, making the code cleaner and avoiding callback hell.

====================================================================================================
END
===
