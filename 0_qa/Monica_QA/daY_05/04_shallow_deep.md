======================================== SHALLOW vs DEEP COPY (CLEAN ROADMAP) ========================================

1) BASICS                                | 2) SHALLOW COPY                         | 3) DEEP COPY
---------------------------------------- | ----------------------------------------| ----------------------------------------
- Primitive vs Reference                 | - Definition                            | - Definition
- Memory (stack vs heap)                 | - How it works                          | - How it works (recursive)
- What is copy vs reference              | - Methods:                              | - Methods:
                                         |   • spread {...obj}                     |   • JSON.parse(JSON.stringify())
                                         |   • Object.assign()                     |   • structuredClone()
                                         |   • array slice/concat                  | - Limitations (important)
                                         | - Key behavior:
                                         |   • nested objects share reference

4) SHALLOW vs DEEP (CORE DIFFERENCE)     | 5) INTERVIEW TRAPS                      | 6) PRACTICE (GUESS OUTPUT)
---------------------------------------  | ---------------------------------------| ----------------------------------------
- Nested behavior                        | - Nested object changes                 | - 5–10 tricky questions
- When to use what                       | - Array inside object
                                         | - Object inside array


======================================== 1) BASICS (FOUNDATION) ========================================

PRIMITIVE TYPES:                         | REFERENCE TYPES:
---------------------------------------- | ----------------------------------------
Definition:                              | Definition:
- Primitive types are basic data types   | - Reference types are objects stored
  that store actual value directly       |   in memory and accessed via reference

- Stored by value (independent copy)     | - Stored by reference (memory address)

- Immutable (cannot be changed)          | - Mutable (can be modified)

---------------------------------------- | ----------------------------------------
- number, string, boolean, null,         | - object, array, function
  undefined, bigint, symbol              |
                                         | Example:
Example:                                 | ----------------------------------------
---------------------------------------- | let a = { x: 10 };
let a = 10;                              | let b = a;
let b = a;                               |
                                         | b.x = 20;
b = 20;                                  |
                                         | console.log(a.x); // 20 ❗
console.log(a); // 10                    |
                                         | ✔ Stored by REFERENCE (memory address)
✔ Stored by VALUE                        | ✔ Copy = same object
✔ Copy = independent                     |

primitive (top-level) → copied by value

======================================== 1.2 MEMORY MODEL (STACK vs HEAP) ========================================

STACK:                                   | HEAP:
---------------------------------------- | ----------------------------------------
- Stores primitives                      | - Stores actual objects/arrays
- Stores reference (address) of objects  |

VISUAL:
----------------------------------------
let a = { x: 10 };

STACK:        HEAP:
a  ───────▶   { x: 10 }


ANOTHER COPY:
----------------------------------------
let b = a;

STACK:        HEAP:
a ───┐
     ├────▶ { x: 10 }
b ───┘

👉 Both point to SAME memory

======================================== 2) SHALLOW COPY ========================================

Shallow Copy = copy only first level of an object/array

👉 Top-level properties are copied.  (because top level are primitives → so copied by value)

👉 Nested objects/arrays are NOT copied (shared reference)

----------------------------------------
KEY IDEA:
----------------------------------------
- Creates new outer object
- Inner objects still point to SAME memory

======================================== 2.2 HOW IT WORKS ========================================

- Creates new outer object              
- Inner objects still point to SAME memory

VISUAL:
----------------------------------------
original → { a: 1, b: { c: 2 } }

copy     → { a: 1, b: ─────┐
                           ▼
                      { c: 2 }

👉 b is shared


======================================== 2.3 METHODS (IMPORTANT) ========================================

A) Spread Operator                       | B) Object.assign()                      | C) Array Methods
----------------------------------------|----------------------------------------|----------------------------------------
const copy = { ...obj };                | const copy = Object.assign({}, obj);   | const copy = arr.slice();
                                        |SYNTAX:Object.assign(target, source)    | const copy = [].concat(arr);


======================================== 2.4 EXAMPLES (MUST UNDERSTAND) ========================================

EXAMPLE 1 (primitive inside object)      | EXAMPLE 2 (nested object)
----------------------------------------|----------------------------------------
const a = { x: 1 };                     | const a = { x: { y: 1 } };
const b = { ...a };                     | const b = { ...a };
                                        |
b.x = 100;                              | b.x.y = 100;
                                        |
console.log(a.x); // 1 ✅               | console.log(a.x.y); // 100 ❗


EXAMPLE 3 (array inside object)         | EXAMPLE 4 (object inside array)
----------------------------------------|----------------------------------------
const a = { arr: [1,2] };               | const a = [{ x: 1 }];
const b = { ...a };                     | const b = [...a];
                                        |
b.arr.push(3);                          | b[0].x = 100;
                                        |
console.log(a.arr); // [1,2,3] ❗       | console.log(a[0].x); // 100 ❗


======================================== 2.5 KEY BEHAVIOR ========================================

✔ Top-level properties → copied          | ❗ Nested objects → shared reference


======================================== 3) DEEP COPY ========================================

Deep Copy = it copies ALL levels, no shared references and Changes do NOT affect original.

-It creates a completely independent copy, including all nested objects.

VISUAL:
----------------------------------------
original → { a: 1, b: { c: 2 } }

copy     → { a: 1, b: { c: 2 } }

👉 Different memory for both


======================================== 3.1 METHODS (IMPORTANT) ========================================

A) JSON METHOD (MOST COMMON)                  | B) structuredClone() (MODERN)
----------------------------------------------|----------------------------------------
const copy = JSON.parse(JSON.stringify(obj)); | const copy = structuredClone(obj);


======================================== 3.2 EXAMPLES ========================================

EXAMPLE 1 (nested object)                | EXAMPLE 2 (array inside object)
----------------------------------------|----------------------------------------
const a = { x: { y: 1 } };              | const a = { arr: [1,2] };
const b = JSON.parse(JSON.stringify(a));| const b = structuredClone(a);
                                         |
b.x.y = 100;                            | b.arr.push(3);
                                         |
console.log(a.x.y); // 1 ✅             | console.log(a.arr); // [1,2] ✅


======================================== 3.3 comparison(limitations) (VERY IMPORTANT) ========================================

JSON METHOD LIMITATIONS:                 | structuredClone LIMITATIONS:
----------------------------------------|----------------------------------------
- Removes functions                     | - Not supported in very old browsers
- Removes undefined                     | - Cannot clone functions
- Converts Date to string               | - Keeps Date as Date object ✅
- Cannot handle Map, Set                | - Supports Map, Set ✅
- Fails on circular references ❗       | - Handles circular references ✅

======================================== 4) SHALLOW vs DEEP (CORE DIFFERENCE) ========================================

======================================== 4.1 KEY DIFFERENCE ========================================

SHALLOW COPY:                           | DEEP COPY:
----------------------------------------|----------------------------------------
- Copies only first level               | - Copies all levels
- Nested objects → shared reference     | - No shared references


======================================== 4.2 SIDE-BY-SIDE COMPARISON ========================================

Feature              | Shallow Copy           | Deep Copy
------------------------------------------------------------
Copy Level           | First level only       | All levels
Nested Objects       | Shared                | Independent
Memory Usage         | Low                   | Higher
Performance          | Faster                | Slower
Safety               | Risk of mutation      | Safe
Methods              | spread, assign        | JSON, structuredClone


======================================== 4.3 BEHAVIOR EXAMPLE ========================================

const a = { x: { y: 1 } };

SHALLOW:                                | DEEP:
----------------------------------------|----------------------------------------
const b = { ...a };                     | const c = structuredClone(a);
b.x.y = 100;                            | c.x.y = 200;
                                         |
console.log(a.x.y); // 100 ❗           | console.log(a.x.y); // 100 (unchanged) ✅


======================================== 4.4 WHEN TO USE WHAT ========================================

USE SHALLOW COPY:                       | USE DEEP COPY:
----------------------------------------|----------------------------------------
- Simple objects (no nesting)           | - Nested objects/arrays
- Performance matters                   | - State updates (React, etc.)
- Read-only nested data                 | - Avoid mutation bugs


======================================== 4.5 CORE INTERVIEW LINE ========================================

Shallow copy shares nested references, deep copy creates fully independent structure.


========================================
NEXT STEP
========================================
========================================
🔥 1.4 MOST CONFUSING PART (VERY IMPORTANT)
========================================

👉 This is where most mistakes happen


========================================
A) = (ASSIGNMENT) vs SPREAD
========================================

const a = { x: 1 };
const b = a;        // ❗ reference copy (same object)
const c = { ...a }; // ✅ shallow copy (new object)

----------------------------------------
RESULT:
----------------------------------------
b → same memory as a ❗
c → new object ✅


========================================
B) REASSIGN vs MUTATE (CRITICAL)
========================================

REASSIGN:
----------------------------------------
b.x = 100;

👉 Replaces value
👉 Safe if primitive


MUTATE:
----------------------------------------
b.arr.push(3);
b.obj.y = 10;

👉 Modifies existing object
👉 Affects all references ❗


========================================
C) SIDE-BY-SIDE (MOST IMPORTANT)
========================================

CASE 1: REASSIGN (SAFE)
----------------------------------------
const a = { arr: [1,2] };
const b = { ...a };

b.arr = [9,9];   // new array

console.log(a.arr); // [1,2] ✅


CASE 2: MUTATE (SHARED)
----------------------------------------
const a = { arr: [1,2] };
const b = { ...a };

b.arr.push(3);

console.log(a.arr); // [1,2,3] ❗


========================================
D) MULTI-REFERENCE TRAP
========================================

const a = { x: { y: 1 } };

const b = { ...a };
const c = b;

c.x.y = 50;

console.log(a.x.y); // 50 ❗

WHY:
----------------------------------------
- b shares nested reference with a
- c points to b
- So all point to same inner object


========================================
🔥 FINAL RULE (MUST REMEMBER)
========================================

1) = → same reference ❗  
2) spread → shallow copy  
3) reassign → safe ✅  
4) mutate → affects all ❗  
======================================== 5) INTERVIEW TRAPS (VERY IMPORTANT) ========================================

👉 Goal: Predict output correctly


======================================== 5.1 NESTED OBJECT TRAP ========================================

const a = { x: { y: 1 } };
const b = { ...a };

b.x.y = 10;

console.log(a.x.y); // ?

ANSWER:                                  | WHY:
---------------------------------------- | ----------------------------------------
10 ❗                                     | - Shallow copy
                                         | - x is shared reference


======================================== 5.2 ARRAY INSIDE OBJECT ========================================

const a = { arr: [1,2] };
const b = { ...a };

b.arr.push(3);

console.log(a.arr); // ?

ANSWER:                                  | WHY:
---------------------------------------- | ----------------------------------------
[1,2,3] ❗                                | - Array is reference type
                                         | - Shared in shallow copy


======================================== 5.3 OBJECT INSIDE ARRAY ========================================

const a = [{ x: 1 }];
const b = [...a];

b[0].x = 99;

console.log(a[0].x); // ?

ANSWER:                                  | WHY:
---------------------------------------- | ----------------------------------------
99 ❗                                     | - Inner object is shared


======================================== 5.4 PRIMITIVE SAFE CASE ========================================

const a = { x: 1 };
const b = { ...a };

b.x = 100;

console.log(a.x); // ?

ANSWER:                                  | WHY:
---------------------------------------- | ----------------------------------------
1 ✅                                      | - Primitive copied by value


======================================== 5.5 OBJECT.assign TRAP ========================================

const a = { x: { y: 1 } };
const b = Object.assign({}, a);

b.x.y = 50;

console.log(a.x.y); // ?

ANSWER:                                  | WHY:
---------------------------------------- | ----------------------------------------
50 ❗                                     | - Same as spread → shallow copy


======================================== 5.6 DEEP COPY SAFE CASE ========================================

const a = { x: { y: 1 } };
const b = JSON.parse(JSON.stringify(a));

b.x.y = 200;

console.log(a.x.y); // ?

ANSWER:                                  | WHY:
---------------------------------------- | ----------------------------------------
1 ✅                                      | - Fully independent copy


======================================== 5.7 MIXED TRAP (VERY COMMON) ========================================

const a = {
  x: 1,
  y: { z: 2 }
};

const b = { ...a };

b.x = 100;
b.y.z = 200;

console.log(a.x);   // ?
console.log(a.y.z); // ?

ANSWER:                                  | WHY:
---------------------------------------- | ----------------------------------------
a.x   → 1   ✅                            | - x → primitive → copied
a.y.z → 200 ❗                            | - y → object → shared


======================================== 🔥 INTERVIEW PATTERN (REMEMBER) ========================================

IF nested object/array → think SHARED    | IF primitive → SAFE


======================================== 6) PRACTICE (GUESS OUTPUT) ========================================

👉 Try yourself FIRST, then check answers


======================================== Q1 ========================================

const a = { x: 1 };
const b = { ...a };

b.x = 5;

console.log(a.x); // ?


======================================== Q2 ========================================

const a = { x: { y: 2 } };
const b = { ...a };

b.x.y = 10;

console.log(a.x.y); // ?


======================================== Q3 ========================================

const a = [1,2,3];
const b = a;

b.push(4);

console.log(a); // ?

Note: What’s happening?
b = a → NOT copy
Both point to SAME array

Direct assignment = reference copy (NOT shallow copy)


======================================== Q4 ========================================

const a = [{ x: 1 }];
const b = [...a];

b[0].x = 20;

console.log(a[0].x); // ?


======================================== Q5 ========================================

const a = { arr: [1,2] };
const b = { ...a };

b.arr = [9,9];

console.log(a.arr); // ?

Note: What’s happening?
b.arr = [9,9] → REASSIGN (new array)
NOT modifying old array

Before:
a.arr ─┐
       ├──▶ [1,2]
b.arr ─┘

After:
a.arr ───▶ [1,2]
b.arr ───▶ [9,9]


======================================== Q6 ========================================

const a = { arr: [1,2] };
const b = { ...a };

b.arr.push(3);

console.log(a.arr); // ?


======================================== Q7 ========================================

const a = { x: { y: 1 } };
const b = JSON.parse(JSON.stringify(a));

b.x.y = 99;

console.log(a.x.y); // ?


======================================== Q8 (TRICKY) ========================================

const a = {
  x: 1,
  y: { z: 2 }
};

const b = { ...a };

b.y = { z: 100 };

console.log(a.y.z); // ?


======================================== Q9 (VERY TRICKY) ========================================

const a = {
  x: { y: 1 }
};

const b = { ...a };
const c = b;

c.x.y = 50;

console.log(a.x.y); // ?


======================================== Q10 (MIXED) ========================================

const a = {
  x: 1,
  arr: [1,2]
};

const b = structuredClone(a);

b.arr.push(3);
b.x = 100;

console.log(a.arr); // ?
console.log(a.x);   // ?

======================================== ANSWERS ========================================

Q1 → 1   | Q2 → 10 ❗   | Q3 → [1,2,3,4] ❗   | Q4 → 20 ❗  
Q5 → [1,2] ✅   | Q6 → [1,2,3] ❗   | Q7 → 1 ✅  
Q8 → 2 ✅   | Q9 → 50 ❗   | Q10 → [1,2] , 1 ✅  


======================================== 🔥 FINAL RESULT ========================================

If you got 8+/10 correct → strong understanding   | If <7 → revise shallow copy again
