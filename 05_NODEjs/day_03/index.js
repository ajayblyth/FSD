const express = require('express');
const app = express();

const port = 3000;

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log("Received a request");
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send("Hello from GET / route");
});

app.post('/', (req, res) => {
    console.log("Request Body:", req.body);

    res.send({
        message: "Hello from POST / route",
        data: req.body
    });
});

// Path Parameter Example
app.get('/account/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}, this is your account page`);
});

// Query String Example
app.get('/search', (req, res) => {
    const name = req.query.name;
    const age = req.query.age;

    res.send({
        message: "Query received",
        name: name,
        age: age
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

/*
NOTES:
• app.use() → middleware (runs for all requests)
• Use next() to pass control to routes
• Routes handle final response
• All operations are asynchronous ✔

NODEMON:
• Avoid manual restart after changes
• Install: npm install -g nodemon
• Run: nodemon index.js
*/