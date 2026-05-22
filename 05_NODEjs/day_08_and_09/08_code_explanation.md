=============================================================================
EXPRESS + MYSQL + EJS (FULL CRUD FLOW - STRUCTURED NOTES)
=============================================================================

======================== PART 1: COMMON SETUP ========================

📌 IMPORTS
---------------------------------------------------------------------
const express = require('express');          // Express → server + routing
const mysql = require("mysql2");             // MySQL driver → DB connection
const methodOverride = require("method-override"); // enable PATCH/DELETE via forms


📌 APP SETUP
---------------------------------------------------------------------
const app = express();   // create Express app
const port = 3000;       // server runs on port 3000


📌 MIDDLEWARE
---------------------------------------------------------------------
app.use(express.urlencoded({ extended: true }));
// Parses form data → converts to req.body object

app.use(methodOverride("_method"));
// Converts ?_method=PATCH / DELETE → actual HTTP method

👉 Example:
<form action="/users/1?_method=PATCH" method="POST">
POST → converted to PATCH


📌 VIEW ENGINE (EJS)
---------------------------------------------------------------------
app.set("view engine", "ejs");
// Uses EJS templates inside /views folder

👉 EJS syntax:
<%= value %> → print value
<% code %>   → logic (loop/if)
<% } %>      → close block

-------------------------------------------
Note: app.set vs express.static
app.set()
set(key, value)

Like:

app.set("view engine", "ejs")

express.static()
static(folderPath)

Because it is middleware function.

Real meaning
path.join(__dirname, "views")
📌 DATABASE CONNECTION
---------------------------------------------------------------------
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'practice_db',
    password: 'test',
});

👉 Used as:
connection.query(...) → execute SQL queries


📌 START SERVER
---------------------------------------------------------------------
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


=============================================================================
PART 2: CREATE OPERATION (ADD USER)
=============================================================================

📌 STEP 1: SHOW FORM (GET /users/new)
---------------------------------------------------------------------
app.get("/users/new", (req, res) => {
    res.render("new"); // render form UI
});

👉 Only UI (no DB interaction)


📌 STEP 2: FORM (new.ejs)
---------------------------------------------------------------------
<form action="/users" method="POST">
    <input type="text" name="username">
    <input type="email" name="email">
    <button type="submit">Add User</button>
</form>

👉 name="username" → becomes req.body.username


📌 STEP 3: INSERT DATA (POST /users)
---------------------------------------------------------------------
app.post("/users", (req, res) => {
    let { username, email } = req.body;

    let q = "INSERT INTO users (username, email) VALUES (?, ?)";

    connection.query(q, [username, email], (err, result) => {
        if (err) return res.send("Error inserting user");

        res.redirect("/users");
    });
});


🔁 FULL FLOW (CREATE)
---------------------------------------------------------------------
/users/new → form → submit → POST /users → DB insert → redirect → /users


🔥 IMPORTANT
---------------------------------------------------------------------
- req.body → form data
- placeholders (?) → prevent SQL injection
- res.redirect() → avoids resubmission


=============================================================================
PART 3: READ OPERATIONS
=============================================================================

📌 ROUTE 1: COUNT USERS (/)
---------------------------------------------------------------------
app.get("/", (req, res) => {
    let q = "SELECT COUNT(*) AS count FROM users";

    connection.query(q, (err, result) => {
        if (err) return res.send("DB error");

        let count = result[0].count;
        res.send(`successful ${count}`);
    });
});

👉 result format: [{ count: 5 }]


📌 ROUTE 2: GET ALL USERS (/users)
---------------------------------------------------------------------
app.get("/users", (req, res) => {
    let q = "SELECT * FROM users";

    connection.query(q, (err, result) => {
        if (err) return res.send(err.message);

        res.render("users", { result });
    });
});


📌 users.ejs
---------------------------------------------------------------------
<% for (let user of result) { %>
<tr>
<td><%= user.id %></td>
<td><%= user.username %></td>
<td><%= user.email %></td>
<td><a href="/users/<%= user.id %>/edit">Edit</a></td>
</tr>
<% } %>

👉 <% %> → logic
👉 <%= %> → output


=============================================================================
PART 4: UPDATE OPERATION
=============================================================================

📌 STEP 1: EDIT PAGE (GET /users/:id/edit)
---------------------------------------------------------------------
app.get("/users/:id/edit", (req, res) => {
    let { id } = req.params;

    let q = "SELECT * FROM users WHERE id = ?";

    connection.query(q, [id], (err, result) => {
        if (err) return res.send("Error");

        let user = result[0];
        res.render("edit", { user });
    });
});


📌 STEP 2: edit.ejs
---------------------------------------------------------------------
<form action="/users/<%= user.id %>?_method=PATCH" method="POST">
    <input name="username" value="<%= user.username %>">
    <input name="email" value="<%= user.email %>">
    <button>Update</button>
</form>


📌 STEP 3: UPDATE ROUTE (PATCH)
---------------------------------------------------------------------
app.patch("/users/:id", (req, res) => {
    let { id } = req.params;
    let { username, email } = req.body;

    let q = "UPDATE users SET username = ?, email = ? WHERE id = ?";

    connection.query(q, [username, email, id], (err) => {
        if (err) return res.send("Error updating");

        res.redirect("/users");
    });
});


🔁 FLOW
---------------------------------------------------------------------
/users → edit → form → PATCH → DB update → redirect


=============================================================================
PART 5: DELETE OPERATION
=============================================================================

📌 STEP 1: DELETE BUTTON (users.ejs)
---------------------------------------------------------------------
<form action="/users/<%= user.id %>?_method=DELETE" method="POST">
    <button>Delete</button>
</form>


📌 STEP 2: DELETE ROUTE
---------------------------------------------------------------------
app.delete("/users/:id", (req, res) => {
    let { id } = req.params;

    let q = "DELETE FROM users WHERE id = ?";

    connection.query(q, [id], (err) => {
        if (err) return res.send("Error deleting");

        res.redirect("/users");
    });
});


🔁 FLOW (DELETE)
---------------------------------------------------------------------
Click delete → POST + _method=DELETE → converted → DELETE route
→ DB delete → redirect → updated list


=============================================================================
KEY CONCEPTS (INTERVIEW)
=============================================================================

- req.body → form data
- req.params → URL params
- ? (placeholders) → prevent SQL injection
- res.render() → send data to EJS
- res.redirect() → navigation after action
- method-override → simulate PATCH/DELETE


=============================================================================
COMMON MISTAKES
=============================================================================

❌ Using GET for delete/update
❌ Not using placeholders → SQL injection risk
❌ Forgetting middleware setup
❌ Not handling async properly


=============================================================================
ONE-LINE INTERVIEW SUMMARY
=============================================================================

“This project implements full CRUD using Express, MySQL, and EJS,
where data flows from form → backend → database → back to UI using
safe queries and RESTful routing.”
=============================================================================