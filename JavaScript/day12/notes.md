// =========================================
// ARRAY METHODS: forEach | map | filter
//               some | every | reduce
// =========================================

// Base Array
const nums = [1, 2, 3, 4, 5];


// =========================================
// 1) forEach()
// =========================================
// Definition:
// Executes a function on each element.
// Does NOT return a new array (returns undefined).
// Used for side effects (print, update, etc.)

nums.forEach((num) => {
    console.log(num * 2);
});

// Output:
// 2 4 6 8 10

// Modifying original array manually
let arr1 = [1, 2, 3, 4, 5];

arr1.forEach((num, i) => {
    arr1[i] = num * 2;
});

console.log(arr1);
// [2, 4, 6, 8, 10]


// =========================================
// 2) map()
// =========================================
// Definition:
// Returns a NEW array after transforming each element.

const mapped = nums.map((num) => {
    num = num + 1;
    num = num / 2;
    return num;
});

console.log(mapped);
// [1, 1.5, 2, 2.5, 3]

// ✔ Same length as original
// ✔ Original array unchanged


// =========================================
// 3) filter()
// =========================================
// Definition:
// Returns a NEW array with elements that pass a condition.

const filtered = nums.filter((num) => {
    return num % 2 === 0;
});

console.log(filtered);
// [2, 4]

// ✔ May return fewer elements
// ✔ Original array unchanged


// =========================================
// 4) some()
// =========================================
// Definition:
// Returns TRUE if at least ONE element passes condition.

let hasEven = nums.some((num) => {
    return num % 2 === 0;
});

console.log(hasEven);
// true


// =========================================
// 5) every()
// =========================================
// Definition:
// Returns TRUE only if ALL elements pass condition.

let allPositive = nums.every((num) => {
    return num >= 0;
});

console.log(allPositive);
// true


// =========================================
// 6) reduce()
// =========================================
// Definition:
// Reduces array to a SINGLE value using accumulator.

let sum = nums.reduce((acc, num) => {
    return acc + num;
}, 0);

console.log(sum);
// 15


// IMPORTANT NOTE:
// If multiplying, initial value should not be 0.

let product = nums.reduce((acc, num) => {
    return acc * num;
}, 1);

console.log(product);
// 120


// =========================================
// SUMMARY (Quick Interview Revision)
// =========================================

// forEach → Loop only (no return)
// map     → Transform each element (returns new array)
// filter  → Keep elements that match condition
// some    → At least one match? (true/false)
// every   → All match? (true/false)
// reduce  → Single calculated value (sum, product, etc.)
=========================================================
questions, find max number
--------------------------
const nums = [1, 2, 3, 4, 5];

const maxNum = nums.reduce((acc, num) => {
    if (num > acc) {
        return num; // If current number is bigger, it becomes the new accumulator
    } else {
        return acc; // Otherwise, keep the old accumulator
    }
}, nums[0]); // Start with the first number as the initial value

console.log(maxNum); // Output: 5

----------------------------------
question, multiples of 10

const nums = [10, 20, 30, 40, 50];

let multiplesOfTen = nums.every((num) => {
    return num % 10 === 0;
});

console.log(multiplesOfTen);

==================
const nums = [10, 20, 5, 40, 50];

const min= nums.reduce((acc, num) => {
    return num < acc ? num : acc; 
}, nums[0]); // Initialize the accumulator with the first number

console.log(minNum); // Output: 5

OR

const nums = [10, 20, 5, 40, 50];

const minNum = nums.reduce((acc, num) => {
    // Standard if...else logic
    if (num < acc) {
        return num; // If the current number is smaller, it becomes the new accumulator
    } else {
        return acc; // Otherwise, keep the current smallest number
    }
}, nums[0]); // Start with the first element as the initial value

console.log(minNum); // Output: 5

===================================
// =========================================
// DEFAULT PARAMETERS
// =========================================

// Definition:
// Default parameters allow you to assign a default value
// to function parameters if no value (or undefined) is passed.

// Rule:
// Always place default parameters at the end.

function myFunc(a, b = 7) {
    return a + b;
}

console.log(myFunc(1));  // 8  (b takes default value 7)
console.log(myFunc(1, 5)); // 6  (b = 5 overrides default)


// Important:
// Default value is used only when argument is undefined.

console.log(myFunc(1, undefined)); // 8
console.log(myFunc(1, null));      // 1 (null is treated as value)


// =========================================
// SPREAD OPERATOR (...)
// =========================================

// Definition:
// Spread (...) expands an iterable (array, string, etc.)
// into individual elements.

// 1) Expanding Array

const arr = [1, 2, 3];
console.log(...arr);
// 1 2 3


// 2) Copying Array

const copy = [...arr];
console.log(copy);
// [1, 2, 3]


// 3) Merging Arrays

const arr1 = [1, 2];
const arr2 = [3, 4];

const merged = [...arr1, ...arr2];
console.log(merged);
// [1, 2, 3, 4]


//3.a)(...) to copy and extend an object.


Extracted Text
JavaScript
let data = {
    email: "ironman@gmail.com",
    password: "abcd",
};

let dataCopy = { ...data, id: 123 };

// 4) Passing Array as Function Arguments

function sum(a, b, c) {
    return a + b + c;
}

const nums = [10, 20, 30];

console.log(sum(...nums));
// 60


// =========================================
// QUICK SUMMARY
// =========================================

// Default Parameter → Sets fallback value for function arguments
// Spread (...)      → Expands iterable into individual values
// Common Uses       → Copy, Merge, Pass arguments
==================
// =========================================
// ITERABLES IN JAVASCRIPT
// =========================================

// Definition:
// Iterable = Any object that can be looped over
// using for...of or spread (...)


// =========================================
// LIST OF ITERABLES
// =========================================

// 1) Array
const arr = [1, 2, 3];

// 2) String
const str = "Hello";

// 3) Map
const map = new Map([
    ["a", 1],
    ["b", 2]
]);

// 4) Set
const set = new Set([1, 2, 3]);

// 5) Typed Arrays
const typed = new Int8Array([10, 20, 30]);

// 6) Arguments object (inside normal function)

function example() {
    console.log(arguments);
}


// =========================================
// HOW TO CHECK (COMMON WAY)
// =========================================

for (let value of arr) {
    console.log(value);
}

// Spread also works on iterables
console.log(...str);  // H e l l o


// =========================================
// NOT ITERABLE
// =========================================

// Plain Objects are NOT iterable by default

const obj = { a: 1, b: 2 };

// for (let x of obj) ❌ Error


// =========================================
// QUICK SUMMARY
// =========================================

// ✔ Array
// ✔ String
// ✔ Map
// ✔ Set
// ✔ TypedArray
// ✔ arguments object

// ❌ Plain Object (not iterable by default)

===================================
==================== SPREAD, REST & DESTRUCTURING ====================

-------------------- 1) SPREAD OPERATOR (...) --------------------

Definition:
Spread operator expands elements of an array or properties of an object.

------ Array Spread ------

let arr = [1, 2, 3, 4, 5];
let newArr = [...arr];

• Creates a new copy of arr
• newArr is a separate array (original not modified)

------ Object Spread ------

let data = {
    email: "ironman@gmail.com",
    password: "abcd"
};

let dataCopy = { ...data, id: 123 };

• Copies all properties from data
• Adds new property id
• Original object remains unchanged

------ Why Use Spread? ------
• Copy arrays/objects
• Add or update values
• Maintain immutability (do not change original data)



==================== 2) REST OPERATOR (...) ====================

Definition:
Allows a function to accept unlimited arguments and store them in an array.

Example:

function sum(...args) {
    return args.reduce((add, el) => add + el);
}

• ...args collects all arguments into an array
• args becomes [value1, value2, value3, ...]

Example call:
sum(1, 2, 3, 4) → args = [1, 2, 3, 4]

example2:
function sum(a, b, ...args){
    let result = 0;
    if (args){
        result = args.reduce((acc, val)=>{
            acc += val;
            return acc;
        }, 0);
    }
    return a + b + result;
}

console.log(sum(1, 2));

Key Concepts from the Code
Rest Parameters (...args): This allows the function to collect any additional arguments passed after a and b into an array named args.

Logic:

The function takes at least two named arguments, a and b.

It uses reduce to sum up any extra numbers collected in the args array, starting with an initial value of 0.

Finally, it returns the total sum of a, b, and the calculated result from the rest of the arguments.

The Output: For the call sum(1, 2), since there are no extra arguments, args is empty, result remains 0, and the console will log 3.



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



==================== QUICK SUMMARY ====================

Spread  → Expands elements/properties
Rest    → Collects multiple values into array
Destructuring → Extracts values into variables

All three use (...) but work differently based on context.