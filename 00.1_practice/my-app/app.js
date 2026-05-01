const express = require("express");
const app = express();

const PORT = 3000;

// 🔸 Route Params
// URL: /user/ajay
app.get("/user/:name", (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name} (from params)`);
});

// 🔸 Query Params
// URL: /search?name=ajay&age=22
app.get("/search", (req, res) => {
    const name = req.query.name;
    const age = req.query.age;

    res.send(`Hello ${name}, Age: ${age} (from query)`);
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});


// 🔹 How to Test
// ✅ Route Params
// http://localhost:3000/user/ajay

// 👉 Output:

// Hello ajay (from params)
// ✅ Query Params
// http://localhost:3000/search?name=ajay&age=22

// 👉 Output:

// Hello ajay, Age: 22 (from query)
// 🔹 Key Difference
// Params → part of URL path
//         /user/ajay

// Query  → key=value pairs
//         /search?name=ajay&age=22
// 🔹 One-line memory trick

// 👉

// :req → req.params
// ?key=value → req.query