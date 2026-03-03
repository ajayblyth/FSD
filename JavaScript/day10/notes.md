============================================================================================================================
OBJECTS IN JAVASCRIPT – COMPLETE MASTER NOTES
============================================================================================================================

Definition:
Object is a collection of key–value pairs.
Used to store related data and functionality together.

Each key is called a property name,
and each value can be data or a function.

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


============================================================================================================================
ACCESSING VALUES (2 WAYS)
============================================================================================================================

1) Dot Notation
ajay.name;              // "Ajay"

2) Bracket Notation
ajay["name"];           // "Ajay"

Dynamic key example:
let key = "age";
ajay[key];              // 25

Note:
- Dot → simple & common
- Bracket → required for dynamic keys or keys with spaces


If:

key = "name";
ajay[key];        // "Ajay"



WHY DOT NOTATION DOESN'T WORK for dynamic?

ajay.key;   ❌  (Looks for property literally named "key")

Dot notation does NOT read variable value.
Bracket notation DOES.


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


============================================================================================================================
THIS KEYWORD
============================================================================================================================

Refers to the object calling the method.

let user = {
    name: "Rahul",
    score: 95,
    getScore(){
        console.log(this.score);
    }
};

user.getScore();     // 95


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


============================================================================================================================
SPREAD OPERATOR (OBJECT COPY / MERGE)
============================================================================================================================

let obj1 = { a:1, b:2 };
let obj2 = { ...obj1, c:3 };

console.log(obj2);    // { a:1, b:2, c:3 }


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