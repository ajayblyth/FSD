JS + REACT PREPARATION ROADMAP
------------------------------
1. Arrow Functions
2. map()    = line 560
3. Destructuring  = 955
4. Spread Operator
5. Pure Functions
6. State
7. Prop Drilling

First 4  -> JavaScript Foundations
Last 3   -> React Concepts


====================================================================
1. ARROW FUNCTIONS (=>)
====================================================================

DEFINITION
----------
Modern shorter syntax for writing functions in JavaScript.

NORMAL FUNCTION
---------------
function add(a, b) {
    return a + b;
}

ARROW FUNCTION
--------------
const add = (a, b) => {
    return a + b;
}

SHORT VERSION
-------------
const add = (a, b) => a + b;


WHY ARROW FUNCTIONS?
--------------------
✔ Shorter syntax
✔ Cleaner code
✔ Common in callbacks
✔ Used heavily in React
✔ Easier handling of 'this' in many cases


SYNTAX BREAKDOWN
----------------
const sum = (a, b) => {
    return a + b;
}

const sum   -> function variable
(a, b)      -> parameters
=>           -> arrow operator
{}           -> function body
return       -> returns value


--------------------------------------------------------------------
TYPES OF ARROW FUNCTIONS
--------------------------------------------------------------------

1. NO PARAMETERS
----------------
const hello = () => {
    console.log("Hello");
}

2. ONE PARAMETER
----------------
const square = x => x * x;

OR

const square = (x) => x * x;

(Parentheses optional for single parameter)

3. MULTIPLE PARAMETERS
----------------------
const add = (a, b) => a + b;

4. SINGLE LINE RETURN
---------------------
const add = (a, b) => a + b;

(No need for return keyword)

Equivalent to:

const add = (a, b) => {
    return a + b;
}

5. RETURNING OBJECT
-------------------
WRONG:
const user = () => {name: "Ajay"}

JS treats {} as function body.

CORRECT:
const user = () => ({ name: "Ajay" })


--------------------------------------------------------------------
REAL EXAMPLES
--------------------------------------------------------------------

1. MULTIPLY
-----------
const multiply = (a, b) => a * b;

console.log(multiply(2, 3));

Output:
6


2. EVEN / ODD
-------------
const isEven = num => num % 2 === 0;

console.log(isEven(4));

Output:
true


3. GREETING
-----------
const greet = name => `Hello ${name}`;

console.log(greet("Ajay"));

Output:
Hello Ajay


--------------------------------------------------------------------
MOST IMPORTANT USAGE -> ARRAY METHODS
--------------------------------------------------------------------

const nums = [1, 2, 3];

const result = nums.map(num => num * 2);

console.log(result);

Output:
[2, 4, 6]

Common with:
✔ map()
✔ filter()
✔ reduce()
✔ forEach()


--------------------------------------------------------------------
ARROW FUNCTIONS IN REACT
--------------------------------------------------------------------

const App = () => {
    return <h1>Hello</h1>;
}

Modern React mainly uses arrow functions.


====================================================================
NORMAL FUNCTION vs ARROW FUNCTION
====================================================================

SYNTAX
------
Normal:
function add(a, b) {}

Arrow:
const add = (a, b) => {}


THIS KEYWORD (VERY IMPORTANT)
-----------------------------
Arrow functions DO NOT create their own 'this'.

NORMAL FUNCTION
---------------
const person = {
    name: "Ajay",

    greet: function () {
        console.log(this.name);
    }
}

Output:
Ajay


ARROW FUNCTION
--------------
const person = {
    name: "Ajay",

    greet: () => {
        console.log(this.name);
    }
}

Possible Output:
undefined

Reason:
Arrow function uses surrounding/global 'this'.


WHEN NOT TO USE ARROW FUNCTIONS
-------------------------------
Avoid in object methods if using 'this'.

Better:
const person = {
    name: "Ajay",

    greet() {
        console.log(this.name);
    }
}


====================================================================
ADVANTAGES / DISADVANTAGES
====================================================================

ADVANTAGES
----------
✔ Short code
✔ Cleaner syntax
✔ Great for callbacks
✔ Excellent for React
✔ Good for inline functions

DISADVANTAGES
-------------
✘ No own 'this'
✘ Cannot be constructor functions


CONSTRUCTOR EXAMPLE (FAILS)
---------------------------
const Person = (name) => {
    this.name = name;
}

const p = new Person("Ajay");


====================================================================
REAL PROJECT USAGE
====================================================================

1. NODE / EXPRESS
-----------------
app.get("/", (req, res) => {
    res.send("Hello");
});

2. FRONTEND EVENTS
------------------
button.addEventListener("click", () => {
    console.log("Clicked");
});

3. REACT COMPONENTS
-------------------
const Card = () => {
    return <div>Card</div>;
}


====================================================================
INTERVIEW QUESTIONS
====================================================================

Q1. Difference between normal and arrow functions?
--------------------------------------------------
✔ Syntax
✔ this keyword
✔ constructors
✔ arguments object

Q2. When should we use arrow functions?
---------------------------------------
✔ Callbacks
✔ Array methods
✔ React components
✔ Utility functions

Q3. Why popular in React?
-------------------------
✔ Cleaner syntax
✔ Easier callbacks
✔ Avoids many 'this' issues


====================================================================
MINI PRACTICE
====================================================================

1.
const add = (a, b) => a + b;
console.log(add(2, 3));

2.
const square = x => x * x;
console.log(square(5));

3.
const greet = () => "Hello";
console.log(greet());


====================================================================
FINAL UNDERSTANDING
====================================================================

Arrow functions are:
✔ Modern function syntax
✔ Shorter and cleaner
✔ Common in React
✔ Used heavily with array methods
✔ Mostly used in callbacks

MOST COMMON PRACTICAL USAGE
---------------------------
✔ map()
✔ filter()
✔ event handlers
✔ React components
✔ API callbacks
====================================================================
====================================================================
THIS KEYWORD PRACTICE (ARROW FUNCTIONS)
====================================================================

Predict the output before checking answers.


Q1.
----
const person = {
    name: "Ajay",

    greet: function () {
        console.log(this.name);
    }
};

person.greet();


Q2.
----
const person = {
    name: "Ajay",

    greet: () => {
        console.log(this.name);
    }
};

person.greet();


Q3.
----
function test() {
    console.log(this);
}

test();


Q4.
----
const test = () => {
    console.log(this);
}

test();


Q5.
----
const person = {
    name: "Ajay",

    greet() {

        const inner = () => {
            console.log(this.name);
        };

        inner();
    }
};

person.greet();

MOST IMPORTANT RULE

Arrow function inherits this
from nearest NORMAL function,
NOT from object like in question 2nd.

That is the key idea.


Q6.
----
const person = {
    name: "Ajay",

    greet() {

        function inner() {
            console.log(this.name);
        }

        inner();
    }
};

person.greet();

Note:
SUPER SHORT MEMORY TRICK
Normal function:
"Who called me?", here inner() is called standalone...so no this of his own

Arrow function:
"Who is my parent?"


Q7.
----
const obj = {
    value: 10,

    normal: function () {
        return this.value;
    },

    arrow: () => {
        return this.value;
    }
};

console.log(obj.normal());
console.log(obj.arrow());


Q8.
----
const person = {
    name: "Ajay",

    greet: function () {

        setTimeout(() => {
            console.log(this.name);
        }, 1000);

    }
};

person.greet();


Q9.
----
const person = {
    name: "Ajay",

    greet: function () {

        setTimeout(function () {
            console.log(this.name);
        }, 1000);

    }
};

person.greet();


Q10.
-----
const user = {
    name: "Ajay",

    show: () => {

        const inner = () => {
            console.log(this.name);
        };

        inner();
    }
};

user.show();

Note: user is object so both arrows inherir from global= undefined

====================================================================
ANSWERS
====================================================================

Q1 -> Ajay =Normal function inside object gets object's this.

Q2 -> undefined = Arrow function does not create its own this.

Q3 -> Global object (browser: window) = Normal standalone function uses global this (non-strict mode).

Q4 -> Global lexical this =  Arrow takes this from surrounding scope.

Q5 -> Ajay= Arrow inner function inherits this from greet().

Q6 -> undefined = Normal inner function creates its own this.

Q7
---
obj.normal() -> 10
obj.arrow()  -> undefined

Reason:
Arrow function does not bind object this.

Q8 -> Ajay = Arrow inside setTimeout captures outer this.

Q9 -> undefined = Normal function inside setTimeout gets its own this.

Q10 -> undefined = Both arrows inherit global/surrounding this.

===========================================================================

====================================================================
2. map() METHOD
====================================================================

DEFINITION
----------
map() is an array method used to:
✔ Loop through array
✔ Transform data
✔ Create NEW array
✔ Return modified values

IMPORTANT:
----------
✔ map() ALWAYS returns a new array
✔ Original array remains unchanged


SYNTAX
------
array.map((value, index, array) => {
    return modifiedValue;
});


PARAMETERS
----------
value  -> current element
index  -> current index
array  -> original array


BASIC FLOW
----------
Original Array
      ↓
map() loops each item
      ↓
return modified value
      ↓
New Array created


====================================================================
BASIC EXAMPLES
====================================================================

1. DOUBLE NUMBERS
-----------------
const nums = [1, 2, 3];

const result = nums.map(num => num * 2);

console.log(result);

Output:
[2, 4, 6]


2. SQUARE NUMBERS
-----------------
const nums = [2, 3, 4];

const squares = nums.map(num => num * num);

console.log(squares);

Output:
[4, 9, 16]


3. CONVERT TO UPPERCASE
-----------------------
const names = ["ajay", "rahul"];

const result = names.map(name => name.toUpperCase());

console.log(result);

Output:
["AJAY", "RAHUL"]


====================================================================
IMPORTANT CONCEPT
====================================================================

map() DOES NOT MODIFY ORIGINAL ARRAY
------------------------------------

const nums = [1, 2, 3];

const result = nums.map(num => num * 2);

console.log(nums);
console.log(result);

Output:
[1, 2, 3]
[2, 4, 6]

====================================================================
MAP WITH OBJECTS
====================================================================
VERY IMPORTANT FOR REACT + APIs

const users = [
    {name: "Ajay", age: 22},
    {name: "Rahul", age: 25}
];

const names = users.map(user => user.name);

console.log(names);

Output:
["Ajay", "Rahul"]


GET ONLY AGES
-------------
const ages = users.map(user => user.age);

console.log(ages);

Output:
[22, 25]


MODIFY OBJECTS
--------------
const updated = users.map(user => ({  ...user, active: true }));

console.log(updated);

Note: This creates a NEW array where every user object gets an extra property:
active: true


===================================================================
map() IN REACT (MOST IMPORTANT)
====================================================================

Used for rendering lists/UI.

const users = ["Ajay", "Rahul", "Amit"];

function App() {

    return (
        <div>

            {users.map(user => ( <h1>{user}</h1>  ))}

        </div>
    );
}

React heavily uses map().


====================================================================
map() vs forEach()
====================================================================

map()
-----
✔ Returns new array
✔ Used for transformation
✔ Most common in React

forEach()
---------
✔ Does not return new array
✔ Used for side effects/logging


EXAMPLE
forEach():
----------
const nums = [1, 2, 3];

nums.forEach(num => {
    console.log(num);
});

Output:
1
2
3


====================================================================
map() vs filter()
====================================================================

map()
-----
Transforms every item and gives a new array

filter()
--------
Selects specific items and gives a new array


filter() EXAMPLE
----------------
const nums = [1, 2, 3, 4];

const result = nums.filter(num => num % 2 === 0);

Output:
[2, 4]


====================================================================
RETURNING OBJECTS IN map()
====================================================================

IMPORTANT INTERVIEW POINT

WRONG:
------
const users = ["Ajay", "Rahul"];

const result = users.map(user => {
    name: user
});

Output:
undefined


CORRECT:
--------
const result = users.map(user => ({
    name: user
}));


Reason:
-------
() required because {} is treated as function body.


====================================================================
CHAINING METHODS
====================================================================

Methods can be chained.

const nums = [1, 2, 3, 4];

const result = nums
    .filter(num => num % 2 === 0)
    .map(num => num * 10);

console.log(result);

Output:
[20, 40]


====================================================================
REAL PROJECT USAGE
====================================================================

1. API DATA
-----------
const users = response.data.map(user => user.name);


2. REACT UI RENDERING
---------------------
products.map(product => (
    <Card title={product.name} />
));


3. MODIFY DATABASE DATA
-----------------------
const updatedUsers = users.map(user => ({
    ...user,
    verified: true
}));


====================================================================
COMMON INTERVIEW QUESTIONS
====================================================================

Q1. What does map() return?
---------------------------
A NEW array.


Q2. Does map() modify original array?
-------------------------------------
No.


Q3. Difference between map() and forEach()?
-------------------------------------------
map() returns new array.
forEach() does not.


Q4. Why is map() heavily used in React?
---------------------------------------
Used for rendering dynamic lists/UI.


Q5. Can we use map() on objects?
--------------------------------
No.
map() works on arrays.


====================================================================
COMMON MISTAKES
====================================================================

1. FORGETTING return
--------------------
WRONG:
const result = nums.map(num => {
    num * 2;
});

CORRECT:
const result = nums.map(num => {
    return num * 2;
});

OR

const result = nums.map(num => num * 2);


2. USING map() WITHOUT NEEDING NEW ARRAY
----------------------------------------
Use forEach() if not transforming data.


3. RETURNING OBJECT WITHOUT ()
------------------------------
WRONG:
user => {name: user}

CORRECT:
user => ({name: user})


====================================================================
MINI PRACTICE
====================================================================

1.
const nums = [1, 2, 3];

const result = nums.map(num => num + 1);

console.log(result);


2.
const names = ["ajay", "rahul"];

const result = names.map(name => name.toUpperCase());

console.log(result);


3.
const nums = [1, 2, 3, 4];

const result = nums
    .filter(num => num % 2 === 0)
    .map(num => num * 5);

console.log(result);


====================================================================
FINAL UNDERSTANDING
====================================================================

map() is:
✔ Array transformation method
✔ Returns new array
✔ Used heavily in React
✔ Common with arrow functions
✔ Important for API/UI rendering

MOST COMMON PRACTICAL USAGE
---------------------------
✔ React list rendering
✔ API response formatting
✔ Modifying array data
✔ Creating UI dynamically
✔ Chaining with filter()

========================================================================================================
====================================================================
3. DESTRUCTURING
====================================================================

DEFINITION
----------
Destructuring = extracting values from:
✔ Arrays
✔ Objects

into separate variables easily.


WHY USE DESTRUCTURING?
----------------------
✔ Cleaner code
✔ Shorter syntax
✔ Easy variable extraction
✔ Common in React
✔ Useful with APIs/objects


====================================================================
ARRAY DESTRUCTURING
====================================================================

NORMAL WAY
----------
const nums = [10, 20, 30];

const a = nums[0];
const b = nums[1];

console.log(a, b);

Output:
10 20


DESTRUCTURING WAY
-----------------
const nums = [10, 20, 30];

const [a, b] = nums;

console.log(a, b);

Output:
10 20


SYNTAX
------
const [var1, var2] = array;


====================================================================
ARRAY DESTRUCTURING FEATURES
====================================================================

1. SKIP VALUES
--------------
const nums = [10, 20, 30];

const [a, , c] = nums;

console.log(a, c);

Output:
10 30


2. DEFAULT VALUES
-----------------
const nums = [10];

const [a, b = 50] = nums;

console.log(a, b);

Output:
10 50


3. SWAP VARIABLES
-----------------
let a = 10;
let b = 20;

[a, b] = [b, a];

console.log(a, b);

Output:
20 10


4. REST OPERATOR IN ARRAY
-------------------------
const nums = [1, 2, 3, 4, 5];

const [a, b, ...rest] = nums;

console.log(rest);

Output:
[3, 4, 5]


====================================================================
OBJECT DESTRUCTURING
====================================================================

NORMAL WAY
----------
const user = {
    name: "Ajay",
    age: 22
};

const name = user.name;
const age = user.age;


DESTRUCTURING WAY
-----------------
const user = {
    name: "Ajay",
    age: 22
};

const { name, age } = user;

console.log(name, age);

Output:
Ajay 22


SYNTAX
------
const { keyName } = object;


IMPORTANT:
----------
Variable names must match object keys.


====================================================================
OBJECT DESTRUCTURING FEATURES
====================================================================

1. RENAME VARIABLES
-------------------
const user = {
    name: "Ajay"
};

const { name: userName } = user;

console.log(userName);

Output:
Ajay


2. DEFAULT VALUES
-----------------
const user = {
    name: "Ajay"
};

const { age = 18 } = user;

console.log(age);

Output:
18


3. NESTED DESTRUCTURING
-----------------------
const user = {
    name: "Ajay",

    address: {
        city: "Delhi"
    }
};

const {
    address: { city }
} = user;

console.log(city);

Output:
Delhi


4. REST OPERATOR IN OBJECT
--------------------------
const user = {
    name: "Ajay",
    age: 22,
    city: "Delhi"
};

const { name, ...rest } = user;

console.log(rest);

Output:
{ age: 22, city: "Delhi" }


====================================================================
DESTRUCTURING IN FUNCTIONS
====================================================================

WITHOUT DESTRUCTURING
---------------------
function printUser(user) {
    console.log(user.name);
    console.log(user.age);
}


WITH DESTRUCTURING
------------------
function printUser({ name, age }) {
    console.log(name);
    console.log(age);
}

Very common in React.


====================================================================
DESTRUCTURING IN REACT
====================================================================

1. PROPS DESTRUCTURING
----------------------
function Card({ title, price }) {

    return (
        <h1>{title} - {price}</h1>
    );
}


2. useState()
-------------
const [count, setCount] = useState(0);

count     -> current value
setCount  -> update function


====================================================================
COMMON INTERVIEW QUESTIONS
====================================================================

Q1. What is destructuring?
--------------------------
Extracting array/object values into variables.


Q2. Difference between array and object destructuring?
------------------------------------------------------
Array -> position matters
Object -> key name matters


Q3. Can we set default values?
------------------------------
Yes.


Q4. Why heavily used in React?
------------------------------
✔ Cleaner props handling
✔ useState()
✔ API data extraction


====================================================================
COMMON MISTAKES
====================================================================

1. WRONG VARIABLE NAME
----------------------
const user = { name: "Ajay" };

const { username } = user;

Output:
undefined

Reason:
Object key is 'name', not 'username'.


2. CONFUSING [] AND {}
----------------------
[] -> arrays
{} -> objects


====================================================================
MINI PRACTICE
====================================================================

1.
const nums = [10, 20];

const [a, b] = nums;

console.log(a, b);


2.
const user = {
    name: "Ajay",
    age: 22
};

const { name } = user;

console.log(name);


3.
const user = {
    name: "Ajay",
    city: "Delhi",
    age: 22
};

const { name, ...rest } = user;

console.log(rest);


====================================================================
FINAL UNDERSTANDING
====================================================================

Destructuring is:
✔ Cleaner extraction syntax
✔ Used for arrays and objects
✔ Very common in React
✔ Important for props and state
✔ Helps reduce repetitive code



####################################################################
####################################################################



====================================================================
4. SPREAD OPERATOR (...)
====================================================================

DEFINITION
----------
Spread operator (...) spreads/unpacks:
✔ Arrays
✔ Objects
✔ Elements

into individual values.


WHY USE SPREAD OPERATOR?
------------------------
✔ Copy arrays/objects
✔ Merge data
✔ Avoid mutation
✔ Cleaner syntax
✔ Very important in React state updates


====================================================================
ARRAY SPREAD
====================================================================

1. COPY ARRAY
-------------
const nums = [1, 2, 3];

const copy = [...nums];

console.log(copy);

Output:
[1, 2, 3]


IMPORTANT:
----------
Creates shallow copy.


2. MERGE ARRAYS
---------------
const a = [1, 2];
const b = [3, 4];

const result = [...a, ...b];

console.log(result);

Output:
[1, 2, 3, 4]


3. ADD VALUES
-------------
const nums = [2, 3];

const result = [1, ...nums, 4];

console.log(result);

Output:
[1, 2, 3, 4]


====================================================================
OBJECT SPREAD
====================================================================

1. COPY OBJECT
--------------
const user = {
    name: "Ajay",
    age: 22
};

const copy = { ...user };

console.log(copy);


2. MERGE OBJECTS
----------------
const obj1 = { a: 1 };
const obj2 = { b: 2 };

const result = {
    ...obj1,
    ...obj2
};

console.log(result);

Output:
{ a: 1, b: 2 }


3. OVERRIDE VALUES
------------------
const user = {
    name: "Ajay",
    age: 22
};

const updated = {
    ...user,
    age: 25
};

console.log(updated);

Output:
{ name: "Ajay", age: 25 }


IMPORTANT:
----------
Later values override earlier ones.


====================================================================
SPREAD IN FUNCTIONS
====================================================================

const nums = [1, 2, 3];

console.log(...nums);

Output:
1 2 3


Math.max EXAMPLE
----------------
const nums = [10, 50, 20];

const max = Math.max(...nums);

console.log(max);

Output:
50


====================================================================
SPREAD vs REST OPERATOR
====================================================================

BOTH USE ...
------------
But purpose differs.


SPREAD
------
Expands/unpacks values.

const nums = [1, 2];

console.log(...nums);


REST
----
Collects remaining values.

const [a, ...rest] = [1, 2, 3];

console.log(rest);


====================================================================
SPREAD IN REACT (VERY IMPORTANT)
====================================================================

1. STATE UPDATE
----------------
const [user, setUser] = useState({
    name: "Ajay",
    age: 22
});

setUser({
    ...user,
    age: 25
});

Why?
----
React state should not be mutated directly.


2. PROPS PASSING
----------------
const props = {
    title: "Laptop",
    price: 50000
};

<Card {...props} />

Equivalent to:
<Card title="Laptop" price={50000} />


====================================================================
REAL PROJECT USAGE
====================================================================

1. COPYING API DATA
-------------------
const copiedUsers = [...users];


2. MERGING SETTINGS
-------------------
const settings = {
    ...defaultSettings,
    ...userSettings
};


3. UPDATING DATABASE OBJECT
---------------------------
const updatedUser = {
    ...user,
    verified: true
};


====================================================================
COMMON INTERVIEW QUESTIONS
====================================================================

Q1. What does spread operator do?
---------------------------------
Expands arrays/objects into individual values.


Q2. Difference between spread and rest?
---------------------------------------
Spread -> expand
Rest   -> collect


Q3. Does spread create deep copy?
---------------------------------
No.
Only shallow copy.


Q4. Why important in React?
---------------------------
Used for immutable state updates.


====================================================================
COMMON MISTAKES
====================================================================

1. THINKING SPREAD MAKES DEEP COPY
----------------------------------
Nested objects still share reference.


2. OVERWRITING VALUES ACCIDENTALLY
----------------------------------
const obj = {
    age: 20,
    age: 30
};

Final value:
30


====================================================================
MINI PRACTICE
====================================================================

1.
const nums = [1, 2];

const result = [...nums, 3];

console.log(result);


2.
const user = {
    name: "Ajay",
    age: 22
};

const updated = {
    ...user,
    age: 25
};

console.log(updated);


3.
const nums = [10, 20, 30];

console.log(Math.max(...nums));


====================================================================
FINAL UNDERSTANDING
====================================================================

Spread operator is:
✔ Used for copying
✔ Used for merging
✔ Used for updating objects/arrays
✔ Essential in React
✔ Common with state updates

MOST COMMON PRACTICAL USAGE
---------------------------
✔ React state updates
✔ API data manipulation
✔ Copying arrays/objects
✔ Merging settings/data
✔ Passing props

==================================================================
====================================================================
5. PURE FUNCTIONS
====================================================================

DEFINITION
----------
Pure Function = function that:
✔ Gives SAME output for SAME input
✔ Has NO side effects
✔ Does NOT modify external data

IMPORTANT RULES
---------------
A pure function:
1. Depends only on input
2. Does not change outside variables/data


====================================================================
PURE FUNCTION EXAMPLES
====================================================================

1. PURE FUNCTION
----------------
function add(a, b) {
    return a + b;
}

console.log(add(2, 3));

Output:
5

Why pure?
----------
✔ Same input -> same output
✔ No external changes


2. PURE FUNCTION
----------------
const square = num => num * num;

console.log(square(4));

Output:
16


====================================================================
IMPURE FUNCTIONS
====================================================================

DEFINITION
----------
Impure function:
✘ Changes external data
✘ Depends on external values
✘ Produces unpredictable results


1. MODIFYING OUTSIDE VARIABLE
-----------------------------
let total = 0;

function add(num) {
    total += num;
}

add(5);

Why impure?
------------
Changes external variable.


2. RANDOM VALUE
---------------
function randomNum() {
    return Math.random();
}

Why impure?
------------
Same call -> different outputs.


3. CURRENT TIME
---------------
function getTime() {
    return new Date();
}

Why impure?
------------
Depends on changing external system state.


====================================================================
SIDE EFFECTS
====================================================================

DEFINITION
----------
Anything affecting outside world.

Examples:
---------
✔ Modifying variables
✔ API calls
✔ Database operations
✔ DOM manipulation
✔ Console logging
✔ File operations


EXAMPLE
-------
let count = 0;

function increase() {
    count++;
}

This causes side effect.


====================================================================
WHY PURE FUNCTIONS IMPORTANT?
====================================================================

✔ Easier testing
✔ Predictable behavior
✔ Easier debugging
✔ Better maintainability
✔ Important in React/Redux


====================================================================
PURE FUNCTIONS + ARRAYS
====================================================================

BAD (MUTATION)
--------------
const nums = [1, 2, 3];

function double(arr) {

    arr.push(4);

    return arr;
}

Impure because:
---------------
Original array modified.


GOOD (PURE)
------------
const nums = [1, 2, 3];

function double(arr) {

    return [...arr, 4];
}

Original array unchanged.


====================================================================
IMMUTABILITY (IMPORTANT)
====================================================================

DEFINITION
----------
Do not modify original data.
Create new data instead.

BAD
---
user.age = 25;

GOOD
----
const updatedUser = {
    ...user,
    age: 25
};

Very important in React.


====================================================================
PURE FUNCTIONS IN REACT
====================================================================

React prefers pure logic.

BAD
---
function updateUser(user) {
    user.age = 25;
    return user;
}

GOOD
----
function updateUser(user) {

    return {
        ...user,
        age: 25
    };
}


====================================================================
COMMON INTERVIEW QUESTIONS
====================================================================

Q1. What is pure function?
--------------------------
Same input -> same output
No side effects.


Q2. What are side effects?
--------------------------
Changes outside function scope/system.


Q3. Why pure functions preferred?
---------------------------------
✔ Easier testing
✔ Predictable
✔ Easier debugging


Q4. Is console.log a side effect?
---------------------------------
Yes.


Q5. Is Math.random() pure?
--------------------------
No.


====================================================================
PURE vs IMPURE
====================================================================

PURE FUNCTION
-------------
✔ Predictable
✔ No external dependency
✔ No mutation
✔ Easier testing


IMPURE FUNCTION
---------------
✘ Unpredictable
✘ Modifies external data
✘ Depends on external state


====================================================================
REAL PROJECT USAGE
====================================================================

1. REACT STATE UPDATE
---------------------
setUser(prev => ({
    ...prev,
    age: 25
}));


2. ARRAY TRANSFORMATION
-----------------------
const updated = users.map(user => ({
    ...user,
    active: true
}));


3. REDUX REDUCERS
-----------------
Reducers should always be pure functions.


====================================================================
COMMON MISTAKES
====================================================================

1. MODIFYING ORIGINAL ARRAY
---------------------------
arr.push()

Better:
--------
[...arr]


2. MODIFYING OBJECT DIRECTLY
----------------------------
user.name = "Ajay"

Better:
--------
{
    ...user,
    name: "Ajay"
}


====================================================================
MINI PRACTICE
====================================================================

1.
function add(a, b) {
    return a + b;
}

Pure or Impure?


2.
let count = 0;

function increment() {
    count++;
}

Pure or Impure?


3.
function random() {
    return Math.random();
}

Pure or Impure?


====================================================================
FINAL UNDERSTANDING
====================================================================

Pure functions:
✔ Same input -> same output
✔ No side effects
✔ Do not mutate data
✔ Important in React
✔ Easier to test/debug

MOST COMMON PRACTICAL USAGE
---------------------------
✔ React state updates
✔ Redux reducers
✔ Array/object transformations
✔ Predictable business logic



####################################################################
####################################################################



====================================================================
6. STATE (REACT)
====================================================================

DEFINITION
----------
State = data stored inside component that:
✔ Can change
✔ Automatically updates UI

State makes React dynamic.


WITHOUT STATE
-------------
const count = 0;

UI will not automatically update.


WITH STATE
----------
const [count, setCount] = useState(0);

UI updates automatically.


====================================================================
WHAT IS useState()?
====================================================================

React Hook used to create state.

SYNTAX
------
const [state, setState] = useState(initialValue);

BREAKDOWN
---------
count      -> current state value
setCount   -> function to update state
0          -> initial value


====================================================================
BASIC EXAMPLE
====================================================================

import { useState } from "react";

function Counter() {

    const [count, setCount] = useState(0);

    return (
        <div>

            <h1>{count}</h1>

            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>

        </div>
    );
}

FLOW
----
Button click
      ↓
setCount()
      ↓
State changes
      ↓
Component re-renders
      ↓
UI updates


====================================================================
IMPORTANT RULE
====================================================================

NEVER CHANGE STATE DIRECTLY

WRONG
-----
count = count + 1;

WRONG
-----
user.name = "Ajay";

CORRECT
-------
setCount(count + 1);

setUser({
    ...user,
    name: "Ajay"
});


====================================================================
STATE TYPES
====================================================================

1. NUMBER STATE
---------------
const [count, setCount] = useState(0);


2. STRING STATE
---------------
const [name, setName] = useState("Ajay");


3. BOOLEAN STATE
----------------
const [dark, setDark] = useState(false);


4. ARRAY STATE
--------------
const [users, setUsers] = useState([]);


5. OBJECT STATE
---------------
const [user, setUser] = useState({
    name: "Ajay",
    age: 22
});


====================================================================
UPDATING OBJECT STATE
====================================================================

IMPORTANT INTERVIEW + REACT QUESTION

WRONG
-----
setUser({
    age: 25
});

Reason:
-------
Other properties lost.


CORRECT
-------
setUser({
    ...user,
    age: 25
});


====================================================================
UPDATING ARRAY STATE
====================================================================

ADD ITEM
--------
setUsers([...users, newUser]);


REMOVE ITEM
-----------
setUsers(users.filter(user => user.id !== id));


UPDATE ITEM
-----------
setUsers(
    users.map(user =>
        user.id === id
            ? { ...user, active: true }
            : user
    )
);


====================================================================
WHY STATE IMPORTANT?
====================================================================

✔ Dynamic UI
✔ User interaction
✔ Form handling
✔ API data display
✔ React re-rendering


====================================================================
STATE IN FORMS
====================================================================

const [name, setName] = useState("");

<input
    value={name}
    onChange={(e) => setName(e.target.value)}
/>

Very common React pattern.


====================================================================
REAL PROJECT USAGE
====================================================================

✔ Login forms
✔ Theme toggle
✔ Shopping cart
✔ Todo list
✔ API data
✔ Search filtering
✔ Modal open/close


====================================================================
COMMON INTERVIEW QUESTIONS
====================================================================

Q1. What is state?
------------------
Dynamic data managed inside component.


Q2. Why use state?
------------------
To update UI dynamically.


Q3. Does changing state re-render component?
--------------------------------------------
Yes.


Q4. Can we update state directly?
---------------------------------
No.


Q5. Why use spread operator in state updates?
---------------------------------------------
To preserve old values.


====================================================================
STATE vs NORMAL VARIABLE
====================================================================

NORMAL VARIABLE
---------------
✘ UI does not update automatically


STATE
-----
✔ UI updates automatically
✔ Causes re-render


====================================================================
COMMON MISTAKES
====================================================================

1. DIRECT MUTATION
------------------
user.name = "Ajay"

Better:
--------
setUser({
    ...user,
    name: "Ajay"
});


2. FORGETTING PREVIOUS VALUES
-----------------------------
setUser({
    age: 25
});

May remove other fields.


3. USING STATE FOR EVERYTHING
-----------------------------
Not every variable needs state.


====================================================================
MINI PRACTICE
====================================================================

1.
const [count, setCount] = useState(0);

How to increment?


2.
const [dark, setDark] = useState(false);

How to toggle?


3.
const [users, setUsers] = useState([]);

How to add new user?


====================================================================
FINAL UNDERSTANDING
====================================================================

State is:
✔ Dynamic component data
✔ Causes UI updates
✔ Managed using useState()
✔ Core concept of React
✔ Essential for interactive apps

MOST COMMON PRACTICAL USAGE
---------------------------
✔ Forms
✔ Counters
✔ API data
✔ Theme toggles
✔ Cart systems
✔ Todo apps
✔ Search/filter UI