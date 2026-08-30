

#  Closure in JavaScript

A closure is created when an inner function remembers and can access the variables of its outer function even after the outer function has finished executing.

Why do we need Closures?

Normally, when a function finishes executing, its local variables should be destroyed.

But if an inner function still needs those variables, JavaScript keeps them alive.


So we can say that, a closure is the combination of a function and the lexical environment in which it was created.


---

How does a Closure work?

When an inner function is returned it carries a reference to the outer function's variables along with it.
Even though the outer function has completed execution, the inner function still has access to those variables because JavaScript stores them in a special memory area called a closure.

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




# HOISTING
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


# 1. STREAM
---------

CONCEPT:

A stream is a way of processing data piece-by-piece (chunk-by-chunk)
instead of loading the entire data into memory at once.

Instead of:

    read entire 2 GB file
    → store 2 GB in memory
    → process it

A stream does:

    small chunk
        ↓
    process
        ↓
    next chunk
        ↓
    process
        ↓
    ...

WHY USE STREAMS?

- saves memory
- useful for large data
- can start processing before the entire data arrives
- improves performance for I/O operations
- useful for continuous data
- supports processing data as it becomes available

--------------------------------------------------
TYPES OF STREAMS IN NODE.JS
--------------------------------------------------

1. READABLE STREAM
------------------

Used to READ data.

Examples:
- reading a file
- receiving HTTP request data

Example:

    const fs = require("fs");

    const readable = fs.createReadStream("large-file.txt");

    readable.on("data", (chunk) => {
        console.log(chunk);
    });

The `data` event is triggered whenever a chunk is available.


2. WRITABLE STREAM
------------------

Used to WRITE data.

Examples:
- writing to a file
- sending data to an HTTP response

Example:

    const fs = require("fs");

    const writable = fs.createWriteStream("output.txt");

    writable.write("Hello");
    writable.write("World");

    writable.end();


3. DUPLEX STREAM
----------------

Can READ and WRITE data.

It has both readable and writable sides.

Examples:
- TCP socket
- network connection

Concept:

    data → readable side
           ↓
        processing
           ↓
    data → writable side


4. TRANSFORM STREAM
-------------------

A special type of Duplex stream that can TRANSFORM data while
it passes through.

Examples:
- compression
- decompression
- encryption
- data transformation

Example:

    input
      ↓
    transform
      ↓
    output

Node.js modules such as `zlib` provide transform streams.


--------------------------------------------------
IMPORTANT STREAM METHODS
--------------------------------------------------

1. .on()
--------

Used to listen for stream events.

Example:

    readable.on("data", (chunk) => {
        console.log(chunk);
    });

Common events:

    "data"
    "end"
    "error"
    "finish"
    "close"


2. .read()
----------

Used to manually read data from a Readable stream.

Usually you don't need it when using the `data` event or `pipe()`.

Example:

    readable.on("readable", () => {
        let chunk;

        while ((chunk = readable.read()) !== null) {
            console.log(chunk);
        }
    });


3. .write()
-----------

Used to write data into a Writable stream.

Example:

    writable.write("Hello");


4. .end()
---------

Indicates that no more data will be written.

Example:

    writable.write("Hello");
    writable.write("World");
    writable.end();


5. .pipe() ⭐⭐⭐
---------------

One of the MOST IMPORTANT stream methods.

`pipe()` connects a Readable stream to a Writable stream.

Concept:

    Readable
       ↓
      pipe()
       ↓
    Writable

Example:

    const fs = require("fs");

    const readable = fs.createReadStream("input.txt");

    const writable = fs.createWriteStream("output.txt");

    readable.pipe(writable);

This reads the input file in chunks and writes those chunks to
the output file.

IMPORTANT:

Without `pipe()`:

    read chunk
    → manually write chunk
    → read next chunk
    → manually write
    → ...

With `pipe()`:

    readable.pipe(writable);

Much simpler.

--------------------------------------------------
WHY IS pipe() IMPORTANT?
--------------------------------------------------

`pipe()` also helps handle FLOW CONTROL / BACKPRESSURE.

Imagine:

    readable → very fast
    writable → slower

If the readable stream keeps producing data faster than the
writable stream can consume it, memory could grow.

`pipe()` helps manage this flow automatically.

Concept:

    Fast producer
         ↓
      pipe()
         ↓
    Slow consumer

The stream system manages the flow so the writable side isn't
overwhelmed.

This is called:

    BACKPRESSURE

Interview definition:

"Backpressure occurs when the data producer is producing data
faster than the consumer can process it."


--------------------------------------------------
6. .destroy()
-------------

Used to destroy/close a stream.

Example:

    readable.destroy();

Can be useful when:
- an error occurs
- processing needs to stop
- resource needs to be released


--------------------------------------------------
7. .pause()
-----------

Temporarily stops a Readable stream from emitting `data` events.

Example:

    readable.pause();


8. .resume()
------------

Resumes a paused Readable stream.

Example:

    readable.resume();


--------------------------------------------------
9. .setEncoding()
-----------------

Sets the character encoding for data coming from a Readable stream.

Example:

    readable.setEncoding("utf8");

Then chunks are returned as strings instead of Buffers.

Without encoding:

    chunk → Buffer

With:

    readable.setEncoding("utf8")

    chunk → string


--------------------------------------------------
IMPORTANT STREAM EVENTS
--------------------------------------------------

READABLE STREAM:

    "data"
        → a chunk of data is available

    "end"
        → no more data is available

    "error"
        → an error occurred

    "close"
        → stream/resource was closed


WRITABLE STREAM:

    "drain"
        → writable stream can accept more data

    "finish"
        → all data has been flushed/written after end()

    "error"
        → an error occurred

    "close"
        → stream was closed


--------------------------------------------------
PIPE vs EVENTS
--------------------------------------------------

MANUAL WAY:

    readable.on("data", (chunk) => {
        writable.write(chunk);
    });

PIPE WAY:

    readable.pipe(writable);

`pipe()` is generally preferred when simply connecting one stream
to another because it handles data flow and backpressure.


--------------------------------------------------
PIPE CHAINING
--------------------------------------------------

Streams can be chained.

Example:

    readable
       ↓
    transform
       ↓
    writable

Example using compression:

    const fs = require("fs");
    const zlib = require("zlib");

    const readable = fs.createReadStream("input.txt");

    const gzip = zlib.createGzip();

    const writable = fs.createWriteStream("input.txt.gz");

    readable
        .pipe(gzip)
        .pipe(writable);

Flow:

    input.txt
       ↓
    Readable stream
       ↓
    Gzip transform
       ↓
    Writable stream
       ↓
    input.txt.gz


--------------------------------------------------
STREAM + BUFFER
--------------------------------------------------

Streams and Buffers are related, but they are NOT the same thing.

BUFFER:

    stores raw binary data in memory.

STREAM:

    processes data over time/chunks.

For example:

    large image
        ↓
    Readable stream
        ↓
    Buffer chunk
        ↓
    process
        ↓
    next Buffer chunk
        ↓
    ...

Node.js streams commonly use Buffer objects when handling binary
data.

For text streams, you can also configure encoding so the chunks
are strings.


--------------------------------------------------
STREAM HIGH-WATER MARK
--------------------------------------------------

A stream has an internal buffering mechanism.

`highWaterMark` controls approximately how much data the stream
tries to buffer before applying backpressure.

Example:

    const fs = require("fs");

    const stream = fs.createReadStream("large.txt", {
        highWaterMark: 1024
    });

Here the stream works with a configured buffer size of roughly
1024 bytes for each read operation.

IMPORTANT:

`highWaterMark` is NOT a strict maximum amount of memory the
stream can ever use.

It is a threshold used by Node.js to control buffering and flow.


--------------------------------------------------
REAL USE CASES
--------------------------------------------------

1. LARGE FILE READING

    const readable = fs.createReadStream("large-file.txt");

Instead of loading the whole file into memory.


2. FILE COPYING

    readable.pipe(writable);


3. FILE COMPRESSION

    readable
        .pipe(gzip)
        .pipe(writable);


4. HTTP RESPONSE

A server can stream a large response instead of loading the
entire response into memory first.


5. FILE UPLOADS

A large uploaded file can be processed as chunks.


6. VIDEO/AUDIO

Media can be delivered progressively instead of loading the
entire file first.


7. LOG PROCESSING

Large log files can be processed line/chunk by chunk.


8. DATABASE / NETWORK DATA

Streams can process continuous data arriving from network or
other I/O sources.


--------------------------------------------------
STREAM EXAMPLE — COMPLETE
--------------------------------------------------

    const fs = require("fs");

    const readable = fs.createReadStream("input.txt");

    const writable = fs.createWriteStream("output.txt");

    readable.on("error", (err) => {
        console.log("Read error:", err);
    });

    writable.on("error", (err) => {
        console.log("Write error:", err);
    });

    readable.pipe(writable);

Flow:

    input.txt
       ↓
    createReadStream()
       ↓
    Readable
       ↓
    pipe()
       ↓
    Writable
       ↓
    output.txt


--------------------------------------------------
COMMON INTERVIEW QUESTIONS
--------------------------------------------------

Q: What is a stream?

A:
A stream is an abstraction for processing data incrementally,
usually in chunks, instead of loading the entire data into memory.


Q: What are the four types of streams?

A:

    Readable
    Writable
    Duplex
    Transform


Q: What is pipe()?

A:
`pipe()` connects a Readable stream to a Writable stream and
handles the flow of data between them.


Q: Why is pipe() better than manually reading and writing?

A:
It simplifies stream handling and manages flow control and
backpressure between the producer and consumer.


Q: What is backpressure?

A:
Backpressure occurs when a data producer generates data faster
than the consumer can process it.


Q: Is Buffer a stream?

A:
No.

Buffer:
    represents binary data in memory.

Stream:
    represents a mechanism for processing data incrementally.


Q: What is the difference between Duplex and Transform?

A:

Duplex:
    can independently read and write data.

Transform:
    is a Duplex stream where the output is generally based on
    transforming the input.


Q: What does the "data" event mean?

A:
A chunk of data is available from a Readable stream.


Q: What does the "end" event mean?

A:
The Readable stream has no more data to provide.


Q: What does "finish" mean?

A:
A Writable stream has finished writing all data after `end()`.


Q: What is highWaterMark?

A:
It is a buffering threshold used by Node.js streams to control
when backpressure should be applied.


--------------------------------------------------
MOST IMPORTANT THINGS TO REMEMBER
--------------------------------------------------

STREAM
    → processes data chunk-by-chunk

BUFFER
    → stores raw binary data

READABLE
    → reads

WRITABLE
    → writes

DUPLEX
    → reads + writes

TRANSFORM
    → reads + transforms + writes

.pipe()
    → connects streams

.on()
    → listens for events

.write()
    → writes data

.end()
    → signals no more data

.destroy()
    → destroys the stream

.pause()
    → pauses reading

.resume()
    → resumes reading

.setEncoding()
    → controls how chunks are decoded

BACKPRESSURE
    → producer is faster than consumer

highWaterMark
    → buffering/flow-control threshold

MAIN INTERVIEW EXAMPLE:

    readable
       ↓
    .pipe()
       ↓
    transform
       ↓
    .pipe()
       ↓
    writable

This is one of the most common practical patterns for Node.js
streams.
--------------------------------------------------

# 2. BUFFER
---------

CONCEPT:
A Buffer is a temporary area of memory used by Node.js to handle
raw binary data.

JavaScript normally works with strings and objects.

But Node.js often needs to deal with:
- images
- PDFs
- videos
- audio
- network packets
- files

These are binary data, so Node.js uses Buffer.

EXAMPLE:

    const buffer = Buffer.from("Hello");

    console.log(buffer);

Output will be something similar to:

    <Buffer 48 65 6c 6c 6f>

Those hexadecimal values represent the bytes of "Hello".

CONVERT BUFFER TO STRING:

    buffer.toString();

    // Hello

REAL USE CASES:
- reading files
- image upload
- PDF processing
- network communication
- file compression
- encryption/decryption

STREAM vs BUFFER:

Buffer:
    stores binary data in memory.

Stream:
    processes data gradually/chunk-by-chunk.

They often work together.

Example:

    large file
       ↓
    stream
       ↓
    chunks
       ↓
    buffers
       ↓
    process/write


--------------------------------------------------

3. CLUSTER
----------

CONCEPT:
Node.js runs JavaScript on a single main thread by default.

The Node.js Cluster module allows us to create multiple processes
called workers that can run on multiple CPU cores.

WITHOUT CLUSTER:

    CPU
     |
    Node.js
     |
    one process

WITH CLUSTER:

             CPU
              |
      ----------------
      |      |       |
    worker worker  worker
      1      2       3

Each worker is a separate Node.js process.

WHY?
To utilize multiple CPU cores and handle more requests.

EXAMPLE:

    const cluster = require("cluster");
    const os = require("os");

    if (cluster.isPrimary) {
        const cpuCount = os.cpus().length;

        for (let i = 0; i < cpuCount; i++) {
            cluster.fork();
        }
    } else {
        // worker process
        // start server here
    }

REAL USE CASE:
Suppose a server machine has 8 CPU cores.

Without clustering:
    Node.js application mainly uses one CPU core.

With clustering:
    multiple worker processes can use multiple cores.

IMPORTANT:
Cluster creates multiple PROCESSES, not multiple threads inside
the same JavaScript execution context.

In modern production systems, tools such as PM2, containers,
Kubernetes, or cloud infrastructure may also be used to scale
Node.js applications.


--------------------------------------------------

# 4. THIS KEYWORD

CONCEPT:
`this` refers to the object/context associated with the current
function execution.

Its value depends on HOW the function is called.

IMPORTANT:
`this` is NOT determined simply by where the function is written
for normal functions.

EXAMPLE:

    const user = {
        name: "Ajay",
        greet: function() {
            console.log(this.name);
        }
    };

    user.greet();

Output:

    Ajay

Here:

    this → user

because the function was called as:

    user.greet()


NORMAL FUNCTION:

    function show() {
        console.log(this);
    }

In strict mode:

    this → undefined

In non-strict browser JavaScript:

    this → global object

Arrow functions are different.

ARROW FUNCTION:

    const user = {
        name: "Ajay",

        greet: () => {
            console.log(this.name);
        }
    };

Arrow functions DO NOT have their own `this`.

They inherit `this` from the surrounding lexical scope.

IMPORTANT DIFFERENCE:

    normal function
    → gets its own `this` based on invocation

    arrow function
    → inherits `this` from surrounding scope


REAL USE CASE:
Object methods:

    const person = {
        name: "Ajay",

        greet() {
            console.log(`Hello ${this.name}`);
        }
    };

    person.greet();

`this` is useful when a method needs access to the object's
properties.


--------------------------------------------------

# 5. CALL()
---------

CONCEPT:
`call()` executes a function immediately while explicitly setting
the value of `this`.

SYNTAX:

    function.call(thisArg, arg1, arg2, ...)


EXAMPLE:

    const person1 = {
        name: "Ajay"
    };

    const person2 = {
        name: "Rahul"
    };

    function greet(city) {
        console.log(this.name, city);
    }

    greet.call(person1, "Bangalore");

Output:

    Ajay Bangalore

Here:

    this → person1

CALL USES:
- explicitly setting `this`
- function borrowing
- calling a function with different objects

KEY POINT:

    call()
    → executes immediately
    → arguments passed individually


--------------------------------------------------

6. APPLY()
----------

CONCEPT:
`apply()` is almost the same as `call()`.

Main difference:
arguments are passed as an ARRAY.

SYNTAX:

    function.apply(thisArg, [arg1, arg2, ...])


EXAMPLE:

    function greet(city, country) {
        console.log(this.name, city, country);
    }

    const user = {
        name: "Ajay"
    };

    greet.apply(user, ["Bangalore", "India"]);

Output:

    Ajay Bangalore India

CALL:

    greet.call(user, "Bangalore", "India");

APPLY:

    greet.apply(user, ["Bangalore", "India"]);


REAL USE CASE:
When arguments already exist inside an array.

    const numbers = [10, 20, 30];

Historically:

    Math.max.apply(null, numbers);

Modern JavaScript usually uses:

    Math.max(...numbers);


--------------------------------------------------

7. BIND()
---------

CONCEPT:
`bind()` does NOT execute the function immediately.

It creates and returns a NEW function with `this` permanently
bound to the supplied object.

SYNTAX:

    const newFunction = originalFunction.bind(thisArg);


EXAMPLE:

    const user = {
        name: "Ajay"
    };

    function greet() {
        console.log(this.name);
    }

    const boundGreet = greet.bind(user);

    boundGreet();

Output:

    Ajay


CALL vs APPLY vs BIND:

    call()
    → executes immediately
    → arguments individually

    apply()
    → executes immediately
    → arguments as array

    bind()
    → does NOT execute immediately
    → returns a new function


MEMORY TRICK:

    CALL  → call now
    APPLY → apply array
    BIND  → bind for later


REAL USE CASE FOR BIND:

    const user = {
        name: "Ajay",
        greet() {
            console.log(this.name);
        }
    };

    const greet = user.greet.bind(user);

    setTimeout(greet, 1000);

Without binding, the method may lose the intended `this`
context when passed as a callback.


--------------------------------------------------

# 8. SPREAD OPERATOR (...)
----------------------

CONCEPT:
The spread operator expands/unpacks values from an iterable or
object.

It is written as:

    ...


ARRAY EXAMPLE:

    const arr1 = [1, 2, 3];

    const arr2 = [...arr1, 4, 5];

Result:

    [1, 2, 3, 4, 5]

Instead of:

    [arr1, 4, 5]

which would create a nested array.

OBJECT EXAMPLE:

    const user = {
        name: "Ajay",
        age: 25
    };

    const updatedUser = {
        ...user,
        age: 26
    };

Result:

    {
        name: "Ajay",
        age: 26
    }

IMPORTANT:
If duplicate properties exist, the later property wins.

    const user = {
        name: "Ajay",
        age: 25,
        ...{ age: 26 }
    };

Result:

    age: 26


REAL USE CASES:
- copying arrays
- merging arrays
- copying objects
- merging objects
- updating React state
- passing function arguments
- immutable updates

REACT EXAMPLE:

    setUser({
        ...user,
        name: "Rahul"
    });

This creates a new object instead of directly modifying the
existing object.


--------------------------------------------------

9. REST OPERATOR (...)
--------------------

CONCEPT:
Rest collects multiple values into a single array.

It uses the same `...` syntax as spread.

But its PURPOSE is different.

SPREAD:
    expands/unpacks

REST:
    collects/groups


FUNCTION EXAMPLE:

    function sum(...numbers) {
        return numbers.reduce((total, n) => total + n, 0);
    }

    sum(10, 20, 30);

Inside the function:

    numbers = [10, 20, 30]


ANOTHER EXAMPLE:

    function greet(first, ...others) {
        console.log(first);
        console.log(others);
    }

    greet("Ajay", "Rahul", "Amit");

Result:

    first = "Ajay"
    others = ["Rahul", "Amit"]


DESTRUCTURING EXAMPLE:

    const [first, ...remaining] = [10, 20, 30, 40];

Result:

    first = 10
    remaining = [20, 30, 40]


REAL USE CASES:
- functions accepting unlimited arguments
- collecting remaining function parameters
- destructuring
- flexible APIs
- processing variable-length data


--------------------------------------------------

10. SPREAD vs REST
------------------

Both use the same `...` syntax, but their purpose is different.

SPREAD → expands / unpacks values
REST   → collects / gathers values


---

"Spread and rest use the same `...` syntax but have opposite
purposes. Spread expands or unpacks values from an array or object,
while rest collects multiple values into an array. Spread is commonly
used for copying, merging and passing arguments, while rest is used
for variable function parameters and destructuring."


MEMORY TRICK:

    SPREAD → spread OUT
    REST   → collect the REST


--------------------------------------------------

11. QUICK COMPARISON
--------------------

STREAM:
    processes data chunk-by-chunk.

BUFFER:
    stores raw binary data in memory.

CLUSTER:
    runs multiple Node.js processes to utilize CPU cores.

THIS:
    refers to the current invocation context.

CALL:
    execute now + arguments individually.

APPLY:
    execute now + arguments as array.

BIND:
    return a new function with `this` bound.

SPREAD:
    unpack/expand values.

REST:
    collect remaining values.


--------------------------------------------------

12. VERY COMMON INTERVIEW TRAPS
-------------------------------

Q: Is Buffer a stream?
A:
No.

Buffer is a data structure for binary data.
Stream is a mechanism for processing data over time/chunks.

Q: Is stream only for files?
A:
No.

Streams can be used for:
- files
- HTTP
- network data
- video/audio
- compression
- etc.

Q: call vs apply?
A:
Both execute immediately and set `this`.

Difference:

    call(obj, a, b)

    apply(obj, [a, b])


Q: call vs bind?
A:

    call()
    → executes immediately

    bind()
    → returns a new function

Q: Do arrow functions have their own `this`?
A:
No. They inherit `this` from the surrounding lexical scope.

Q: Is spread the opposite of rest?
A:
Conceptually yes.

    spread → expands

    rest → collects

Q: Does cluster create threads?
A:
The Node.js cluster module creates multiple worker PROCESSES.
Do not confuse it with worker threads.

Q: Why use streams?
A:
To process large/continuous data without loading everything into
memory at once.

Q: Why are Buffers needed in Node.js?
A:
To work with raw binary data such as files, images, PDFs,
network packets, and audio/video.


--------------------------------------------------
ONE-LINE INTERVIEW DEFINITIONS
--------------------------------------------------

Stream:
"An abstraction for processing data incrementally in chunks."

Buffer:
"A Node.js object used to represent and manipulate raw binary data
in memory."

Cluster:
"A Node.js mechanism for running multiple worker processes so an
application can utilize multiple CPU cores."

this:
"A dynamically determined context value for normal functions,
based on how the function is called."

call:
"Immediately invokes a function with an explicitly specified `this`
and individually supplied arguments."

apply:
"Immediately invokes a function with an explicitly specified `this`
and arguments supplied as an array."

bind:
"Creates a new function with `this` permanently bound to a
specified object."

Spread:
"Expands an iterable or object into individual elements/properties."

Rest:
"Collects multiple remaining values into an array."