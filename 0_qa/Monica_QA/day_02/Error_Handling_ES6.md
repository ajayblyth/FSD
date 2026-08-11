
JavaScript Error Handling (Interview Notes)
===============================================================================

1. What is Error Handling?
-------------------------------------------------------------------------------

Definition:
Error handling is the process of detecting, managing, and responding to errors
so that the application does not crash unexpectedly.

Without error handling, JavaScript stops executing the remaining code when an
error occurs.

Example (Without Error Handling)

console.log("Start");

let x = y + 10; // y is not defined

console.log("End");

Output:
Start
ReferenceError: y is not defined

"End" is never executed.


===============================================================================

2. Why do we need Error Handling?
-------------------------------------------------------------------------------

Error handling helps to:
• Prevent application crashes.
• Display meaningful error messages.
• Handle API failures gracefully.
• Log errors for debugging.
• Improve user experience.


===============================================================================

3. Types of JavaScript Errors
-------------------------------------------------------------------------------

A) Syntax Error
----------------
Occurs when JavaScript code has invalid syntax.

let a = ;

Output:
SyntaxError


B) Reference Error
------------------
Occurs when accessing a variable that doesn't exist.

console.log(age);

Output:
ReferenceError: age is not defined


C) Type Error
-------------
Occurs when an operation is performed on the wrong data type.

const num = 10;

num.toUpperCase();

Output:
TypeError


D) Range Error
--------------
Occurs when a value is outside the allowed range.

const arr = new Array(-1);

Output:
RangeError


E) URI Error
------------
Occurs when URI functions receive invalid input.

decodeURI("%");

Output:
URIError


F) Custom Error
---------------
Created by the developer using throw.

throw new Error("Invalid User");


===============================================================================

4. try...catch
-------------------------------------------------------------------------------

Definition:
try...catch is used to catch and handle runtime errors without stopping the
application.

Syntax

try{

}
catch(error){

}

Example

try{
    console.log(a);
}
catch(error){
    console.log("Error occurred");
}

Output:
Error occurred


===============================================================================

5. try Block
-------------------------------------------------------------------------------

The try block contains code that may throw an error.

If no error occurs, the catch block is skipped.

Example

try{
    console.log("Hello");
}
catch(error){
    console.log(error);
}

Output:
Hello


===============================================================================

6. catch Block
-------------------------------------------------------------------------------

The catch block executes only if an error occurs inside try.

Example

try{
    console.log(age);
}
catch(error){
    console.log(error.message);
}

Output:
age is not defined


===============================================================================

7. Error Object
-------------------------------------------------------------------------------

The catch block receives an Error object.

catch(error){

}

Common properties

error.name
error.message
error.stack

Example

try{
    console.log(age);
}
catch(error){
    console.log(error.name);
    console.log(error.message);
}

Output:
ReferenceError
age is not defined


===============================================================================

8. finally Block
-------------------------------------------------------------------------------

Definition:
The finally block always executes whether an error occurs or not.

Common Uses
-----------
• Close database connection.
• Stop loader/spinner.
• Release resources.
• Cleanup code.

Example

try{
    console.log("Working");
}
catch(error){
    console.log(error);
}
finally{
    console.log("Always executes");
}

Output:
Working
Always executes


===============================================================================

9. throw Statement
-------------------------------------------------------------------------------

Definition:
throw is used to create and throw custom errors.

Example

const age = 15;

if(age < 18){
    throw new Error("Age must be 18 or above");
}

Output:
Error: Age must be 18 or above


===============================================================================

10. throw with try...catch
-------------------------------------------------------------------------------

try{

    const age = 15;

    if(age < 18){
        throw new Error("Age must be 18 or above");
    }

    console.log("Eligible");

}
catch(error){

    console.log(error.message);

}

Output:
Age must be 18 or above


===============================================================================

11. Error Handling with Functions
-------------------------------------------------------------------------------

function divide(a,b){

    if(b===0){
        throw new Error("Cannot divide by zero");
    }

    return a/b;
}

try{

    console.log(divide(10,0));

}
catch(error){

    console.log(error.message);

}

Output:
Cannot divide by zero


===============================================================================

12. Error Handling with Promises
-------------------------------------------------------------------------------

Without Catch
-------------

fetch(url)
.then(res=>res.json());

If the Promise rejects, it becomes an unhandled rejection.


With Catch
----------

fetch(url)
.then(res=>res.json())
.catch(error=>{
    console.log(error.message);
});


===============================================================================

13. Error Handling with async/await
-------------------------------------------------------------------------------

This is the most common approach in modern JavaScript and React.

Example

async function getUsers(){

    try{

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const data = await response.json();

        console.log(data);

    }
    catch(error){

        console.log(error.message);

    }

}


===============================================================================

14. Handling HTTP Errors
-------------------------------------------------------------------------------

fetch() only rejects for network failures.

A 404 or 500 response still resolves the Promise, so check response.ok.

async function getUsers(){

    try{

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if(!response.ok){
            throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        console.log(data);

    }
    catch(error){

        console.log(error.message);

    }

}


===============================================================================

15. Error Handling in React
-------------------------------------------------------------------------------

const fetchUsers = async () => {

    try{

        setLoading(true);

        const response = await fetch(API_URL);

        if(!response.ok){
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        setUsers(data);

    }
    catch(error){

        setError(error.message);

    }
    finally{

        setLoading(false);

    }

};


===============================================================================

16. Best Practices
-------------------------------------------------------------------------------

• Use try...catch for code that may fail.
• Always handle Promise rejections using .catch() or try...catch.
• Throw meaningful error messages.
• Use finally for cleanup tasks.
• Check response.ok after every fetch().
• Never leave errors unhandled.
• Log errors during development; show user-friendly messages in production.


===============================================================================

Interview Questions

1. What is error handling?
--------------------------

Error handling is the process of detecting and managing errors so that an
application continues running gracefully instead of crashing.


===============================================================================

2. Difference between throw and catch
-------------------------------------------------------------------------------

+--------------------------+--------------------------------------+
| throw                    | catch                                |
+--------------------------+--------------------------------------+
| Creates an error         | Handles an error                     |
| Stops normal execution   | Prevents the application from        |
|                          | crashing                             |
| Used inside try or       | Used with try                        |
| functions                |                                      |
+--------------------------+--------------------------------------+


===============================================================================

3. Difference between throw and return
-------------------------------------------------------------------------------

+--------------------------------+--------------------------------+
| throw                          | return                         |
+--------------------------------+--------------------------------+
| Stops execution by throwing    | Returns a normal value         |
| an error                       |                                |
| Transfers control to catch     | Transfers control back to      |
|                                | the caller                     |
+--------------------------------+--------------------------------+


===============================================================================

4. Difference between finally and catch
-------------------------------------------------------------------------------

+------------------------------+------------------------------+
| catch                        | finally                     |
+------------------------------+------------------------------+
| Runs only if an error occurs | Always runs                 |
| Handles the error            | Used for cleanup            |
+------------------------------+------------------------------+


===============================================================================

Execution Flow

                     Start
                       │
                       ▼
                     try
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
         No Error          Error Occurs
             │                   │
             ▼                   ▼
         Continue             catch
             │                   │
             └─────────┬─────────┘
                       ▼
                    finally
                       │
                       ▼
                      End



These are the core JavaScript error handling concepts expected in interviews,
from basic try...catch through Promise and async/await error handling.


ES6
========================================
1. What is ES6?
-------------------------------------------------------------------------------

Definition:

ES6 (ECMAScript 2015) is the sixth major version of JavaScript. It introduced
many new features and syntax improvements that make JavaScript code cleaner,
more readable, and easier to maintain.
====================================================================

1. let and const
2. Arrow Functions (=>)
3. Template Literals (`${}`)
4. Default Parameters
5. Rest Parameter (...)
6. Spread Operator (...)
7. Destructuring (Array & Object)
8. Enhanced Object Literals
9. Classes
10. Modules (import/export)
11. Promises
12. for...of Loop
13. Map
14. Set
15. Symbol
16. Generators (function*)
17. Iterators
18. New String Methods
19. New Array Methods (find, findIndex, from, of, etc.)
20. New Object Methods (Object.assign(), Object.entries(), Object.values())
====================
1. let and const
What are they?

let and const are two new ways to declare variables introduced in ES6.

Before ES6, JavaScript mainly used:

var name = "Ajay";

ES6 introduced:

let name = "Ajay";
const age = 25;

The main difference is whether the variable can be reassigned.

let

Use let when the value may change later.

let age = 25;

age = 26;

console.log(age); // 26

The variable itself can be reassigned.

const

Use const when the variable should not be reassigned.

const age = 25;

age = 26; // TypeError

Once assigned, you cannot assign another value to the same variable.

Important: const does NOT mean completely immutable

This is an important interview question.

const person = {
    name: "Ajay",
    age: 25
};

person.age = 26;

console.log(person.age); // 26

This works.

Why?

Because const prevents reassignment of the variable, not modification of the object's contents.

This is not allowed:

const person = {
    name: "Ajay"
};

person = {
    name: "Rahul"
}; // Error

But this is allowed:

person.name = "Rahul"; // allowed

Same with arrays:

const fruits = ["Apple", "Mango"];

fruits.push("Orange");

console.log(fruits);
// ["Apple", "Mango", "Orange"]

But:

fruits = ["Banana"]; // Error
let vs const
let     → can be reassigned
const   → cannot be reassigned

Example:

let count = 10;
count = 20;       // allowed

const max = 100;
max = 200;        // Error
Block scope

This is another major difference from var.

if (true) {
    let x = 10;
    const y = 20;
}

console.log(x); // Error
console.log(y); // Error

let and const are block scoped.

A block is anything inside { }, such as:

if (...) {
}

for (...) {
}

{
}

Example:

let x = 10;

if (true) {
    let x = 20;
    console.log(x); // 20
}

console.log(x); // 10

The two x variables are different variables.

Interview point

let and const are block-scoped variable declarations introduced in ES6. let allows reassignment, whereas const does not. However, objects and arrays declared with const can still have their contents modified.

2. Arrow Functions =>

Arrow functions provide a shorter syntax for writing functions.

Normal function
function add(a, b) {
    return a + b;
}
Arrow function
const add = (a, b) => {
    return a + b;
};

Same basic functionality.

Shorter version

If the function has only one expression, we can remove {} and return.

const add = (a, b) => a + b;

This is called implicit return.

Equivalent to:

const add = (a, b) => {
    return a + b;
};
One parameter

Parentheses around one parameter are optional.

const square = (n) => n * n;

Can also be written:

const square = n => n * n;

Both are valid.

But with multiple parameters:

const add = (a, b) => a + b;

Parentheses are required.

No parameters

Use empty parentheses:

const greet = () => {
    console.log("Hello");
};
Multiple statements

If you have multiple statements, use {} and explicitly use return if you need to return something.

const calculate = (a, b) => {
    const sum = a + b;
    const result = sum * 2;

    return result;
};
Very common use: array methods

Arrow functions are heavily used with:

map()
filter()
forEach()
find()
reduce()

Example:

const numbers = [1, 2, 3, 4];

const doubled = numbers.map(n => n * 2);

console.log(doubled);
// [2, 4, 6, 8]

Without arrow function:

const doubled = numbers.map(function(n) {
    return n * 2;
});

Arrow functions make this much cleaner.

Important difference: this

This is one of the most important interview points.

Arrow functions do not have their own this.

They inherit this from their surrounding/lexical scope.

Normal function:

const person = {
    name: "Ajay",

    greet: function() {
        console.log(this.name);
    }
};

person.greet(); // Ajay

Here this refers to person.

Arrow function:

const person = {
    name: "Ajay",

    greet: () => {
        console.log(this.name);
    }
};

This does not behave like the normal method because the arrow function does not create its own this.

So don't blindly replace every normal function with an arrow function.

Interview point

Arrow functions provide a shorter syntax for functions. They support implicit return for single expressions and, importantly, they don't have their own this; they inherit this from the surrounding lexical scope.

3. Template Literals `${}`

Template literals provide an easier way to create strings, especially when variables or expressions need to be inserted.

They were introduced in ES6.

Instead of normal quotes:

const name = "Ajay";
const age = 25;

console.log("My name is " + name + " and I am " + age + " years old.");

We can use backticks:

const name = "Ajay";
const age = 25;

console.log(`My name is ${name} and I am ${age} years old.`);

Output:

My name is Ajay and I am 25 years old.
Syntax
`text ${expression} text`

The important part is:

${expression}
Variables
const name = "Ajay";

console.log(`Hello ${name}`);

Output:

Hello Ajay
Expressions

It isn't limited to variables.

You can put expressions inside ${}.

const a = 10;
const b = 20;

console.log(`Sum = ${a + b}`);

Output:

Sum = 30

Another example:

const age = 20;

console.log(`Next year I will be ${age + 1}`);

Output:

Next year I will be 21
Function calls
function getName() {
    return "Ajay";
}

console.log(`Hello ${getName()}`);

Output:

Hello Ajay
Ternary operator
const age = 20;

console.log(`Status: ${age >= 18 ? "Adult" : "Minor"}`);

Output:

Status: Adult
Multi-line strings

This is another advantage.

Without template literals:

const message = "Hello\n" +
                "Welcome to JavaScript\n" +
                "Have a nice day";

With template literals:

const message = `Hello
Welcome to JavaScript
Have a nice day`;

The line breaks are preserved.

Common React example

You will see template literals frequently in React/JavaScript:

const username = "Ajay";

const message = `Welcome, ${username}!`;

console.log(message);

Also useful for URLs:

const userId = 10;

const url = `https://api.example.com/users/${userId}`;

console.log(url);

Result:

https://api.example.com/users/10
Important

Template literals use backticks:

` `

NOT:

" "

and NOT:

' '
Interview point

Template literals use backticks and allow embedded expressions using ${}. They make string concatenation easier and also support multi-line strings.

4. Default Parameters

Default parameters allow us to provide a default value for a function parameter when the caller does not provide a value, or provides undefined.

Without default parameter
function greet(name) {
    console.log("Hello " + name);
}

greet();

Output:

Hello undefined

Because name wasn't provided.

With ES6:

function greet(name = "Guest") {
    console.log("Hello " + name);
}

greet();

Output:

Hello Guest

If we provide a value:

greet("Ajay");

Output:

Hello Ajay

The default is only used when necessary.

Basic example
function calculatePrice(price, tax = 10) {
    return price + tax;
}

console.log(calculatePrice(100));
// 110

console.log(calculatePrice(100, 20));
// 120

If tax isn't provided, 10 is used.

If provided, the provided value is used.

Important case: undefined
function greet(name = "Guest") {
    console.log(name);
}

greet(undefined);
// Guest

Default value is used.

Important case: null
greet(null);

Output:

null

Why?

Because default parameters are applied when the argument is undefined, not when it is null.

This is a common interview question.

greet()           → Guest
greet(undefined)  → Guest
greet(null)       → null
greet("Ajay")     → Ajay
Default parameter can be an expression
function multiply(a, b = a * 2) {
    return a * b;
}

console.log(multiply(5));

Here:

b = a * 2

So:

b = 10

Result:

50
Multiple default parameters
function createUser(name = "Guest", age = 18, city = "Bangalore") {
    console.log(name, age, city);
}

createUser();

Output:

Guest 18 Bangalore

You can override specific parameters by supplying earlier arguments:

createUser("Ajay", 25);

Output:

Ajay 25 Bangalore
Interview point

Default parameters allow function parameters to have fallback values when no value or undefined is passed. They were introduced in ES6.

5. Rest Parameter ...

This one is extremely important because it is often confused with the spread operator.

The same ... syntax is used, but the purpose depends on where it is used.

Rest parameter = collect multiple arguments into an array

Suppose:

function add(a, b, c) {
    return a + b + c;
}

This only explicitly handles three parameters.

What if we want to accept any number of arguments?

function add(...numbers) {
    console.log(numbers);
}

add(10, 20, 30, 40, 50);

Output:

[10, 20, 30, 40, 50]

...numbers collects all remaining arguments into an array.

Then we can use array methods.

function add(...numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

console.log(add(10, 20));
// 30

console.log(add(10, 20, 30));
// 60

console.log(add(10, 20, 30, 40));
// 100

This is the main purpose of rest.

Rest with normal parameters

You can have normal parameters before the rest parameter.

function introduce(name, ...skills) {
    console.log(name);
    console.log(skills);
}

introduce("Ajay", "Java", "Spring Boot", "React");

Output:

Ajay
["Java", "Spring Boot", "React"]

Here:

name

gets the first argument:

Ajay

And:

...skills

collects the remaining arguments:

["Java", "Spring Boot", "React"]
Another example
function showDetails(name, age, ...hobbies) {
    console.log(name);
    console.log(age);
    console.log(hobbies);
}

showDetails(
    "Ajay",
    25,
    "Cricket",
    "Movies",
    "Gaming"
);

Output:

Ajay
25
["Cricket", "Movies", "Gaming"]
Rest parameter must be last

This is important.

Correct:

function test(a, b, ...rest) {
}

Incorrect:

function test(...rest, a, b) {
}

You cannot put parameters after the rest parameter.

So:

Normal parameters → Rest parameter

not:

Rest parameter → Normal parameters
Rest parameter is an actual array
function test(...values) {
    console.log(Array.isArray(values));
}

test(10, 20, 30);

Output:

true

Therefore you can do:

function test(...values) {
    console.log(values.length);
    console.log(values.map(x => x * 2));
}

test(1, 2, 3);

Output:

3
[2, 4, 6]
Rest vs Spread — Very Important

Both use:

...

But their jobs are opposite.

Rest → collects
function test(...numbers) {
    console.log(numbers);
}

test(10, 20, 30);

Conceptually:

10, 20, 30
     ↓
   ...numbers
     ↓
[10, 20, 30]

So:

Rest collects multiple values into one array.

Spread → expands
const numbers = [10, 20, 30];

console.log(...numbers);

Conceptually:

[10, 20, 30]
     ↓
   ...numbers
     ↓
10, 20, 30

So:

Spread expands an iterable/object into individual elements/properties.

You asked for the first five, so we'll cover spread in detail as #6.

Quick ES6 Interview Revision — 1 to 5
1. let / const
   → Modern variable declarations
   → let can be reassigned
   → const cannot be reassigned
   → Both are block scoped

2. Arrow Functions
   → Shorter function syntax
   → Can have implicit return
   → Do not have their own `this`

3. Template Literals
   → Use backticks ``
   → ${} allows variables/expressions
   → Supports multi-line strings

4. Default Parameters
   → Provides fallback parameter values
   → Used when argument is missing/undefined
   → null does NOT trigger the default

5. Rest Parameter
   → ...parameter
   → Collects remaining arguments
   → Creates an array
   → Must be the last parameter
One-line interview answers
let/const:
ES6 introduced let and const for block-scoped variable declarations.
let can be reassigned, while const cannot be reassigned.

Arrow function:
An arrow function is a shorter syntax for writing functions and
does not have its own this.

Template literal:
Template literals use backticks and allow embedded expressions
using ${}, along with multi-line strings.

Default parameter:
Default parameters provide fallback values when a function
argument is not supplied or is undefined.

Rest parameter:
The rest parameter uses ... to collect multiple remaining
function arguments into an array.

=======================
6. Spread Operator ...
Definition

The spread operator (...) is used to expand/unpack elements of an iterable (like an array) or properties of an object.

The easiest way to remember:

Rest   → collects values
Spread → expands values
6.1 Spread with Arrays

Suppose:

const fruits = ["Apple", "Mango", "Orange"];

Without spread:

const newFruits = [fruits];

console.log(newFruits);

Output:

[["Apple", "Mango", "Orange"]]

The entire array becomes one element.

With spread:

const newFruits = [...fruits];

console.log(newFruits);

Output:

["Apple", "Mango", "Orange"]

Conceptually:

fruits
["Apple", "Mango", "Orange"]

        ↓ spread

...fruits
   ↓
"Apple", "Mango", "Orange"
6.2 Combining arrays
const fruits = ["Apple", "Mango"];
const vegetables = ["Carrot", "Potato"];

const food = [...fruits, ...vegetables];

console.log(food);

Output:

["Apple", "Mango", "Carrot", "Potato"]

You can also add values:

const food = ["Tomato", ...fruits, "Carrot"];

console.log(food);

Output:

["Tomato", "Apple", "Mango", "Carrot"]
6.3 Copying an array
const numbers = [1, 2, 3];

const copy = [...numbers];

console.log(copy);
// [1, 2, 3]

This creates a new array.

This is especially important in React because we commonly avoid directly modifying state arrays.

For example:

const newUsers = [...users, newUser];

setUsers(newUsers);

Instead of:

users.push(newUser);
setUsers(users);
6.4 Spread is a shallow copy

This is an important interview point.

For primitive values:

const numbers = [1, 2, 3];

const copy = [...numbers];

copy.push(4);

console.log(numbers);
// [1, 2, 3]

console.log(copy);
// [1, 2, 3, 4]

But nested objects are still shared:

const users = [
    { name: "Ajay" }
];

const copy = [...users];

copy[0].name = "Rahul";

console.log(users[0].name);
// Rahul

Why?

Because spread creates only a shallow copy.

It copies the outer array, but the nested object is still the same object.

6.5 Spread with Objects

ES6 also allows object spreading.

const person = {
    name: "Ajay",
    age: 25
};

const copy = {
    ...person
};

console.log(copy);

Output:

{
    name: "Ajay",
    age: 25
}
6.6 Merge objects
const person = {
    name: "Ajay"
};

const details = {
    age: 25,
    city: "Bangalore"
};

const user = {
    ...person,
    ...details
};

console.log(user);

Output:

{
    name: "Ajay",
    age: 25,
    city: "Bangalore"
}
6.7 Overwriting properties

This is very important.

const user = {
    name: "Ajay",
    age: 25
};

const updatedUser = {
    ...user,
    age: 30
};

console.log(updatedUser);

Output:

{
    name: "Ajay",
    age: 30
}

The later property wins.

{
    ...user,
    age: 30
}

means:

copy everything from user
then replace age with 30

But:

const updatedUser = {
    age: 30,
    ...user
};

would result in:

{
    name: "Ajay",
    age: 25
}

because ...user comes later and overwrites age.

6.8 Spread in function arguments

Suppose:

const numbers = [10, 20, 30];

A function:

function add(a, b, c) {
    return a + b + c;
}

We can do:

console.log(add(...numbers));

This is equivalent to:

add(10, 20, 30);

So spread expands the array into individual arguments.

Rest vs Spread
// REST → collect
function add(...numbers) {
    console.log(numbers);
}

add(10, 20, 30);
// [10, 20, 30]
// SPREAD → expand
const numbers = [10, 20, 30];

add(...numbers);

Remember:

Rest:
10, 20, 30 → [10, 20, 30]

Spread:
[10, 20, 30] → 10, 20, 30
Interview answer

The spread operator expands elements of an iterable or properties of an object. It is commonly used to copy and merge arrays/objects and to pass array elements as individual function arguments.

7. Destructuring — Array & Object
Definition

Destructuring allows us to extract values from arrays or properties from objects and assign them to variables in a simple syntax.

There are two major types:

Array Destructuring
Object Destructuring
7.1 Array Destructuring

Suppose:

const fruits = ["Apple", "Mango", "Orange"];

Without destructuring:

const first = fruits[0];
const second = fruits[1];
const third = fruits[2];

With destructuring:

const [first, second, third] = fruits;

console.log(first);  // Apple
console.log(second); // Mango
console.log(third);  // Orange

The positions matter.

Array:

index     value
  0       Apple
  1       Mango
  2       Orange

Therefore:

const [a, b, c] = fruits;

means:

a → Apple
b → Mango
c → Orange
7.2 Skipping values

You can skip elements using commas.

const fruits = ["Apple", "Mango", "Orange"];

const [first, , third] = fruits;

console.log(first);
// Apple

console.log(third);
// Orange

The second value is skipped.

first   → Apple
skip    → Mango
third   → Orange
7.3 Default values

You can provide defaults.

const fruits = ["Apple"];

const [first, second = "Mango"] = fruits;

console.log(first);
// Apple

console.log(second);
// Mango

Because there is no second element, "Mango" is used.

Similar to function default parameters, the default is used when the value is undefined.

7.4 Swapping variables

One very common ES6 example:

Without destructuring:

let a = 10;
let b = 20;

let temp = a;
a = b;
b = temp;

With destructuring:

let a = 10;
let b = 20;

[a, b] = [b, a];

console.log(a); // 20
console.log(b); // 10

Very useful interview example.

7.5 Rest with destructuring

You can combine destructuring with rest.

const numbers = [10, 20, 30, 40, 50];

const [first, second, ...remaining] = numbers;

console.log(first);
// 10

console.log(second);
// 20

console.log(remaining);
// [30, 40, 50]

Here:

first      → 10
second     → 20
remaining  → [30, 40, 50]

Notice that ...remaining is rest, because it is collecting the remaining values.

7.6 Object Destructuring

Suppose:

const user = {
    name: "Ajay",
    age: 25,
    city: "Bangalore"
};

Without destructuring:

const name = user.name;
const age = user.age;
const city = user.city;

With destructuring:

const { name, age, city } = user;

console.log(name);
console.log(age);
console.log(city);

Output:

Ajay
25
Bangalore
Array vs Object destructuring

This difference is very important.

Array destructuring uses position:

const [a, b] = [10, 20];

Object destructuring uses property name:

const { name, age } = user;

Remember:

Array → position
Object → property name
7.7 Renaming object properties

Suppose:

const user = {
    name: "Ajay",
    age: 25
};

You don't have to create a variable called name.

You can rename it:

const { name: userName, age: userAge } = user;

console.log(userName);
// Ajay

console.log(userAge);
// 25

The syntax:

const { name: userName } = user;

means:

Take the `name` property
and store its value in a variable called `userName`.
7.8 Default values in object destructuring
const user = {
    name: "Ajay"
};

const { name, age = 18 } = user;

console.log(name);
// Ajay

console.log(age);
// 18

Since age doesn't exist, the default is used.

7.9 Rest with object destructuring
const user = {
    name: "Ajay",
    age: 25,
    city: "Bangalore"
};

const { name, ...otherDetails } = user;

console.log(name);
// Ajay

console.log(otherDetails);
// { age: 25, city: "Bangalore" }

Again:

...otherDetails

is rest, because it collects the remaining properties.

7.10 Destructuring function parameters

This is extremely common in React.

Instead of:

function Student(props) {
    console.log(props.name);
    console.log(props.age);
    console.log(props.city);
}

We can destructure directly:

function Student({ name, age, city }) {
    console.log(name);
    console.log(age);
    console.log(city);
}

If called with:

<Student
    name="Ajay"
    age={25}
    city="Bangalore"
/>

React passes an object similar to:

{
    name: "Ajay",
    age: 25,
    city: "Bangalore"
}

and:

function Student({ name, age, city })

extracts those properties.

This is why you often see this syntax in React.

Interview answer

Destructuring is an ES6 feature that allows us to extract values from arrays or properties from objects and assign them to variables. Array destructuring works based on position, while object destructuring works based on property names.

8. Enhanced Object Literals

ES6 introduced several improvements that make object creation shorter and cleaner.

The most important ones are:

1. Property shorthand
2. Method shorthand
3. Computed property names
8.1 Property Shorthand

Before ES6:

const name = "Ajay";
const age = 25;

const user = {
    name: name,
    age: age
};

Notice:

name: name
age: age

The property name and variable name are the same.

ES6 lets us write:

const name = "Ajay";
const age = 25;

const user = {
    name,
    age
};

This means the same thing as:

{
    name: name,
    age: age
}
Another example
const firstName = "Ajay";
const city = "Bangalore";
const company = "ABC";

const user = {
    firstName,
    city,
    company
};

Result:

{
    firstName: "Ajay",
    city: "Bangalore",
    company: "ABC"
}
8.2 Method Shorthand

Before ES6:

const person = {
    name: "Ajay",

    greet: function() {
        console.log("Hello");
    }
};

ES6:

const person = {
    name: "Ajay",

    greet() {
        console.log("Hello");
    }
};

Much cleaner.

Calling it:

person.greet();

Output:

Hello
Multiple methods
const calculator = {
    add(a, b) {
        return a + b;
    },

    subtract(a, b) {
        return a - b;
    },

    multiply(a, b) {
        return a * b;
    }
};

console.log(calculator.add(10, 5));
// 15

console.log(calculator.multiply(10, 5));
// 50
8.3 Computed Property Names

This is another useful feature.

Suppose:

const property = "name";
const value = "Ajay";

We can dynamically create an object property:

const user = {
    [property]: value
};

console.log(user);

Output:

{
    name: "Ajay"
}

The square brackets:

[property]

mean:

Evaluate the value of property and use that as the property name.

Dynamic example
const key = "age";

const user = {
    [key]: 25
};

console.log(user.age);
// 25

Another:

const key = "city";

const user = {
    [key]: "Bangalore"
};

Result:

{
    city: "Bangalore"
}

This is particularly useful when creating objects dynamically.

Interview answer

Enhanced object literals are ES6 improvements that provide shorter syntax for creating objects. They include property shorthand, method shorthand, and computed property names.

9. Classes

ES6 introduced the class syntax for creating objects using a more familiar object-oriented programming style.

Before ES6, JavaScript commonly used constructor functions:

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    console.log("Hello " + this.name);
};

ES6 provides cleaner syntax:

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log("Hello " + this.name);
    }
}
9.1 Creating an object

The class is like a blueprint.

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello ${this.name}`);
    }
}

Create an object:

const person1 = new Person("Ajay", 25);

Now:

console.log(person1.name);
// Ajay

console.log(person1.age);
// 25

person1.greet();
// Hello Ajay
9.2 Constructor

The constructor() method runs automatically when an object is created using new.

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

When:

const person = new Person("Ajay", 25);

JavaScript automatically calls:

constructor("Ajay", 25)

So:

this.name = "Ajay";
this.age = 25;
9.3 Methods

Methods define behavior.

class Calculator {
    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }
}

const calculator = new Calculator();

console.log(calculator.add(10, 5));
// 15
9.4 Inheritance

One of the most important OOP concepts.

A class can inherit from another class using:

extends

Example:

class Animal {
    eat() {
        console.log("Animal is eating");
    }
}

class Dog extends Animal {
    bark() {
        console.log("Dog is barking");
    }
}

Now:

const dog = new Dog();

dog.eat();
dog.bark();

Output:

Animal is eating
Dog is barking

Dog inherits eat() from Animal.

9.5 super

super is used to access the parent class.

Example:

class Animal {
    constructor(name) {
        this.name = name;
    }

    eat() {
        console.log(`${this.name} is eating`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    bark() {
        console.log(`${this.name} is barking`);
    }
}

Create:

const dog = new Dog("Tommy", "Labrador");

dog.eat();
dog.bark();

Output:

Tommy is eating
Tommy is barking

Here:

super(name);

calls the parent class constructor.

super.method()

You can also call a parent method.

class Animal {
    eat() {
        console.log("Animal eating");
    }
}

class Dog extends Animal {
    eat() {
        super.eat();
        console.log("Dog eating");
    }
}

const dog = new Dog();

dog.eat();

Output:

Animal eating
Dog eating
9.6 Static methods

A static method belongs to the class itself, not to its objects.

class MathUtil {
    static add(a, b) {
        return a + b;
    }
}

Call:

console.log(MathUtil.add(10, 20));

But:

const obj = new MathUtil();

obj.add(10, 20); // Error

Because add() is static.

Remember:

Class.method()      → static method
object.method()     → instance method
Interview point

ES6 classes provide cleaner syntax for implementing object-oriented programming in JavaScript. They support constructors, methods, inheritance using extends, parent access using super, and static methods.

One important technical point:

JavaScript classes are built on top of JavaScript's existing prototype-based inheritance model. class is primarily cleaner syntax; JavaScript did not change from prototype-based inheritance to a fundamentally different inheritance system.

10. Modules — import / export

Modules allow us to split JavaScript code into multiple files and reuse functionality between those files.

Instead of putting everything in:

App.js

we can have:

math.js
user.js
product.js
App.js

and import what we need.

This is extremely important in React.

10.1 Named Export

Suppose we have:

math.js
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

These are named exports.

Then in another file:

app.js
import { add, subtract } from "./math.js";

console.log(add(10, 5));
console.log(subtract(10, 5));

Output:

15
5

Notice the {}:

import { add, subtract } from "./math.js";

They indicate named imports.

10.2 Export at the bottom

Instead of:

export function add(a, b) {
    return a + b;
}

You can write:

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

export { add, subtract };

Both approaches are valid.

10.3 Default Export

A module can have one default export.

Example:

Person.js
class Person {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello ${this.name}`);
    }
}

export default Person;

Import:

import Person from "./Person.js";

Notice something important:

There are no {}.

import Person from "./Person.js";
10.4 Named vs Default Export
Named export
export function add() {}

Import:

import { add } from "./math.js";

Curly braces required.

Default export
export default Person;

Import:

import Person from "./Person.js";

Curly braces not used.

10.5 Renaming named imports

Suppose:

// math.js

export function add(a, b) {
    return a + b;
}

You can rename it while importing:

import { add as addition } from "./math.js";

console.log(addition(10, 20));

Here:

Original name → add
Local name    → addition
10.6 Import everything

You can import all named exports using *.

import * as math from "./math.js";

Then:

console.log(math.add(10, 20));
console.log(math.subtract(20, 10));

Here math becomes an object-like namespace containing the exported members.

10.7 React example

This is something you will see constantly.

Student.jsx
function Student() {
    return <h2>Student Component</h2>;
}

export default Student;

Then:

App.jsx
import Student from "./Student";

function App() {
    return (
        <div>
            <Student />
        </div>
    );
}

export default App;

This is ES6 module syntax being used heavily in React.

10.8 Named exports in React

You can also do:

export function Header() {
    return <h1>Header</h1>;
}

export function Footer() {
    return <footer>Footer</footer>;
}

Then:

import { Header, Footer } from "./components";
Important interview comparison
NAMED EXPORT
--------------------------------
export const x = 10;

import { x } from "./file";


DEFAULT EXPORT
--------------------------------
export default x;

import x from "./file";

A module can have:

Many named exports
+
One default export

For example:

export const name = "Ajay";
export const age = 25;

export default function greet() {
    console.log("Hello");
}

Then:

import greet, { name, age } from "./file";
ES6 — 6 to 10 Quick Revision
6. Spread Operator
   ...
   → Expands/unpacks values
   → Arrays, objects, function arguments
   → Often used for copying/merging
   → Creates shallow copies

7. Destructuring
   → Extract values from arrays/objects
   → Array → position based
   → Object → property-name based
   → Can combine with rest/default values

8. Enhanced Object Literals
   → Shorter object syntax
   → Property shorthand
   → Method shorthand
   → Computed property names

9. Classes
   → Cleaner OOP syntax
   → constructor()
   → methods
   → extends
   → super
   → static

10. Modules
   → Split code into separate files
   → export / import
   → Named export → { }
   → Default export → no { }
The 5 distinctions worth memorizing for interviews
Spread vs Rest
----------------------------
Spread → expands
Rest   → collects


Array vs Object Destructuring
----------------------------
Array  → position
Object → property name


Named vs Default Export
----------------------------
Named   → import { x }
Default → import x


let vs const
----------------------------
let   → reassignment allowed
const → reassignment not allowed


Class vs Object
----------------------------
Class  → blueprint
Object → actual instance created from class




TEMPLATE LITERALS
============================================================================================================================

Definition:
Template literals are a new way of creating strings in JavaScript using backticks (`) instead of single (') or double (") quotes. They allow variable interpolation and multi-line strings.

Interpolation means inserting variables or expressions inside strings.

Example

let name = "Ajay";

`Hello ${name}`

Uses
• Dynamic strings
• String formatting
• Logging and messages


FOR...OF LOOP
==============
The for...of loop is an ES6 feature used to iterate over the values of iterable objects 
such as arrays, strings, maps, sets, and other iterables.
--------------------------------------------------------------------------------------------------------------
Syntax                                   | Example
--------------------------------------------------------------------------------------------------------------
for(element of collection){ }            | for(let fruit of fruits){ console.log(fruit); }

Important:
for...of → gives VALUES
Does NOT give index

If index needed → use normal for loop

Example – String:
for(let ch of "Ajay"){ console.log(ch); }

2. Example with Array 
------------------------------------------------------------------------------- 
const numbers = [10, 20, 30]; 
for (const num of numbers) { console.log(num); } Output: 10 20 30


Nested for...of:
for(let list of heroes){
    for(let hero of list){
        console.log(hero);
    }
}

Key Rule:
for...of works only with iterable objects (Arrays, Strings, Maps, Sets)
Does NOT work directly on normal objects


FOR...IN LOOP,maybe not in es 6 , check it
---
Definition: Iterates over KEYS (property names / indexes).

Works with:
✔ Objects
✔ Arrays (but gives index, not value)

--------------------------------------------------------------------------------------------------------------
Syntax                                   | Example
--------------------------------------------------------------------------------------------------------------
for(key in object){ }                    | for(let key in obj){ console.log(key); }

Example – Object:
let obj = {name:"Ajay", age:25};

for(let key in obj){
    console.log(key);        // name, age
    console.log(obj[key]);   // Ajay, 25
}

Example – Array:
let fruits=["mango","apple","banana"];

for(let i in fruits){
    console.log(i);          // 0,1,2
    console.log(fruits[i]);  // mango, apple, banana
}

Important:
for...in → gives index (arrays) or keys (objects)
for...of → gives values


DIFFERENCE: for...in vs for...of


--------------------------------------------------------------------------------------------------------------
Feature            | for...in                          | for...of
--------------------------------------------------------------------------------------------------------------
Returns            | Keys / Index                      | Values
Works on           | Objects & Arrays                  | Iterable objects only
Use case           | When keys are needed              | When values are needed
Array output       | 0,1,2...                          | "mango","apple"...
-----------------------------------------------------------------------------------------------------------------
Interview Line:
for...in → index/keys
for...of → values



 ARROW FUNCTIONS
==================

Arrow functions are a shorter way to write functions in JavaScript. 
They provide a simpler syntax than traditional functions. 
Arrow functions also have a lexical `this`, meaning they do not create their own `this` value but inherit it from the surrounding scope.
 Mostly used in callbacks and  nicely with map(), filter() and other array methods.


// ===== General Syntax =====
const func = (arg1, arg2) => {
    // function body
};



// ===== Example 1: Sum =====
const sum = (a, b) => {
    console.log(a + b);   // prints addition
};



// ===== Example 2: Cube =====
const cube = (n) => {
    return n * n * n;     // returns cube of n
};



// ===== Example 3: Power =====
const pow = (a, b) => {
    return a ** b;        // a raised to power b
};



// ===== Shorter Forms =====

// 1) If only ONE parameter → brackets optional
const square = n => {
    return n * n;
};

// 2) If only ONE return statement → remove { } and return
const double = n => n * 2;



// ===== Important Points =====
--- it makes short and clean code.
// 1) Arrow functions are anonymous (no name).
// 2) They do NOT have their own "this".
// 3) Mostly used in callbacks and short functions,Works nicely with map(), filter(), reduce() and other array methods.



 Spread (...) and Rest (...) Operator
===============================================================================

1. What is the Spread Operator?
-------------------------------------------------------------------------------

Definition:
The spread operator (`...`) is an ES6 feature used to unpack the
elements of an array, object, or iterable into individual elements.

It is commonly used to copy arrays, merge arrays, copy objects, merge objects,
and pass multiple arguments to functions.

Syntax:

...iterable


===============================================================================

2. Spread with Arrays
-------------------------------------------------------------------------------

const numbers = [1, 2, 3];

console.log(...numbers);

Output:
1 2 3


===============================================================================

3. Copying an Array
-------------------------------------------------------------------------------

const arr1 = [1, 2, 3];

const arr2 = [...arr1];

console.log(arr2);

Output:
[1, 2, 3]

Original array remains unchanged. shallow copy


===============================================================================

4. Merging Arrays
-------------------------------------------------------------------------------

const arr1 = [1, 2];

const arr2 = [3, 4];

const arr3 = [...arr1, ...arr2];

console.log(arr3);

Output:
[1, 2, 3, 4]


===============================================================================

5. Spread with Objects
-------------------------------------------------------------------------------

const user = {
    name: "Ajay",
    age: 25
};

const copy = { ...user };

console.log(copy);

Output:
{ name: "Ajay", age: 25 }


===============================================================================

6. Merging Objects
-------------------------------------------------------------------------------

const obj1 = {
    name: "Ajay"
};

const obj2 = {
    city: "Bengaluru"
};

const obj3 = {
    ...obj1,
    ...obj2
};

console.log(obj3);

Output:
{ name: "Ajay", city: "Bengaluru" }


===============================================================================

7. Spread in Function Calls
-------------------------------------------------------------------------------

const numbers = [10, 20, 30];

function add(a, b, c) {
    return a + b + c;
}

console.log(add(...numbers));

Output:
60


===============================================================================

8. What is the Rest Operator?
-------------------------------------------------------------------------------

Definition:
The rest operator (`...`) is an ES6 feature used to collect multiple elements
or arguments into a single array.

It is commonly used in function parameters and destructuring.

Syntax:

function demo(...args) {

}


===============================================================================

9. Rest Parameter in Functions
-------------------------------------------------------------------------------

function sum(...numbers) {

    let total = 0;

    for (const num of numbers) {
        total += num;
    }

    return total;
}

console.log(sum(10, 20, 30, 40));

Output:
100


===============================================================================

10. Rest with Destructuring
-------------------------------------------------------------------------------

const numbers = [10, 20, 30, 40];

const [first, ...remaining] = numbers;

console.log(first);

Output:
10

console.log(remaining);

Output:
[30, 40]


===============================================================================

11. Spread vs Rest
-------------------------------------------------------------------------------

Spread Operator                     Rest Operator
--------------------------------    --------------------------------
Expands elements                    Collects elements
Used while calling                  Used while receiving
Used with arrays, objects,          Used in function parameters
and iterables                       and destructuring
Creates copies and merges           Collects remaining values


===============================================================================

12. Advantages
-------------------------------------------------------------------------------

Spread Operator
• Creates shallow copies.
• Merges arrays and objects.
• Makes code shorter and cleaner.
• Expands arrays into individual values.

Rest Operator
• Accepts any number of arguments.
• Eliminates the need for the arguments object.
• Collects remaining values into an array.


===============================================================================

Interview Questions
===============================================================================

Q1. What is the spread operator?

Answer:
The spread operator (`...`) is an ES6 feature used to expand the elements of an
array, object, or iterable into individual elements. It is commonly used for
copying, merging, and passing values to functions.


-------------------------------------------------------------------------------

Q2. What is the rest operator?

Answer:
The rest operator (`...`) is an ES6 feature used to collect multiple values into
a single array. It is commonly used in function parameters and destructuring.


-------------------------------------------------------------------------------

Q3. What is the difference between spread and rest?

Spread Operator
• Expands values.
• Used while calling a function or creating arrays/objects.
• Unpacks elements.

Rest Operator
• Collects values.
• Used in function parameters or destructuring.
• Packs elements into an array.


-------------------------------------------------------------------------------

Q4. Why do both use the same (...) syntax?

Answer:
Both use the same `...` syntax, but JavaScript determines whether it is spread
or rest based on the context. If it expands values, it is spread. If it
collects values, it is rest.


===============================================================================

Easy Trick to Remember
===============================================================================

Spread = "Spread Out"

[1,2,3]
   │
   ▼
1   2   3


Rest = "Collect the Rest"

1   2   3   4
│   │
▼   ▼
first   ...rest

rest = [2,3,4]


===============================================================================

Interview Summary
===============================================================================

• Both were introduced in ES6.
• Both use the same (...) syntax.
• Spread expands values.
• Rest collects values.
• Spread is used for copying, merging, and function calls.
• Rest is used in function parameters and destructuring.
• JavaScript identifies spread or rest based on where `...` is used.



==================== 3) DESTRUCTURING ====================

Definition:
Storing values of array into multiple variables.

------ Array Destructuring ------
example:
let names = ["tony", "bruce", "steve", "peter"];
let [winner, runnerup] = names;

console.log(winner);    // "tony"
console.log(runnerup);  // "bruce"

• Assigns first value to winner
• Assigns second value to runnerup



------ Object Destructuring ------

let student = {
    name: "karan",
    age: 14,
    class: 9,
    subjects: ["hindi", "english", "math", "science"],
    username: "karan@123",
    password: "abcd",
};

let { username: user, password: secret } = student;

console.log(user);      //gives username from object student
console.log(secret);    //gives password from object student


• username is stored in variable user
• password is stored in variable secret
• Property names can be renamed

================
```text id="k3v8nx"
===============================================================================
                           this Keyword (JavaScript)
===============================================================================

1. What is the this Keyword?
-------------------------------------------------------------------------------

Definition:
The `this` keyword is a special keyword in JavaScript that refers to the object
that is currently executing the function. Its value depends on how the function
is called.

In simple words:
`this` refers to the current execution context.


===============================================================================

2. this in the Global Scope
-------------------------------------------------------------------------------

In a browser:

console.log(this);

Output:
Window object

In Node.js:

console.log(this);

Output:
{}

(Empty object in a module)


===============================================================================

3. this Inside an Object Method
-------------------------------------------------------------------------------

When a function is called as an object method, `this` refers to that object.

Example:

const person = {
    name: "Ajay",

    greet() {
        console.log(this.name);
    }
};

person.greet();

Output:
Ajay


===============================================================================

4. this Inside a Regular Function
-------------------------------------------------------------------------------

In a regular function, `this` depends on how the function is called.

Example (Non-Strict Mode):

function show() {
    console.log(this);
}

show();

Output (Browser):
Window object

Output (Strict Mode):
undefined


===============================================================================

5. this Inside an Arrow Function
-------------------------------------------------------------------------------

Arrow functions do not have their own `this`.

They inherit `this` from the surrounding (lexical) scope.

Example:

const person = {
    name: "Ajay",

    regular() {
        console.log(this.name);
    },

    arrow: () => {
        console.log(this.name);
    }
};

person.regular();

Output:
Ajay

person.arrow();

Output:
undefined (in most environments)

Reason:
The arrow function uses the `this` value from its outer scope instead of the
object.


===============================================================================

6. this Inside a Constructor Function
-------------------------------------------------------------------------------

When a function is called with the `new` keyword, `this` refers to the newly
created object.

Example:

function Person(name) {
    this.name = name;
}

const p1 = new Person("Ajay");

console.log(p1.name);

Output:
Ajay


===============================================================================

7. this in Event Handlers
-------------------------------------------------------------------------------

In a DOM event handler, `this` refers to the element that triggered the event.

Example:

button.addEventListener("click", function () {
    console.log(this);
});

Output:
The clicked button element


===============================================================================

8. Changing this using call(), apply(), and bind()
-------------------------------------------------------------------------------

call()

Calls a function immediately with a specified `this`.

const person = {
    name: "Ajay"
};

function greet() {
    console.log(this.name);
}

greet.call(person);

Output:
Ajay


-------------------------------------------------------------------------------

apply()

Similar to call(), but arguments are passed as an array.

function add(a, b) {
    console.log(a + b);
}

add.apply(null, [10, 20]);

Output:
30


-------------------------------------------------------------------------------

bind()

Returns a new function with `this` permanently bound.

const person = {
    name: "Ajay"
};

function greet() {
    console.log(this.name);
}

const newFunction = greet.bind(person);

newFunction();

Output:
Ajay


===============================================================================

9. Summary of this
-------------------------------------------------------------------------------

Situation                             Value of this
----------------------------------    -----------------------------------
Global scope (Browser)                Window object
Object method                         The object itself
Regular function                      Window (non-strict) / undefined (strict)
Arrow function                        Inherited from outer scope
Constructor (new)                     Newly created object
DOM event handler                     HTML element


===============================================================================

Interview Questions
===============================================================================

Q1. What is the this keyword?

Answer:
The `this` keyword is a special keyword in JavaScript that refers to the object
that is currently executing the function. Its value depends on how the function
is invoked.


-------------------------------------------------------------------------------

Q2. What is lexical this?

Answer:
Lexical `this` means an arrow function does not create its own `this`. Instead,
it inherits `this` from its surrounding scope.


-------------------------------------------------------------------------------

Q3. What is the difference between regular functions and arrow functions with
respect to this?

Regular Function
• Has its own `this`.
• Value depends on how the function is called.

Arrow Function
• Does not have its own `this`.
• Inherits `this` from the surrounding scope.


-------------------------------------------------------------------------------

Q4. What is the difference between call(), apply(), and bind()?

call()
• Invokes the function immediately.
• Arguments are passed individually.

apply()
• Invokes the function immediately.
• Arguments are passed as an array.

bind()
• Does not invoke the function immediately.
• Returns a new function with `this` permanently bound.


-------------------------------------------------------------------------------

Q5. Why shouldn't arrow functions be used as object methods?

Answer:
Because arrow functions do not have their own `this`. They inherit `this` from
the surrounding scope, so `this` does not refer to the object, which can lead
to unexpected results.


===============================================================================

Interview Summary
===============================================================================

• `this` refers to the object executing the function.
• The value of `this` depends on how the function is called.
• Regular functions have their own `this`.
• Arrow functions inherit `this` from the surrounding scope.
• `call()`, `apply()`, and `bind()` can be used to explicitly set the value of
  `this`.
• Constructor functions use `this` to initialize newly created objects.
