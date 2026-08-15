

 Closure in JavaScript
==========================================================

A closure is created when an inner function remembers and can access the variables of its outer function even after the outer function has finished executing.

Why do we need Closures?

Normally, when a function finishes executing, its local variables should be destroyed.

But if an inner function still needs those variables, JavaScript keeps them alive.

and that is called a closure.

---

How does a Closure work?

When an inner function is returned it carries a reference to the outer function's variables along with it.
Even though the outer function has completed execution, the inner function still has access to those variables because JavaScript stores them in a special memory area called a closure.

So, a closure is the combination of a function and the lexical environment in which it was created.

Example 1

function outer() {
    let message = "Hello";

    function inner() {
        console.log(message);
    }

    return inner;
}

const myFunction = outer();  //outer() returns the reference to inner and stores refernce in myfFunction.
//When you call myFunction(), inner() executes.

myFunction();

Output
Hello

Step-by-Step Execution

Step 1

const myFunction = outer();

outer() starts executing.

Memory inside outer:
message = "Hello"

Step 2

JavaScript creates

function inner() {
    console.log(message);
}

inner uses message.

So JavaScript creates a closure.

Step 3

return inner;

outer() finishes.

Normally,
message

should disappear.

But...

Since inner still needs it,

JavaScript keeps
message = "Hello"

alive.

Step 4

myFunction();

Even though outer() has already finished,

inner() still remembers
message = "Hello"

Output
Hello

Visualization

outer()

message = "Hello"
        │
        │
        ▼
inner()
console.log(message)

Even after
outer() finished

the variable still exists because of the closure.

Example 2 (Counter)

function counter() {

    let count = 0;

    return function () {
        count++;
        console.log(count);
    };

}

const increment = counter();

increment();
increment();
increment();

Output

1
2
3

How?

First call

count = 0

count++

1

Second call

count is still remembered

count++

2

Third call

count++

3

Without closures,

every call would print

1

Example 3 (Private Variable)

function bankAccount() {

    let balance = 1000;

    return {

        deposit(amount) {
            balance += amount;
            console.log(balance);
        },

        withdraw(amount) {
            balance -= amount;
            console.log(balance);
        }

    };

}

const account = bankAccount();

account.deposit(500);

account.withdraw(200);

Output

1500
1300

Can we do

console.log(account.balance);

Output

undefined

Because
balance

is private.

Only the returned functions can access it.

This is one of the biggest uses of closures.

Real-world Uses

1. Data Privacy
let password

cannot be accessed directly.

2. Counters
count++

3. Timers
setTimeout()
setInterval()

4. Event Listeners
button.addEventListener(...)

The callback remembers variables from its outer scope.

5. Currying

Advanced JavaScript uses closures heavily.

6. React Hooks

Hooks like
useState()

internally rely on closure-like behavior to preserve state across renders.

Common Interview Question

What will be the output?

function test() {

    let x = 10;

    return function () {

        console.log(x);

    };

}

const fn = test();

fn();

Output

10

Reason

The inner function remembers x.

Another Example

function multiply(a) {

    return function (b) {

        return a * b;

    };

}

const double = multiply(2);

console.log(double(5));

Output

10

Explanation

double remembers
a = 2

through a closure.

Advantages

Data hiding (private variables)
State preservation
Function factories
Event handling
Callbacks
Module pattern

Disadvantage

Closures keep variables alive in memory. If you create many unnecessary closures or hold onto large objects, they can increase memory usage.

Interview Answer (45–60 seconds)

A closure is a JavaScript feature where an inner function remembers and can access variables from its outer function even after the outer function has finished executing. This happens because the inner function retains a reference to the outer function's lexical environment. Closures are commonly used for data privacy, maintaining state (such as counters), callbacks, event handlers, and function factories.

-----------------------------------------------------------------




HOISTING
=============================================================================
Definition

Hoisting is JavaScript's default behavior of processing variable and function declarations before the code is executed.
Important: JavaScript does not physically move your code.it only registers declarations before execution starts.

JavaScript Execution Phases

Whenever JavaScript runs a program, it goes through 2 phases.

Phase 1: Memory Creation Phase (Hoisting Phase)

JavaScript scans the entire code and allocates memory.

var                  → Memory allocated and initialized to undefined.
let                  → Memory allocated but not initialized.
const                → Memory allocated but not initialized.

Function declarations→ Entire function stored in memory.

No code is executed in this phase.

Phase 2: Execution Phase

JavaScript executes the code line by line.

Assignments happen.
Functions are called.

Example 1 - var

console.log(a);

var a = 10;

console.log(a);

Memory Creation Phase

JavaScript sees:

var a;

Memory

a → undefined

Execution Phase

Line 1

console.log(a);

Output

undefined

Line 2

a = 10;

Memory

a → 10

Line 3

console.log(a);

Output

10

Final Output

undefined
10

Example 2 - let

console.log(a);

let a = 10;

Memory Creation Phase

Memory

a → <uninitialized>

The variable exists but cannot be accessed.

Execution Phase

Before reaching

let a = 10;

you try

console.log(a);

Output

ReferenceError:
Cannot access 'a' before initialization

Example 3 - const

console.log(a);

const a = 10;

Exactly the same.

Output

ReferenceError

Temporal Dead Zone (TDZ)

The Temporal Dead Zone (TDZ) is the period between:

The variable being created in memory, and
The line where it is declared and initialized.

Example

{
    console.log(a); // TDZ

    let a = 10;

    console.log(a);
}

Execution

Line 1 → ReferenceError
Line 2 → a initialized
Line 3 → 10

Function Hoisting

Function Declaration

greet();

function greet() {
    console.log("Hello");
}

Output

Hello

Reason:

The entire function is hoisted.

Memory

greet → function

Function Expression

greet();

var greet = function () {
    console.log("Hello");
};

Output

TypeError:
greet is not a function

Reason

Memory

greet → undefined

Execution

greet(); // undefined()

Arrow Function

sayHi();

const sayHi = () => {
    console.log("Hi");
};

Output

ReferenceError

Because const is in the TDZ.

Memory Diagram

Suppose the code is:

var a = 5;
let b = 10;
const c = 20;

function add() {}

Memory Creation Phase

Global Memory

a   → undefined
b   → <uninitialized>
c   → <uninitialized>
add → function

Execution Phase

Global Memory

a   → 5
b   → 10
c   → 20
add → function

Summary Table

Declaration               Hoisted                  Initial Value             Access Before Declaration
-----------------------------------------------------------------------------------------------------
var                       ✅ Yes                   undefined                 ✅ undefined
let                       ✅ Yes                   Uninitialized (TDZ)       ❌ ReferenceError
const                     ✅ Yes                   Uninitialized (TDZ)       ❌ ReferenceError
Function Declaration      ✅ Yes                   Entire function           ✅ Can call before declaration
Function Expression (var) Partially (var only)     undefined                 ❌ TypeError
Arrow Function (let/const)Hoisted but in TDZ       Uninitialized             ❌ ReferenceError

Interview Answer (30–40 seconds)

Hoisting is JavaScript's behavior during the memory creation phase where declarations are processed before code execution. Variables declared with var are hoisted and initialized with undefined, while let and const are hoisted but remain uninitialized in the Temporal Dead Zone (TDZ), causing a ReferenceError if accessed before their declaration. Function declarations are fully hoisted, so they can be called before they appear in the code, whereas function expressions and arrow functions follow the hoisting rules of the variables they are assigned to.