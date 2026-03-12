============================================================================================================================
FUNCTION EXPRESSIONS
============================================================================================================================

Definition: Function stored in a variable. 
- usually Anonymous, Because the variable name already acts as the function name.

const variableName = function(arg1,arg2){
    // logic
    return val;
};

const sum = function(a,b){ return a+b; };  // returns addition
sum(2,3);  // 5

Important Notes:
- Stored inside variable
- Anonymous function
- Cannot be called before definition

🚀 Why Storing in Variable Is More Powerful
1️⃣ Can Change at Runtime
let action = function() { 
    console.log("Run");
};

action = function() {
    console.log("Stop");
};

action(); // Stop

You cannot reassign a function declaration like this easily.

2️⃣ Can Create Functions Conditionally
let action;

if (true) {
    action = function() { console.log("A"); };
} else {
    action = function() { console.log("B"); };
}

You cannot declare two function action() inside blocks safely.


============================================================================================================================
HIGHER ORDER FUNCTIONS (HOF)
============================================================================================================================

Definition: Function that takes function(s) as argument OR returns a function

// Passing function as argument
function multipleGreet(func,n){
    for(let i=1;i<=n;i++){
         func();
          }
}

let greet = function(){
    console.log("hello"); 
    };

multipleGreet(greet,2);  // hello  hello


multipleGreet(function(){
     console.log("namaste");
      },3);  // namaste x3


// Returning function
function oddEvenTest(request){
    if(request=="odd"){ 
        return function(n){
             console.log(!(n%2==0)); } 
    }
    else if(request=="even"){ 
        return function(n){ console.log(n%2==0); } 
    }
    else { console.log("wrong request"); }
}

let checkOdd = oddEvenTest("odd");
checkOdd(5);   // true (odd)

let checkEven = oddEvenTest("even");
checkEven(10); // true (even)

Important Points:
- Functions can be passed or returned
- Returned function remembers outer variables (closure)


============================================================================================================================
METHODS IN JAVASCRIPT
============================================================================================================================

Definition: Function stored inside an object. Defines object actions.

const calculator = {
    add: function(a,b){ 
        return a+b; 
        },  // normal syntax
    sub(a,b){ 
        return a-b; 
        },            // shorthand syntax
    mul: function(a,b){ 
        return a*b; 
        }   // normal syntax
};

calculator.add(5,3);   // 8
calculator.sub(10,4);  // 6
calculator.mul(2,6);   // 12

// Built-in Array methods
[1,2,3];                // [1,2,3]
typeof [1,2,3];          // "object"

[1,2,3].push(4);         // 4 → new length
[1,2,3].pop();           // 3 → removed element

Important Points:
- Method = function inside object
- Access with dot notation
- Many built-in objects have methods


============================================================================================================================
THIS KEYWORD
============================================================================================================================

Definition: - "this" refers to calling object.

Its value depends on how the function is called, not where it is defined.

In an object method, this refers to that object.

In regular functions (non-strict mode), this refers to the global object (window in browser); in strict mode, it is undefined.

Arrow functions inherit this from outer/ surrounding (lexical) scope.

-- this depends on how the function is called (the caller).
const obj = {
  name: "Ajay",
  greet() { console.log(this.name); }
};

obj.greet();   // "Ajay" → called as object method, so this = obj

👉 If called as obj.greet(), this = obj.
👉 If called as normal greet(), this = global object (or undefined in strict mode).

const student = {
    name: "nithin",
    age: 23,
    eng: 95,
    math: 93,
    phy: 97,

    getAvg(){
        let avg = (this.eng + this.math + this.phy)/3;
        console.log(avg);
    }
};

student.getAvg();  // this → student object

Important Points:
- "this" refers to calling object
- Accesses object properties
- Mostly used inside object methods


============================================================================================================================
TRY & CATCH
============================================================================================================================

Definition: Handles runtime errors safely without crashing program

// Normal execution (error stops program)
console.log("hello");
console.log(a);   // ❌ error
console.log("world"); // not executed

// Using try & catch
try{
    console.log(a);  // risky code
}
catch{
    console.log("variable a doesn't exist");
}

console.log("program continues...");  // executed

Important Points:
- try → risky code
- catch → handles error
- Prevents crash
- Used in real projects for safe execution