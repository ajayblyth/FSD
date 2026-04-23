

==================== PROMISE (JavaScript) ====================

🔹 1. WHAT IS A PROMISE?
------------------------------------------------------------
A Promise is an object that represents the future result of an
asynchronous operation.

👉 “I promise I will give result later”


------------------------------------------------------------
🔹 2. STATES OF PROMISE
------------------------------------------------------------
A Promise has 3 states:

- Pending   → operation still running
- Fulfilled → success (resolved)
- Rejected  → error


============================================================
🔹 3. BASIC SYNTAX
============================================================

let promise = new Promise((resolve, reject) => {
    // async work
    let success = true;

    if (success) {
        resolve("Task done");
    } else {
        reject("Error occurred");
    }
});


------------------------------------------------------------
🔹 4. CONSUMING PROMISE
------------------------------------------------------------

promise
    .then((result) => {
        console.log(result);   // success
    })
    .catch((error) => {
        console.log(error);    // failure
    });


============================================================
🔹 5. SIMPLE EXAMPLE
============================================================

function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data received");
        }, 2000);
    });
}

getData()
    .then((data) => console.log(data))
    .catch((err) => console.log(err));


------------------------------------------------------------
🔹 OUTPUT
------------------------------------------------------------
Data received


============================================================
🔹 6. WHY PROMISES > CALLBACKS
============================================================

❌ Callback Hell:

doA(() => {
    doB(() => {
        doC(() => {
            // messy structure
        });
    });
});


✅ Promises:

doA()
  .then(() => doB())
  .then(() => doC())
  .catch(err => console.log(err));


✔ Cleaner
✔ More readable
✔ Centralized error handling


============================================================
🔹 7. IMPORTANT METHODS
============================================================

.then()    → success
.catch()   → error
.finally() → always runs


promise
  .then(res => console.log(res))
  .catch(err => console.log(err))
  .finally(() => console.log("Done"));


============================================================
🔹 8. KEY INTERVIEW CONCEPT
============================================================

👉 .then() always returns a new Promise

doSomething()
  .then(res => {
      return res + 1;
  })
  .then(newRes => {
      console.log(newRes);
  });


============================================================
==================== ASYNC / AWAIT ==========================
============================================================


🔹 1. CORE IDEA
------------------------------------------------------------
async/await is a cleaner way to handle promises.

👉 Makes async code look synchronous (top → bottom flow)


------------------------------------------------------------
🔹 2. async KEYWORD
------------------------------------------------------------

async function test() {
    return "Hello";
}

👉 Same as:

function test() {
    return Promise.resolve("Hello");
}


------------------------------------------------------------
🔹 3. await KEYWORD
------------------------------------------------------------

- Waits for promise to resolve
- Only works inside async function

async function getData() {
    let result = await Promise.resolve("Data");
    console.log(result);
}


============================================================
🔹 4. PROMISE vs ASYNC/AWAIT
============================================================

❌ PROMISE CHAIN:

getData()
  .then(res => processData(res))
  .then(final => console.log(final))
  .catch(err => console.log(err));


✅ ASYNC/AWAIT:

async function handle() {
    try {
        let res = await getData();
        let final = await processData(res);
        console.log(final);
    } catch (err) {
        console.log(err);
    }
}


✔ Same logic, much cleaner


============================================================
🔹 5. REAL EXAMPLE
============================================================

function fetchUser() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("User Data"), 2000);
    });
}

async function main() {
    console.log("Start");

    let data = await fetchUser();   // waits here
    console.log(data);

    console.log("End");
}

main();


OUTPUT:
Start
(User waits 2 sec)
User Data
End


============================================================
🔹 6. ERROR HANDLING
============================================================

async function test() {
    try {
        let res = await Promise.reject("Error!");
    } catch (err) {
        console.log(err);
    }
}


============================================================
🔹 7. IMPORTANT RULES
============================================================

✔ await only pauses inside async function
✔ async always returns a Promise
✔ await works only with Promises
✔ Better than .then() chaining


============================================================
🔹 8. COMMON MISTAKE
============================================================

❌ Sequential (slow):

let a = await task1();
let b = await task2();


✔ Parallel (fast):

let [a, b] = await Promise.all([task1(), task2()]);


============================================================
🔹 9. MENTAL MODEL
============================================================

Promise   → “I’ll give result later”
Async/Await → “Wait here until result comes”


============================================================
==================== REAL CALLBACK TO PROMISE EXAMPLE =======
============================================================

DO THESE CHORES IN ORDER:

1. WALK DOG
2. CLEAN KITCHEN
3. TAKE OUT TRASH


------------------------------------------------------------
🔹 CALLBACK VERSION (MESSY)
------------------------------------------------------------

function walkDog(callback) {
    setTimeout(() => {
        console.log("You walk the dog");
        callback();
    }, 1500);
}

function cleanKitchen(callback) {
    setTimeout(() => {
        console.log("You clean the kitchen");
        callback();
    }, 2500);
}

function takeOutTrash(callback) {
    setTimeout(() => {
        console.log("You take out the trash");
        callback();
    }, 500);
}

walkDog(() => {
    cleanKitchen(() => {
        takeOutTrash(() => {
            console.log("All chores done");
        });
    });
});


------------------------------------------------------------
🔹 PROMISE VERSION (CLEAN)
------------------------------------------------------------

function walkDog() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("You walk the dog");
        }, 1500);
    });
}

function cleanKitchen() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("You clean the kitchen");
        }, 2500);
    });
}

function takeOutTrash() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("You take out the trash");
        }, 500);
    });
}

walkDog()
    .then(value => {
        console.log(value);
        return cleanKitchen();
    })
    .then(value => {
        console.log(value);
        return takeOutTrash();
    })
    .then(value => {
        console.log(value);
        console.log("You finished all tasks");
    })
    .catch(error => console.error(error));

    ============================================================================================

    ==================== ASYNC / AWAIT (JavaScript) ====================


🔹 1. WHAT IS ASYNC / AWAIT?
------------------------------------------------------------
async/await is a modern way to handle Promises in a cleaner,
more readable way.

👉 It makes asynchronous code look like synchronous code (top → bottom flow)


------------------------------------------------------------
🔹 2. WHY ASYNC / AWAIT WAS INTRODUCED
------------------------------------------------------------

Problems with Promises:
✔ .then() chaining can still become long
✔ Harder to read for complex flows

Solution:
👉 async/await makes code more linear and readable


============================================================
🔹 3. CORE IDEA
============================================================

Promise:
👉 “I will give result later”

Async/Await:
👉 “Wait here until result comes, then continue”


============================================================
🔹 4. async KEYWORD
============================================================

✔ async makes a function always return a Promise

Example:

async function test() {
    return "Hello";
}


👉 Internally same as:

function test() {
    return Promise.resolve("Hello");
}


------------------------------------------------------------
🔹 IMPORTANT RULE
------------------------------------------------------------
✔ Every async function returns a Promise automatically


============================================================
🔹 5. await KEYWORD
============================================================

✔ await pauses execution until Promise resolves
✔ Only works inside async function

Example:

async function demo() {
    let result = await Promise.resolve("Data received");
    console.log(result);
}


👉 It waits for Promise to complete before moving forward


============================================================
🔹 6. PROMISE vs ASYNC/AWAIT (REAL COMPARISON)
============================================================


------------------------------------------------------------
❌ USING PROMISES (.then)
------------------------------------------------------------

function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("User Data");
        }, 2000);
    });
}

getData()
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });


------------------------------------------------------------
✔ USING ASYNC / AWAIT
------------------------------------------------------------

function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("User Data");
        }, 2000);
    });
}

async function handleData() {
    try {
        let data = await getData();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

handleData();


------------------------------------------------------------
🔹 RESULT
------------------------------------------------------------

Both output:
User Data

👉 BUT async/await is cleaner and easier to read


============================================================
🔹 7. WHY ASYNC/AWAIT IS BETTER
============================================================

✔ No .then() chaining
✔ Code looks synchronous
✔ Easier debugging
✔ Better readability
✔ Cleaner error handling using try/catch


============================================================
🔹 8. REAL FLOW EXAMPLE
============================================================

function fetchUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("User Data");
        }, 2000);
    });
}

async function main() {
    console.log("Start");

    let data = await fetchUser();   // waits here
    console.log(data);

    console.log("End");
}

main();


------------------------------------------------------------
🔹 OUTPUT
------------------------------------------------------------

Start
(User waits 2 seconds)
User Data
End


============================================================
🔹 9. ERROR HANDLING (IMPORTANT)
============================================================

✔ Use try...catch instead of .catch()

Example:

async function test() {
    try {
        let result = await Promise.reject("Error occurred");
    } catch (err) {
        console.log(err);
    }
}


============================================================
🔹 10. COMMON MISTAKE
============================================================

❌ WRONG (sequential slow execution):

let a = await task1();
let b = await task2();


✔ CORRECT (parallel execution):

let [a, b] = await Promise.all([task1(), task2()]);


👉 Parallel is faster when tasks are independent


============================================================
🔹 11. MENTAL MODEL
============================================================

Promise   → “I will give result later”

Async/Await → “Wait here until result comes, then continue”


============================================================
🔹 12. KEY INSIGHT
============================================================

✔ async = makes function return Promise
✔ await = pauses execution until Promise resolves
✔ Only pauses inside function, not whole program


============================================================
🔹 13. FINAL SUMMARY
============================================================

✔ async/await is built on Promises
✔ Makes async code look synchronous
✔ Removes .then() chaining complexity
✔ Uses try/catch for error handling
✔ Improves readability and structure