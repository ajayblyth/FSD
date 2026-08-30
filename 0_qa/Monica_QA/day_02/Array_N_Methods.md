Arrays
=================================

An array is an ordered collection of values used to store multiple items in a single variable. 
It maintains insertion order and uses 0-based indexing, which lets us access elements directly by their position in O(1) time. 
Since arrays are mutable, we can add, remove, or update elements after they're created. 
They're also dynamically resizable, so their size can grow or shrink automatically, and they allow duplicate values. 
In addition, a single array can store different types of data, like numbers, strings, booleans, objects, and even other arrays.

- Supports random access via index.

Syntax:
let arr = [value1, value2, value3];

- inefficient way to add values one by one:

let num1=10;
let num2=20;
let num3=30;

- efficient way using arrays
Example:
let nums = [10, 20, 30];
console.log(nums[0]);   // 10
console.log(nums.length); // 3

PRIMITIVES vs REFERENCE TYPES (CORE IDEA)


PRIMITIVES (Number, String, Boolean, null, undefined, BigInt, Symbol)
------------------------------------------------
- Stored by VALUE
- Copy creates NEW independent value

Example:
let a = 10;
let b = a;

b = 20;

console.log(a);   // 10 ✅ unchanged


REFERENCE TYPES (Arrays, Objects, Functions)
------------------------------------------------
- Stored by REFERENCE (memory address)
- Copy shares SAME memory

Example:
let arr1 = [1,2,3];
let arr2 = arr1;

arr2.push(4);

console.log(arr1);   // [1,2,3,4] ❌ changed


👉 Key Difference:
- Primitive → value copied

============================================================================================================================
ARRAY METHODS (JS)
============================================================================================================================

1) push(value) 
- Adds element at end. 
Syntax: arr.push(value); 
Example: let arr = [1,2]; arr.push(3); // [1,2,3]

2) pop() 
- Removes last element. 
Syntax: arr.pop(); 
Example: arr.pop(); // [1,2]

3) unshift(value) 
- Adds element at beginning. 
Syntax: arr.unshift(value); 
Example: arr.unshift(0); // [0,1,2]

4) shift() 
- Removes first element. 
Syntax: arr.shift(); 
Example: arr.shift(); // [1,2]

5) indexOf(value) 
- Returns first index of value, -1 if not found. 
Example: ["red","yellow","blue"].indexOf("yellow"); // 1

6) includes(value) 
- Checks if value exists, returns true/false. 
Example: ["red","yellow"].includes("green"); // false

7) concat(array) 
- Combines arrays, returns new array. 
Example: [1,2].concat([3,4]); // [1,2,3,4]

8) reverse() 
- Reverses array in place. 
Example: [1,2,3].reverse(); // [3,2,1]

9. slice(start,end) → Extracts part of array, gives subarray
   nums.slice(0,2); // [10,20]

10. splice(start,count) → Add/Remove elements
→splice(start, deleteCount, item1, item2, ...)

→ Used to add, remove, or replace elements in an array
→ Modifies original array (in-place)
→ Returns removed elements

Syntax:
array.splice(startIndex, deleteCount, newItems...)

Example 1 – Remove element

let nums = [10, 20, 30, 40];
nums.splice(1, 1);

startIndex = 1 → start from index 1 (value 20)
deleteCount = 1 → remove 1 element

Result:
nums = [10, 30, 40]
Returned value = [20]

👉 Removes from the given start index
👉 Removes consecutive elements (not searching by value)

Example 2 – Remove multiple elements

nums.splice(1, 2);

Removes 2 elements starting from index 1

If nums = [10, 20, 30, 40]
Result → [10, 40]

Example 3 – Add elements

nums.splice(1, 0, 25);

deleteCount = 0 → nothing removed
25 is inserted at index 1

Result → [10, 25, 20, 30, 40]

Example 4 – Replace elements

nums.splice(1, 1, 99);

Removes 1 element at index 1
Inserts 99 at same position

Result → [10, 99, 30, 40]

Important Points

• Works based on index (not value)
• Negative index allowed
nums.splice(-1, 1) → removes last element
• Changes original array
• Returns array of removed elements

Notes:
- Arrays can store mixed data types.
- Arrays are mutable (can be modified).
ARRAY (JS) – INTERVIEW NOTES
------------------------------------------------
Time Complexity:
- Access by index → O(1)
- Update by index → O(1)
- Search (linear) → O(n)
- Insert at end (push) → O(1)
- Remove from end (pop) → O(1)
- Insert at beginning → O(n)
- Delete from beginning → O(n)
- Insert/Delete in middle → O(n)

Common Use Cases:
- Storing ordered data
- Iteration & traversal
- Stack (push/pop)
- Queue (shift/unshift)

Important:
- Internally optimized but operations requiring shifting cost O(n).


============================================================================================================================
ARRAY METHOD : slice()
============================================================================================================================

Definition:
- Copies portion of array, does NOT modify original.

Syntax:
arr.slice(start, end) // end exclusive, negative index counts from end

Examples:
let colors = ["red","yellow","blue","orange","pink","white"];
colors.slice();       // ["red","yellow","blue","orange","pink","white"]
colors.slice(2);      // ["blue","orange","pink","white"]
colors.slice(2,3);   // ["blue"]
colors.slice(-2);     // ["pink","white"]

============================================================================================================================
ARRAY METHOD : splice()
============================================================================================================================

Definition:
- Removes / replaces / adds elements
- Modifies original array in-place
- Returns removed elements

Syntax:
arr.splice(start, deleteCount, item1, item2, ...)

Examples – COLORS ARRAY:
let colors = ["red","yellow","blue","orange","pink","white"];
colors.splice(4);               // ["pink","white"]
colors                              // ["red","yellow","blue","orange"]

colors.splice(0,1);             // ["red"]
colors                              // ["yellow","blue","orange"]

colors.splice(0,1,"black","grey"); // ["yellow"]
colors                              // ["black","grey","blue","orange"]

Examples – CARS ARRAY:
let cars = ["audi","bmw","xuv","maruti"];
cars.splice(3);                  // ["maruti"]
cars                              // ["audi","bmw","xuv"]

cars.splice(0,1);                // ["audi"]
cars                              // ["bmw","xuv"]

cars.push("maruti"); cars.push("ferrari"); 
cars                              // ["bmw","xuv","maruti","ferrari"]

cars.splice(1,2);                // ["xuv","maruti"]
cars                              // ["bmw","ferrari"]

cars.splice(0,0,"toyota","xuv","maruti"); // []
cars                              // ["toyota","xuv","maruti","bmw","ferrari"]

============================================================================================================================
ARRAY METHOD : sort() (JS)
============================================================================================================================

Definition:
- Sorts array elements in place (modifies original)
- Default: alphabetical (string-based)
- Numbers: use compare function

------------------------------------------------
STRING COMPARISON LOGIC
------------------------------------------------
- Compared character by character
- Based on Unicode values
- Uppercase comes before lowercase

Example:
let words = ["banana","Apple","apple"];
words.sort();                     // ["Apple","apple","banana"]
// Reason: 'A' (65) < 'a' (97) in Unicode

------------------------------------------------
NUMERIC COMPARISON USING COMPARE FUNCTION
------------------------------------------------
sort() expects the comparator to return:

Negative → a comes before b
Positive → b comes before a
0 → keep their order

Syntax:
arr.sort();                  // default string sort
arr.sort((a,b) => a-b);      // ascending numbers
arr.sort((a,b) => b-a);      // descending numbers

Examples:
["banana","apple","cherry"].sort();   // ["apple","banana","cherry"]
[5,2,9,1].sort((a,b)=>a-b);        // [1,2,5,9] // If a - b is negative → a comes before b

[5,2,9,1].sort((a,b)=>b-a);       // [9,5,2,1]  // If b - a is negative → b comes before a



============================================================================================================================
convert array to string
============================================================================================================================

9) join(separator)
- Converts array to string with separator.

Syntax:
arr.join(separator)

Example:
let arr = ["a","b","c"];
arr.join("-");                 // "a-b-c"



10) toString()
- Converts array to comma-separated string.

Syntax:
arr.toString()

Example:
[1,2,3].toString();            // "1,2,3"



11) fill(value,start,end)
- Fills array with a value.

Syntax:
arr.fill(value,start,end)

Example:
let arr = [1,2,3,4];
arr.fill(0,1,3);               // [1,0,0,4]



12) at(index)
- Returns element at given index (supports negative index).

Syntax:
arr.at(index)

Example:
let arr = [10,20,30];
arr.at(-1);                    // 30


13) flat(depth)
------------------------------------------------------------------------------

Definition:
flat() is an array method that creates a new array by flattening nested arrays
up to the specified depth. By default, it flattens only one level and does not
modify the original array.

Syntax:
arr.flat(depth)

• Flattens nested arrays.
• Does not modify the original array.
• Default depth = 1.
• Yes, you can change the depth by passing a number.
• Use Infinity to flatten all nested levels.

Example:

[1,[2,3],[4]].flat();
// [1,2,3,4]

[1,[2,[3,[4]]]].flat(2);
// [1,2,3,[4]]

[1,[2,[3,[4]]]].flat(Infinity);
// [1,2,3,4]



14) flatMap(callback)
------------------------------------------------------------------------------

Definition:
flatMap() is an array method that first maps each element using a callback
function and then flattens the resulting array by one level. It is equivalent
to using map() followed by flat(1), but is more efficient and concise.

Syntax:
arr.flatMap(callback)

• Maps elements using the callback function.
• Flattens the result by one level only.
• Does not modify the original array.
• Equivalent to: arr.map(callback).flat(1)

Example:

[1,2,3].flatMap(x => [x,x*2]);
// [1,2,2,4,3,6]




============================================================================================================================
ARRAY ITERATION METHODS
============================================================================================================================
15) using For loop

let arr = [10, 20, 30];

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

Output:
10
20
30

15) forEach(callback)

- Executes function for each element.
foreach() returns undefined.
Mainly used for iteration and performing side effects.

Syntax:
arr.forEach(callback)

arr.forEach((value, index, array) => {
  // code
});

let arr = [10, 20, 30];

arr.forEach(x => {
  console.log(x);
});

Note:A callback is a function passed as an argument to another function, which is called later by that function.



16) map(callback)
map() is an array method that creates a new array by applying a function to every element of the original array.
✅ Returns a new array
✅ Does not modify the original array

Syntax:
arr.map(callback)

Example:
let arr = [1, 2, 3];
let result = arr.map(x => x * 2);  // multiply each element
console.log(result);  // [2, 4, 6]

To modify original array:

to convert array to react elements .jsx

1. Assign the result back (Recommended)
let arr = [1, 2, 3];

arr = arr.map(x => x * 2);

console.log(arr); // [2, 4, 6]

2. Modify using forEach()
let arr = [1, 2, 3];

arr.forEach((value, index) => {
  arr[index] = value * 2;
});

console.log(arr); // [2, 4, 6]

17) filter(callback)
- Returns elements matching condition.

Syntax:
arr.filter(callback)

Example:
arr.filter(x => x%2==0); // [2,4]



18) reduce(callback,initial)
- Reduces array to single value.
reduce() (Interview Definition):

reduce() is an array method that iterates over each element and combines them into a single value.
In every iteration, it updates the accumulator (acc) using the current element (curr).
After the last iteration, it returns the final accumulated value (e.g., sum, product, object, array).
Syntax:
arr.reduce(callback,initial)

arr.reduce((accumulator, currentValue) => {
    return updatedAccumulator;
}, initialValue);

Parameters:

accumulator → Stores the result from previous iterations.
currentValue → Current array element.
initialValue → Starting value of the accumulator.

Example:
let arr = [10, 20, 30];

let sum = arr.reduce((acc, curr) => {return(acc + curr)}, 0);

or 
let sum = arr.reduce((acc, curr) => acc + curr, 0);

console.log(sum); // 60

maxValue:

let arr = [5, 8, 2, 10];

let max = arr.reduce((acc, curr) => {
    return acc > curr ? acc : curr;
});

-------

// =========================================
// 6) reduce()
// =========================================
// Definition:
// Reduces array to a SINGLE value using accumulator.
--Accumulator = variable that keeps accumulating the result each step.
--Accumulate means to collect or gather gradually over time.
let arr = [1, 2, 3, 4];

let sum = arr.reduce((acc, num) => acc + num, 0);

console.log(sum);
// 10


// IMPORTANT NOTE:
// If multiplying, initial value should not be 0.

let product = nums.reduce((acc, num) => {
    return acc * num;
}, 1);

console.log(product);
// 120

let product = nums.reduce((acc, num) => acc*num, 1);


Parts explanation

1️⃣ (acc, num)

acc → accumulator (stores running result)

num → current element from array

2️⃣ acc + num

Adds current number to the accumulated result.

3️⃣ 0

Initial value of accumulator (starting point).


console.log(max); // 10

19) reduceRight(callback)
- Same as reduce but processes from right.

Example:
[1,2,3].reduceRight((a,b)=>a-b); 



20) find(callback)
- Returns first element that matches condition.

Syntax:
arr.find(callback)

Example:
[5,10,15].find(x => x>8);      // 10



21) findIndex(callback)
- Returns index of first matching element.

Example:
[5,10,15].findIndex(x => x>8); // 1



22) some(callback)
- Returns true if ANY element matches condition.

Example:
[1,3,5].some(x => x%2===0);     // false



23) every(callback)
- Returns true if ALL elements match condition.

Example:
[2,4,6].every(x => x%2===0);    // true

============================================================================================================================
ARRAY SEARCH / COPY METHODS
============================================================================================================================

24) lastIndexOf(value)
- Returns last index of element.

Example:
[1,2,3,2].lastIndexOf(2);      // 3



25) copyWithin(target,start,end)
- Copies part of array inside same array.

Syntax:
arr.copyWithin(target,start,end)

Example:
[1,2,3,4].copyWithin(0,2);     // [3,4,3,4]



26) entries()
- Returns iterator of index-value pairs.

Example:
let arr = ["a","b"];
arr.entries();                 // [0,"a"], [1,"b"]



27) keys()
- Returns iterator of array indexes.

Example:
[10,20,30].keys();             // 0,1,2



28) values()
- Returns iterator of array values.

Example:
[10,20,30].values();           // 10,20,30



============================================================================================================================
ARRAY CREATION METHODS
============================================================================================================================
29. Array Literal [] ✅ (Most Preferred)

This is how arrays are created in almost every JavaScript project.

const arr = [1, 2, 3];

Why preferred?

Short and readable
No confusing behavior
Easy to understand

30. Array.from() ✅ (Preferred for conversion)

Purpose: Convert an iterable or array-like object into an array.

Example:

const arr = Array.from("hello");

console.log(arr);
// ["h", "e", "l", "l", "o"]

Other examples:

Array.from(new Set([1,2,2,3]));
// [1,2,3]


30) Array.of(element1, element2, ...)- Creates a new array from the values passed as arguments.
Example:
Array.of(1,2,3);               // [1,2,3]


31) new Array()

let arr1 = new Array();
let arr2 = new Array(1, 2, 3);

console.log(arr2); // [1, 2, 3]

But be careful:

let arr = new Array(5);

console.log(arr); // [ <5 empty items> ]
console.log(arr.length); // 5

This is why most developers prefer:

let arr = [1, 2, 3];
============================================================================================================================
INTERVIEW NOTES
============================================================================================================================

Commonly Used Methods:
push(), pop(), shift(), unshift(), slice(), splice(),
map(), filter(), reduce(), find(), includes(), sort()

Less Frequently Used:
flat(), flatMap(), copyWithin(), entries(), keys(), values()

Total Important Methods ≈ 30+

===================================

==================== ARRAY COPY IN JAVASCRIPT ====================

-------------------- ❌ WRONG WAY --------------------

let arr1 = [1,2,3];
let arr2 = arr1;     // NOT a copy (reference)

arr2.push(4);

console.log(arr1);   // [1,2,3,4]

👉 Both variables point to SAME memory


-------------------- ✅ SHALLOW COPY METHODS --------------------

1) Spread operator (MOST USED)
let arr2 = [...arr1];

2) Array.from()
let arr2 = Array.from(arr1);

👉 All create NEW array (top-level copy)

============================================================
Spread Operator (...)

The spread operator (...) expands the elements of an iterable (such as an array, string, or object) into individual values.
It is commonly used to copy, merge, or insert elements into arrays and objects.

Example:

let arr = [1, 2, 3];
let copy = [...arr];

==================== 
SHALLOW vs DEEP COPY
====================
Shallow Copy
- A shallow copy creates a new object/array, but nested objects or arrays are copied by reference.
- Changes to top-level properties do not affect the original.
- Changes to nested objects/arrays affect both the original and the copy.
- Examples: spread operator (`...`), `slice()`, `Object.assign()`.

Deep Copy
- A deep copy creates a completely independent copy, including all nested objects and arrays.
- Changes made to the copy do not affect the original, and vice versa.
- Every level of the object/array is duplicated.

