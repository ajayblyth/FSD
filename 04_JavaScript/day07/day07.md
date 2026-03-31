============================================================================================================================
INFINITE LOOP – FOR LOOP (JavaScript)
============================================================================================================================

Definition: A loop that never stops because condition always remains TRUE.

Basic Structure (Compact View)
--------------------------------------------------------------------------------------------------------------
Syntax                                   | Example
--------------------------------------------------------------------------------------------------------------
for(init; condition; update){ }          | for (let i=0; i<5; i++){ console.log(i); }

Common Causes
--------------------------------------------------------------------------------------------------------------
Cause                    | Example                                                | Reason
--------------------------------------------------------------------------------------------------------------
Missing update           | for (let i=0; i<5; ){ console.log(i); }              | i never changes
Wrong condition          | for (let i=0; i>=0; i++){ console.log(i); }          | condition never false
Wrong variable update    | for (let i=0; i<5; j++){ console.log(i); }           | i never increments

Prevention:
✔ Ensure correct update    ✔ Check condition carefully    ✔ Debug with console.log()

Rule: If condition never becomes FALSE → infinite loop

============================================================================================================================
NESTED FOR LOOP – JavaScript
============================================================================================================================

Definition: A for loop inside another for loop.

Purpose: Patterns | 2D arrays | Rows & columns | Combinations

Basic Structure 
--------------------------------------------------------------------------------------------------------------
Syntax
--------------------------------------------------------------------------------------------------------------
for (let i=0; i<rows; i++){
    for (let j=0; j<cols; j++){
        // code
    }
}

Concept Summary
--------------------------------------------------------------------------------------------------------------
Outer loop → rows        Inner loop → columns        Total executions = rows × columns
If both run n times → Time Complexity = O(n²)

Example
--------------------------------------------------------------------------------------------------------------
for (let i=1; i<=3; i++){
    for (let j=1; j<=2; j++){
        console.log(i,j);
    }
}

Output:
1 1   
1 2   
2 1   
2 2   
3 1   
3 2

Key Rule: For each outer iteration, inner loop runs completely.


============================================================================================================================
WHILE LOOP
============================================================================================================================

Definition: Runs as long as condition is TRUE.

Structure (Compact)
--------------------------------------------------------------------------------------------------------------
Syntax                                   | Example
--------------------------------------------------------------------------------------------------------------
initialise;                              | let i=1;
while(condition){                        | while(i<=5){
    // code                              |   console.log(i);
    update;                              |   i++;
}                                        | }

Output: 1 
2 
3
4 
5

Core Logic:
Check condition → Execute → Update → Repeat → Stop when FALSE

Important Rule: Always update variable → else infinite loop

Infinite Example:
let i=1;
while(i<=5){ console.log(i); }   // i never changes

Use When:
✔ Iterations unknown    ✔ User input based    ✔ Dynamic condition

Difference:  for → known iterations     while → condition-based


============================================================================================================================
PRACTICE – GUESS MOVIE
============================================================================================================================

const favMovie = "avatar";
let guess = prompt("guess my favorite movie");

while ((guess !== favMovie) && (guess !== "quit")) {
    guess = prompt("wrong guess. please try again");
}

if (guess === favMovie) {
    console.log("congrats!!");
}

Logic Summary:
Target="avatar" → Keep asking until correct OR "quit" → If correct → success


WHAT IS prompt() ?
--------------------------------------------------------------------------------------------------------------
Feature                    | Description
--------------------------------------------------------------------------------------------------------------
Type                       | Built-in browser function
Purpose                    | Shows popup for user input
Return type                | Always STRING
Cancel pressed             | Returns null
Environment                | Works only in browser


============================================================================================================================
BREAK KEYWORD
============================================================================================================================

Definition: Stops loop immediately even if condition is true.

--------------------------------------------------------------------------------------------------------------
Syntax                                   | Example
--------------------------------------------------------------------------------------------------------------
break;                                   | for(let i=0;i<10;i++){
                                         |   if(i===3){ break; }
                                         | }

Use break when goal is achieved early.


============================================================================================================================
LOOPS WITH ARRAYS
============================================================================================================================

let fruits=["mango","apple","banana","litchi","orange"];

--------------------------------------------------------------------------------------------------------------
Type            | Syntax
--------------------------------------------------------------------------------------------------------------
Forward         | for(let i=0; i<fruits.length; i++)
                  { console.log(i,fruits[i]); 
                  }
Backward        | for(let i=fruits.length-1; i>=0 ;i--)
                  { console.log(i,fruits[i]); 
                  }


============================================================================================================================
NESTED LOOPS WITH NESTED ARRAYS
============================================================================================================================

let heroes=[
 ["ironman","spiderman","thor"],
 ["superman","wonder woman","flash"]
];

for(let i=0;i<heroes.length;i++){
    for(let j=0;j<heroes[i].length;j++){
        console.log(heroes[i][j]);
    }
}


============================================================================================================================
FOR...OF LOOP
============================================================================================================================

Definition: Iterates over iterable objects and gives VALUES directly.

--------------------------------------------------------------------------------------------------------------
Syntax                                   | Example
--------------------------------------------------------------------------------------------------------------
for(element of collection){ }            | for(let fruit of fruits){ console.log(fruit); }

Important:
for...of → gives VALUES
Does NOT give index

If index needed → use normal for loop

Example – String:
for(let ch of "Ajay"){ console.log(ch); }

Nested for...of:
for(let list of heroes){
    for(let hero of list){
        console.log(hero);
    }
}

Key Rule:
for...of works only with iterable objects (Arrays, Strings, Maps, Sets)
Does NOT work directly on normal objects


============================================================================================================================
FOR...IN LOOP
============================================================================================================================

Definition: Iterates over KEYS (property names / indexes).

Works with:
✔ Objects
✔ Arrays (but gives index, not value)

--------------------------------------------------------------------------------------------------------------
Syntax                                   | Example
--------------------------------------------------------------------------------------------------------------
for(key in object){ }                    | for(let key in obj){ console.log(key); }

Example – Object:
let obj = {name:"Ajay", age:25};

for(let key in obj){
    console.log(key);        // name, age
    console.log(obj[key]);   // Ajay, 25
}

Example – Array:
let fruits=["mango","apple","banana"];

for(let i in fruits){
    console.log(i);          // 0,1,2
    console.log(fruits[i]);  // mango, apple, banana
}

Important:
for...in → gives index (arrays) or keys (objects)
for...of → gives values


============================================================================================================================
DIFFERENCE: for...in vs for...of
============================================================================================================================

--------------------------------------------------------------------------------------------------------------
Feature            | for...in                          | for...of
--------------------------------------------------------------------------------------------------------------
Returns            | Keys / Index                      | Values
Works on           | Objects & Arrays                  | Iterable objects only
Use case           | When keys are needed              | When values are needed
Array output       | 0,1,2...                          | "mango","apple"...

Interview Line:
for...in → index/keys
for...of → values

============================================================================================================================