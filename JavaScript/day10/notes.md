============================================================================================================================
OBJECTS IN JAVASCRIPT – COMPLETE MASTER NOTES
============================================================================================================================

Definition:
Object is a collection of key–value pairs.
Used to store related data and functionality together.

============================================================================================================================
CREATING OBJECT
============================================================================================================================

Syntax:
let objName = {
    key1: value1,
    key2: value2
};

Example:
let ajay = {
    name: "Ajay",
    age: 25,
    city: "Delhi"
};

-ACCESSING VALUES (2 WAYS in objects)

1) Dot Notation
ajay.name;              // "Ajay"

2) Bracket Notation
ajay["name"];           // "Ajay"

When to use Bracket notation

Use it when the key is stored in a variable.

Example
let ajay = {
  name: "Ajay",
  age: 25,
  city: "Delhi"
};

let key = "name";

console.log(ajay[key]);   // Ajay

If you write:
console.log(ajay.key);

Output will be undefined, because it looks for a key literally called "key".

Another situation (keys with spaces)

Dot notation cannot work.

let person = {
  "full name": "Ajay Sharma"
};

console.log(person["full name"]); // Ajay Sharma

Dot notation would fail:

person.full name  // ❌ error

✅ Simple rule

object.name → when key is fixed

object[key] → when key comes from variable / dynamic / spaces.

✅ Rule
obj["name"] → string key

obj[key] → variable containing the key

obj.name → dot notation (direct key)
==============================================
Note: ACCESSING ARRAY VALUES

Array values are accessed using INDEX.

Example:

let arr = ["Apple", "Banana", "Mango"];

arr[0]   → Apple
arr[1]   → Banana
arr[2]   → Mango

Rule:
Array indexing starts from 0.
====================================================
ADD / UPDATE / DELETE IN OBJECTS
====================================================

ADD PROPERTY
----------------------------------------------------
ajay.country = "India";

✔ Adds new key–value pair
✔ If key doesn't exist → it gets created


UPDATE PROPERTY
----------------------------------------------------
ajay.age = 26;

✔ If key already exists → value is updated


DELETE PROPERTY
----------------------------------------------------
delete ajay.city;

✔ Removes property from object

✔ delete is a JavaScript operator.

It works on:
- Object properties
- Array elements
- Variables (with limitations)


====================================================
HOW IT WORKS
====================================================

let obj = { a: 10, b: 20 };

delete obj.a;

console.log(obj);
// { b: 20 }


delete → removes property completely
         from the object


============================================================================================================================
NESTED OBJECTS
============================================================================================================================

let student = {
    name: "Rahul",
    marks: {
        math: 90,
        eng: 85
    }
};

student.marks.math;             // 90
student["marks"]["eng"];        // 85

- why its marks: {}  and not let marks = ??
student is a variable declared using let, while marks is not a variable — it is a property (key) inside the object.
Only variables use let/const/var; object properties do not.

============================================================================================================================
OBJECT METHODS
============================================================================================================================

Method = function inside object.

let person = {
    name: "Ajay",
    greet: function(){
        console.log("Hello");
    }
};

person.greet();

--Benefit of methods:
-----------------------------------------------------
Organize related data and behavior together
Data + function stay inside the same object.example array and ites realted methods stays together in one object.

Better code structure
Makes code easier to understand and maintain.

Reuse functionality
Same object can call the method whenever needed.

Work directly with object data using this


================================================================================
THIS KEYWORD (JavaScript) – INTERVIEW POINTS
================================================================================

1) Definition
   "this" refers to the object that is currently executing the function.

2) Purpose
   Used to access properties and methods of the current object.

3) Inside Object Method
   "this" refers to the object that owns the method.

   Example:
   let person = {
       name: "Ajay",
       greet: function(){
           console.log(this.name);
       }
   };

   Explanation:
this.name → accessing object PROPERTY

If it were a method, it would be called like:

this.greet()

4) Global Context
   In browser, "this" refers to the global object (window).

5) Inside Regular Function
   "this" depends on how the function is called.
   Example 1: Function called normally

function show(){
    console.log(this);
}

show();

Result:
In browser → this = window object



Example 2: Function called as object method

let person = {
    name: "Ajay",
    show: function(){
        console.log(this.name);
    }
};

person.show();

Result:
this = person object
Output → Ajay

6) Arrow Function
   Arrow functions do NOT have their own "this".
   They inherit "this" from the surrounding scope (lexical this).

   Example:

let person = {
    name: "Ajay",

    greet: function () {
        let show = () => {
            console.log(this.name);
        };

        show();
    }
};

person.greet();

Output:
Ajay

Explanation:
Arrow function "show" does not create its own "this".
It uses "this" from the surrounding function (greet).

Here:
this → person object

7) Constructor Function
   "this" refers to the newly created object.

8) call(), apply(), bind()
   These methods are used to explicitly set the value of "this".

9) Important Concept
   Value of "this" is determined at runtime based on the calling object.
================================================================================

============================================================================================================================
LOOPING OBJECT (FOR...IN)
============================================================================================================================

let obj = { a:1, b:2 };

for(let key in obj){
    console.log(key, obj[key]);
}


============================================================================================================================
OBJECT BUILT-IN METHODS
============================================================================================================================

let user = { name:"Ajay", age:25 };

Object.keys(user);       // ["name","age"]
Object.values(user);     // ["Ajay",25]
Object.entries(user);    // [["name","Ajay"],["age",25]]


Check property:
"name" in user;                   // true
user.hasOwnProperty("age");       // true


Object.keys(), Object.values(), Object.entries()

are built-in methods of the global Object class.

============================================================================================================================
OBJECT DESTRUCTURING
============================================================================================================================
DEFINITION
----------------------------------------------------
Destructuring means extracting values 
from an object (or array) and storing them 
into separate variables in a short, clean way.

let person = { name:"Ajay", age:25 };

let { name, age } = person;  //✔ Automatically creates variables
                             //✔ Variable names must match property names

console.log(name);    // Ajay
console.log(age);     // 25

WHAT IS HAPPENING INTERNALLY?

let { name, age } = person;

Means:
let name = person.name;
let age  = person.age;

WHY NOT JUST USE object.property INSTEAD OF DESTRUCTURING?
================================================================================

Both are correct. Destructuring is used mainly for convenience and cleaner code.

1) Avoid Repeating Object Name

Without destructuring:
console.log(person.name);
console.log(person.age);
console.log(person.name);

With destructuring:
let {name, age} = person;
console.log(name);
console.log(age);
console.log(name);



2) Useful When Using Properties Many Times

Without destructuring:
let total = person.age + person.age;

With destructuring:
let {age} = person;
let total = age + age;





================================================================================
SPREAD OPERATOR (...) – JAVASCRIPT
================================================================================

DEFINITION
------------------------------------------------------------------------------
The spread operator (...) expands elements of an array or properties of an
object into individual elements.

It is commonly used for copying, merging, and passing values.

Example:
let obj1 = { a:1, b:2 };
let obj2 = { ...obj1, c:3 }; // shallow copy

console.log(obj2);

Output
{ a:1, b:2, c:3 }



1) SPREAD IN ARRAYS (COPY / MERGE)
------------------------------------------------------------------------------
Used to copy or combine arrays.

Copy Array

let arr1 = [1,2,3];
let arr2 = [...arr1];

console.log(arr2);

Output
[1,2,3]


Merge Arrays

let a = [1,2];
let b = [3,4];

let c = [...a, ...b];

console.log(c);

Output
[1,2,3,4]



2) SPREAD IN OBJECTS (COPY / MERGE)
------------------------------------------------------------------------------
Used to copy or merge objects.

let obj1 = { name:"Ajay" };
let obj2 = { age:25 };

let obj3 = { ...obj1, ...obj2 };

console.log(obj3);

Output
{ name:"Ajay", age:25 }



3) PASS ARRAY VALUES TO FUNCTION
------------------------------------------------------------------------------
Spread converts array elements into function arguments.

let nums = [10,20,30];

console.log(Math.max(...nums));

Output
30



IMPORTANT POINTS
------------------------------------------------------------------------------
• ... expands elements or properties
• Works with arrays and objects
• Used for copying and merging data
• Can convert array elements into function arguments
================================================================================
================================================================================
SHALLOW COPY
================================================================================

Definition
------------------------------------------------------------------------------
A shallow copy creates a new object or array, but copies only the first level
of properties. Nested objects or arrays are copied by reference, not duplicated.

This means both copies share the same inner objects.



Example

let obj1 = {
    name: "Ajay",
    address: { city: "Delhi" }
};

let obj2 = { ...obj1 };   // shallow copy

obj2.address.city = "Mumbai";

console.log(obj1.address.city);

Output
Mumbai



Conclusion
------------------------------------------------------------------------------
Top-level data → copied

Nested objects/arrays → shared reference
================================================================================


============================================================================================================================
ARRAY IS OBJECT OR NOT?
============================================================================================================================

Yes.

let arr = [1,2,3];

typeof arr;      // "object"

Array is a special type of object.


============================================================================================================================
MATH OBJECT IN JAVASCRIPT
============================================================================================================================

Definition:
Math is a built-in object that provides mathematical methods.
Not created using new.

Common Methods:

Math.random();        // 0 ≤ value < 1
Math.round(4.6);      // 5
Math.floor(4.9);      // 4
Math.ceil(4.1);       // 5
Math.max(10,20,5);    // 20
Math.min(10,20,5);    // 5
Math.pow(2,3);        // 8
Math.sqrt(16);        // 4

Random integer (1–10):
Math.floor(Math.random() * 10) + 1;


============================================================================================================================
FINAL SUMMARY
============================================================================================================================

- Object → key–value pairs
- Access → dot / bracket
- Can add, update, delete
- Supports nested objects
- Methods inside object
- this refers to calling object
- Loop using for...in
- Use Object.keys / values / entries
- Destructuring & Spread simplify handling
- Array is special object
- Math is built-in object for calculations

============================================================================================================================

Doubt
====================================================
TEMPLATE LITERALS – JAVASCRIPT
====================================================

DEFINITION
----------------------------------------------------
Template literals are strings written using 
backticks ( ` ` ) instead of single (' ') 
or double (" ") quotes.

They allow:
✔ String interpolation
✔ Multi-line strings
✔ Embedded expressions


====================================================
1) STRING INTERPOLATION
====================================================

You can insert variables using:

${ }

Example:
----------------------------------------------------

let name = "Ajay";

console.log(`Hello ${name}`);

Output:
Hello Ajay

✔ Works only inside backticks
✘ Does NOT work with ' ' or " "


====================================================
2) MULTI-LINE STRINGS
====================================================

let msg = `This is
a multi-line
string`;

✔ No need for \n


====================================================
3) EXPRESSIONS INSIDE STRING
====================================================

let a = 10;
let b = 5;

console.log(`Sum is ${a + b}`);

Output:
Sum is 15


====================================================
CORE IDEA
====================================================

Template Literals = Backtick strings (` `)
that allow ${variable} inside them.

====================================================