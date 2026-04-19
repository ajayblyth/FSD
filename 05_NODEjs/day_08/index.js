const express = require('express');
const mysql = require("mysql2"); 

const app = express();
const port = 3000; 

const methodOverride = require("method-override"); // to use PATCH/DELETE from forms

app.use(express.urlencoded({ extended: true })); // to read form data (req.body), encoded by default 
app.use(methodOverride("_method")); // enables PATCH using ?_method=PATCH

// middleware for ejs (if using templates)
app.set("view engine", "ejs"); // set ejs as template engine


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

    connection.query(q, [id], (err, result) => {
        if (err) {
            return res.send("Error fetching user"); 
        }

        let user = result[0]; // extract single user object
        res.render("edit", { user }); // send data to edit.ejs
    });
});


// UPDATE user and save changes 

app.patch("/users/:id", (req, res) => {
    let { id } = req.params; 
    let { username, email } = req.body; 

    let q = "UPDATE users SET username = ?, email = ? WHERE id = ?"; // update query using placeholder

    connection.query(q, [username, email, id], (err, result) => {
        if (err) {
            return res.send("Error updating"); 
        }

        res.redirect("/users"); 
    });
});


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