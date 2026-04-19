const express = require('express');
const mysql = require("mysql2");

const app = express();
const port = 3000;

// middleware for ejs (if using templates)
app.set("view engine", "ejs");

// create database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'demo_app',
    password: 'nithin@061',
});

// start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// ---------------------- ROUTES ----------------------

// COUNT USERS
app.get("/", (req, res) => {

    let q = "SELECT COUNT(*) AS count FROM user";

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

    let q = "SELECT * FROM user";

    connection.query(q, (err, result) => {
        if (err) {
            res.status(500).send("Some error occurred");
            return;
        }

        console.log(result);

        // if using EJS frontend
        res.render("users", { result });
    });
});

// 🧠 THEORY (IMPORTANT — DO NOT SKIP)
// ❓ Why is response written inside connection.query() callback?
// ✅ Answer:

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