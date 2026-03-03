// ================= ARROW FUNCTIONS =================

// Arrow functions are shorter syntax for writing function expressions.
// Introduced in ES6.
// Mostly used for short and simple functions.


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

// 1) Arrow functions are anonymous (no name).
// 2) They do NOT have their own "this".
// 3) Mostly used in callbacks and short functions.

==============================
// ================= setTimeout =================

// setTimeout schedules a function to run after a given time.
// It does NOT stop the program.
// It runs the function later (asynchronously).


// ===== Syntax =====
setTimeout(function, timeout);
// function → callback function
// timeout → time in milliseconds (1000ms = 1 second)


// ===== Example =====

console.log("hi there!");

setTimeout(() => {
    console.log("opqtech");
}, 4000);
// After 4000ms (4 seconds), this runs
// It runs only when the call stack is free

console.log("welcome to");


// ===== Output Order =====
// hi there!
// welcome to
// (after 4 seconds)
// opqtech

example2:
function someTimeConsumingActivity()
{
    let sum = 0;
    for(let i = 0; i < 1000; i++)
    {
        sum+=i;
    }

    console.log(sum);
}

console.log("hi there");

setTimeout(someTimeConsumingActivity, 4000);

console.log("Welcome to OpqTech");


// ===== Important Points =====

// 1) setTimeout is asynchronous.
// 2) It schedules the callback function.
// 3) JS continues executing next lines immediately.
// 4) Callback runs when main thread is free.

=========================
// ================= setInterval =================

// setInterval runs a function again and again
// after every given time (in milliseconds)


// ===== Syntax =====
setInterval(function, timeout);
// function → callback function
// timeout → time gap between executions


// ===== Example =====

const id = setInterval(() => {
    console.log("tick");
}, 1000);
// Runs every ~1000ms (1 second)


// setInterval returns an ID
// We store it in variable "id"


// ===== Stopping setInterval =====

setTimeout(()=>{
    clearInterval(id);
},4000)

// Stops the repeated execution after 4sec, without setTimeout the code will stop immedietely and no purpose of setInterval then.


// ===== Important Points =====

// 1) setInterval is asynchronous.
// 2) It keeps running repeatedly.
// 3) It returns an ID.
// 4) Use clearInterval(id) to stop it.

========================================

// ================= this IN REGULAR vs ARROW FUNCTIONS =================

const student = {
  name: "aman",
  marks: 95,

  prop: this,  
  // "this" here refers to global object (window in browser)
  // because object is created in global scope


  // ===== Regular Function =====
  getName: function () {
    console.log(this);  
    // Regular function gets its own "this" at runtime
    // "this" depends on how the function is called
    // student.getName() → this = student

    return this.name;
  },


  // ===== Arrow Function =====
  getMarks: () => {
    console.log(this);  // this will also point out to point object as its global here
    // Arrow function does NOT create its own "this"
    // It inherits "this" from surrounding (global scope here → window)/

  //depending upon where it is created


    return this.marks;  
    // undefined (because window.marks doesn't exist)
  },


  // ===== Arrow inside setTimeout =====
  getInfo1: function () {
    setTimeout(() => {
      console.log(this);  
      // Arrow inherits "this" from getInfo1
      // getInfo1 called by student → this = student
    }, 2000);
  },


  // ===== Regular function inside setTimeout =====
  getInfo2: function () {
    setTimeout(function () {
      console.log(this);  
      // Regular function called by browser
      // this = window (or undefined in strict mode)
    }, 2000);
  },
};



// ================= WINDOW OBJECT =================

// window is the global object in browsers.
// All global variables and functions become properties of window.
// In normal function calls, "this" refers to window (non-strict mode).
// It represents the browser environment (DOM, timers, alerts, etc.).



// ================= THEORY SUMMARY =================

// ===== Regular Function =====
// 1) Gets its own "this" at runtime.
// 2) "this" depends on how it is called.
// 3) Called as object method → this = object.


// ===== Arrow Function =====
// 1) Does NOT create its own "this".
// 2) Inherits "this" from outer (lexical) scope.
// 3) "this" never changes based on how it's called.


// ===== Rule of Thumb =====
// Use arrow function when you want to preserve outer this.
// Use regular function when this should depend on caller.

const nums = [1, 2, 3, 4, 5];
let maxNumber = 0; 

nums.forEach((num) => {
    if (num > maxNumber) {
        maxNumber = num; 
    }
});

console.log(maxNumber); 
