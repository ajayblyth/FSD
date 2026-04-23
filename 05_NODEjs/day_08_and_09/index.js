const express = require('express');
const mysql = require("mysql2"); 

const app = express();
const port = 3000; 
const path = require("path"); // to work with file paths

const methodOverride = require("method-override"); // to use PATCH/DELETE from forms

app.use(express.urlencoded({ extended: true })); // to read form data (req.body), encoded by default 
app.use(methodOverride("_method")); // enables PATCH using ?_method=PATCH

// middleware for ejs (if using templates)
app.set("view engine", "ejs"); // set ejs as template engine
app.set("views", path.join(__dirname, 'views')); // set views directory

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    database: 'practice_db', 
    password: 'test', 
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
});




app.get("/", (req, res) => {

    let q = "SELECT COUNT(*) AS count FROM users"; 

    connection.query(q, (err, result) => {
        if (err) {
            res.send("Some error occurred with database"); 
            return;
        }

        let count = result[0].count; 
        res.send(`successful ${count}`); 
    });
});


// GET ALL USERS
app.get("/users", (req, res) => {

    let q = "SELECT * FROM users"; 

    connection.query(q, (err, result) => {
        if (err) {
            console.log(err); 
            res.send(err.message); 
            return;
        }

        console.log(result); 

        res.render("users", { result }); 
    });
});


// EDIT PAGE (SHOW FORM)
app.get("/users/:id/edit", (req, res) => {
    let { id } = req.params;

    let q = "SELECT * FROM users WHERE id = ?";

    try {
        connection.query(q, [id], (err, result) => {
            if (err) {
                return res.send("Error fetching user");
            } else {
                let user = result[0]; // extract single user object
                res.render("edit.ejs", { user }); // send data to edit.ejs
            }
        });
    } catch (err) {
        res.send("some error occurred in api execution");
    }
});

// ⚠️ Important (you should know this)

// Your try-catch here is almost useless.

// 👉 Why?

// connection.query() is asynchronous, try-catch only catches synchronous errors
// DB errors will always go to err inside callback


// UPDATE user and save changes 

const util = require("util");

// convert callback-based query → promise-based
const query = util.promisify(connection.query).bind(connection);

app.patch("/users/:id", async (req, res) => {
    let { id } = req.params;
    let { user_changes } = req.body;

    try {
        // 1. get user
        let users = await query('SELECT * FROM users WHERE id = ?', [id]);
        let user = users[0];

        // 2. check password
        if (user_changes.password !== user.password) {
            return res.send("Incorrect password, cannot update");
        }

        // 3. update user (safe query)
        await query(
            'UPDATE users SET username = ? WHERE id = ?',
            [user_changes.username, id]
        );

        res.send("User updated successfully");

    } catch (err) {
        res.send("Error updating user");
    }
});

// explanation of async/await version:

// 1. Convert to Promise
// const query = util.promisify(connection.query).bind(connection);

// Old → callback-based
// New → returns Promise → can use await


// 2. Async Route
// app.patch(..., async (req, res) => {

// Allows use of await inside


// 3. Fetch User
// let users = await query('SELECT ...', [id]);

// Waits for DB result
// No callback needed


// 4. Password Check
// if (user_changes.password !== user.password)

// Same logic, cleaner flow


// 5. Update Query
// await query('UPDATE users SET username = ? WHERE id = ?', [...]);

// Safe (prevents SQL injection)
// Waits until update completes


// 6. Error Handling
// try { ... } catch (err) { ... }

// Replaces multiple if(err) checks


// WHY THIS IS BETTER
// ------------------

// Before:
// - Nested callbacks
// - Hard to read
// - Messy error handling

// After:
// - Flat structure
// - Easy to read
// - Single try-catch

//callback hell version (bad code, avoid this)

// app.patch("/users/:id", (req, res) => {
//     let { id } = req.params; 
//     let { user_changes } = req.body; 

//     let q = 'SELECT * FROM users WHERE id = ?'; 

//     try {
//         connection.query(q, [id], (err, result) => {
//             if (err) {
//                 return res.send("Error updating"); 
//             } else {
//                 let user = result[0]; 

//                 if (user_changes.password !== user.password) {
//                     return res.send("Incorrect password, cannot update");
//                 } else {
//                     let update_q = `UPDATE users SET username = '${user_changes.username}' WHERE id = '${id}'`;

//                     connection.query(update_q, (err, result) => {   
//                         if (err) {
//                             return res.send("Error updating user");
//                         } else {
//                             res.send("User updated successfully");  
//                             res.redirect("/users");
//                         }
//                     });
//                 }
//             }
//         });
//     } catch (err) {
//         res.send("some error occurred in api execution");
//     }
// });

//assignment callbaack hell is generted above in patch, fix with promises or async/ await
// first change commonjs to mudule in types of package.json, then we can use import ....and only use import or equire, not both at once

// ⚡ Why we use ? (IMPORTANT)
// ❌ Without ? (bad way)
// let q = "UPDATE users SET username = '" + username + "' WHERE id = " + id;

// Problems:

// SQL injection risk 🔥
// messy code
// hard to maintain


//  THEORY (IMPORTANT)
// Why is response written inside connection.query() callback?
// 

// Because connection.query() is asynchronous (non-blocking).

// 🔹 Execution Flow:
// app.get() executes
// SQL query starts
// Node.js does NOT wait (non-blocking behavior)
// Query runs in background
// Result comes later
// Callback function executes
// Response is sent
// ❌ Wrong approach (outside callback):
// let result;

// connection.query(q, (err, data) => {
//     result = data;
// });

// res.send(result);  // ❌ runs before query completes

// 👉 Problem:

// result = undefined
// DB not finished yet
// ✅ Correct approach (inside callback):
// connection.query(q, (err, result) => {

//     if (err) {
//         res.send("Error occurred");
//     } else {
//         res.send(result);
//     }
// });
// 🍔 Simple Analogy:
// You order food 🍔
// Kitchen takes time 👨‍🍳
// Waiter gives food only when ready
// You cannot eat before cooking finishes
// 🎯 One-line Interview Answer:

// “Response is inside callback because MySQL queries are asynchronous and results are only available after execution completes.”