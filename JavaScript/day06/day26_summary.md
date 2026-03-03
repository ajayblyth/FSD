ARRAY REFERENCES (JS)
------------------------------------------------
- Arrays are reference types (stored in heap).
- Variable stores memory reference (address), not actual data.

Assignment:
let arr1 = [1,2,3];
let arr2 = arr1;

arr2.push(4);

arr1 → [1,2,3,4]
arr2 → [1,2,3,4]

Reason:
arr1 and arr2 point to same memory.

------------------------------------------------
Comparison using ===
------------------------------------------------
- === compares references (addresses), not values.

let a = [1,2];
let b = [1,2];

console.log(a === b); // false
// Different memory locations

let c = a;
console.log(a === c); // true
// Same reference

------------------------------------------------
Key Points:
- Assignment → copies reference.
- === → checks reference equality.
- To copy values → use spread (...) or slice().

COMPARISON & REFERENCES (JS)
------------------------------------------------
PRIMITIVE TYPES
(Number, String, Boolean, null, undefined, BigInt, Symbol)

- Stored by value.
- Variable holds actual data.

let a = 10;
let b = 10;

console.log(a === b); // true
// Compared by value

let x = "hi";
let y = "hi";

console.log(x === y); // true
// Same value → true

------------------------------------------------
OBJECTS & ARRAYS
(Object, Array, Function)

- Stored by reference (heap memory).
- Variable holds memory address.

let arr1 = [1,2];
let arr2 = [1,2];

console.log(arr1 === arr2); // false
// Different references

let arr3 = arr1;
console.log(arr1 === arr3); // true
// Same reference

------------------------------------------------
KEY DIFFERENCE
------------------------------------------------
Primitives  → === compares values.
Objects/Arrays → === compares references (addresses).

Assignment:
- Primitives → copy value.
- Objects/Arrays → copy reference.
===============================
NESTED ARRAYS (JS)
------------------------------------------------
Definition:
- An array inside another array.
- Used to represent 2D data (matrix, grid, table).

Syntax:
let arr = [[1,2],[3,4],[5,6]];
here arr holds a one memory address , which further has the memory addrees of other nested arrays.

Accessing Elements:
arr[row][column]

Example:
let matrix = [[1,2,3],
              [4,5,6],
              [7,8,9]];

console.log(matrix[0]);     // [1,2,3]
console.log(matrix[1][2]);  // 6

------------------------------------------------
Common Use Cases:
- 2D grids (games)
- Table data
- Matrix problems

Key Points:
- Outer array → rows
- Inner array → columns
- Index starts from 0

=====================
LOOPS IN JAVASCRIPT
------------------------------------------------
Purpose:
- Execute a block of code repeatedly.

------------------------------------------------
1. for loop
------------------------------------------------
- Used when number of iterations is known.

Syntax:
for (initialization; condition; update) {
    // code
}

Example:
for (let i = 0; i < 3; i++) {
    console.log(i);
}

------------------------------------------------
2. while loop
------------------------------------------------
- Runs while condition is true.

Syntax:
while (condition) {
    // code
}

Example:
let i = 0;
while (i < 3) {
    console.log(i);
    i++;
}

------------------------------------------------
3. do...while loop
------------------------------------------------
- Executes at least once.

Syntax:
do {
    // code
} while (condition);

------------------------------------------------
4. for...of
------------------------------------------------
- Iterates over values (arrays, strings).

Syntax:
for (let value of array) {
    // code
}

------------------------------------------------
5. for...in
------------------------------------------------
- Iterates over object keys (or array indices).

Syntax:
for (let key in object) {
    // code
}

------------------------------------------------
Loop Control:
- break → stops loop.
- continue → skips current iteration.

=========================
for (let i = 1; i <= 15; i++) {
    if (i % 2 !== 0) {
        console.log(i);
    }
}