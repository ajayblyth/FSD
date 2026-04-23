📌 PART 1: COMMON CODE (with inline explanation)

🔹 Imports
const express = require('express'); // import Express (server + routing)
const mysql = require("mysql2"); // import MySQL driver
const methodOverride = require("method-override"); // allow PATCH/DELETE via forms

🔹 App Setup
const app = express(); // create Express app instance
const port = 3000; // server will run on port 3000

🔹 Middleware
app.use(express.urlencoded({ extended: true })); // parse form data → req.body (key-value object)
app.use(methodOverride("_method")); // allows ?_method=PATCH → treated as PATCH
👉 Example: <form action="/users/1?_method=PATCH" method="POST"> <!-- POST converted to PATCH -->

🔹 View Engine (EJS)
app.set("view engine", "ejs"); // use EJS templates (inside /views folder)
👉 EJS syntax: <%= value %> <!-- print value --> | <% code %> <!-- logic (loop/if) --> | <% } %> <!-- close block -->

🔹 Database Connection
const connection = mysql.createConnection({
    host: 'localhost', // DB server
    user: 'root', // username
    database: 'practice_db', // DB name
    password: 'test', // password
});
👉 Used everywhere: connection.query(...) // run SQL queries

🔹 Start Server
app.listen(port, () => { console.log(`Server is running on port ${port}`); // confirmation log });

=======================================================================================

📌 STEP 1: ROUTE → SHOW FORM (GET /users/new)

app.get("/users/new", (req, res) => { // handle GET request to show form page
    res.render("new"); // render new.ejs (form UI)
});
👉 Purpose: open form page to add user | 👉 No DB here — just UI

📌 STEP 2: new.ejs (FORM UI)

<!DOCTYPE html>
<html>
<head><title>Add User</title></head>
<body>
<h1>Add New User</h1>
<form action="/users" method="POST"> <!-- submit to POST /users -->
<input type="text" name="username" placeholder="Enter username"> <!-- name="username" → becomes req.body.username -->
<br><br>
<input type="email" name="email" placeholder="Enter email"> <!-- name="email" → becomes req.body.email -->
<br><br>
<button type="submit">Add User</button> <!-- submits form -->
</form>
</body>
</html>

🔍 Key Concepts (EJS here)
👉 No <%= %> used (no dynamic data) | 👉 Only plain HTML form

📌 STEP 3: ROUTE → INSERT DATA (POST /users)

app.post("/users", (req, res) => { // handle form submission
    let { username, email } = req.body; // extract form data
    let q = "INSERT INTO users (username, email) VALUES (?, ?)"; // SQL insert with placeholders (safe)
    connection.query(q, [username, email], (err, result) => { // bind values → replaces ? safely
        if (err) { return res.send("Error inserting user"); } // if DB error
        res.redirect("/users"); // after success → go to users list
    });
});

🔍 Line-by-Line Concepts
🔹 app.post("/users") → Handles form submission | 👉 Triggered when form is submitted
🔹 req.body → let { username, email } = req.body; → Gets data from form inputs
🔹 SQL INSERT → INSERT INTO users (username, email) VALUES (?, ?) → Adds new row into table
🔹 Values Binding → [username, email] → Safely replaces ?
🔹 Redirect → res.redirect("/users"); → After insert → go back to list page

🔁 FULL FLOW (CREATE)
User visits: /users/new → Form opens (new.ejs) → User fills: username + email → Click submit → request: POST /users → Route runs → data inserted → Redirect → /users → New user visible in list ✅

📌 Example
Before: Ajay, Raj
After adding: Ajay, Raj, Rohit  ← new user added

🔥 IMPORTANT POINTS
GET /users/new → show form | POST /users → insert data | req.body → form input | INSERT INTO → create data | res.redirect() → avoid resubmission

⚠️ Common Mistake
❌ Wrong: "INSERT INTO users VALUES ('" + username + "', '" + email + "')" → 👉 SQL injection risk ❌

🎯 One-line Interview Answer
👉 “CREATE operation is implemented using a GET route to render a form and a POST route to insert data into the database using parameterized queries.”

====================================================================================== 

📌 PART 2: ROUTE 1 / (FULL LINE-BY-LINE)

app.get("/", (req, res) => { // handle GET request on "/"
    let q = "SELECT COUNT(*) AS count FROM users"; // SQL: count total users, alias as 'count'
    connection.query(q, (err, result) => { // execute query (async)
        if (err) { res.send("Some error occurred with database"); return; } // if DB error occurs
        let count = result[0].count; // result = array → take first row → extract 'count'
        res.send(`successful ${count}`); // send response (plain text) to browser
    });
});

🔍 Deep Understanding (important points)

🔹 app.get("/") → Defines route for homepage | 👉 Triggered when browser hits: http://localhost:3000/

🔹 SQL Result Shape → [{ count: 5 }] → 👉 MySQL always returns array of rows | 👉 Even for single value

🔹 Why result[0]? → 👉 Because: result = array → first row = result[0]

🔹 Why response inside callback? → connection.query() // async
👉 Flow: query starts → Node DOES NOT wait → result comes later → callback runs → then res.send()

🔹 If outside callback ❌
let data;
connection.query(q, (err, result) => { data = result; });
res.send(data); // ❌ undefined (query not finished)

📌 Output Example → successful 5

📌 EJS involvement here? → ❌ No | 👉 Using res.send() → plain response | 👉 No template rendering
=============================================

📌 ROUTE 2: /users (GET ALL USERS)

app.get("/users", (req, res) => { // handle GET request for /users
    let q = "SELECT * FROM users"; // SQL: fetch all rows from users table
    connection.query(q, (err, result) => { // execute query (async)
        if (err) { console.log(err); res.send(err.message); return; } // if DB error
        console.log(result); // print all users (array of objects)
        res.render("users", { result }); // render users.ejs and pass data
    });
});

🔍 Key Concepts in this Route

🔹 SELECT * FROM users
👉 Fetches all users | 👉 Result format:
[
  { id: 1, username: 'Ajay', email: 'a@gmail.com' },
  { id: 2, username: 'Raj',  email: 'r@gmail.com' }
]

🔹 res.render("users", { result })
👉 Renders views/users.ejs | 👉 Sends result to EJS | 👉 Inside EJS: result → accessible directly

📌 users.ejs (FULL INLINE EXPLANATION)

<!DOCTYPE html>
<html>
<head><title>All Users</title></head>
<body>
<h1>All Users</h1>
<table border="1"> <!-- simple table -->
<thead>
<tr>
<th>UserId</th><th>Username</th><th>Email</th><th>Action</th> <!-- extra column for edit link -->
</tr>
</thead>
<tbody>
<% for (let user of result) { %> <!-- loop through each user (NO output, only logic) -->
<tr>
<td><%= user.id %></td> <!-- print user id -->
<td><%= user.username %></td> <!-- print username -->
<td><%= user.email %></td> <!-- print email -->
<td><a href="/users/<%= user.id %>/edit">Edit</a></td> <!-- dynamic link -->
</tr>
<% } %> <!-- end loop -->
</tbody>
</table>
</body>
</html>

🔍 EJS Deep Understanding

🔹 <% %> (logic) → <% for (...) { %> → 👉 Runs JavaScript | 👉 Does NOT print anything

🔹 <%= %> (output) → <%= user.username %> → 👉 Prints value into HTML

🔹 Loop Breakdown → for (let user of result) → 👉 result = array from DB | 👉 user = each object

🔹 Dynamic URL → <a href="/users/<%= user.id %>/edit"> → 👉 Generates: /users/1/edit /users/2/edit

🔥 Full Flow
Browser → /users → Query runs → fetch all users → Data passed to EJS → EJS loops through users → HTML table rendered

📌 Output (Example)
UserId Username Email Action
1 Ajay a@gmail.com Edit
2 Raj r@gmail.com Edit

🔥 Key Interview Points
res.render() → sends data to view | <% %> → logic | <%= %> → output | EJS used for dynamic HTML | Backend → DB → EJS → Browser

==============================================

📌 ROUTE 3: EDIT PAGE (SHOW FORM)

app.get("/users/:id/edit", (req, res) => { // handle GET request with dynamic id
    let { id } = req.params; // extract id from URL (/users/5/edit → id=5)

    let q = "SELECT * FROM users WHERE id = ?"; // SQL: fetch specific user using placeholder

    connection.query(q, [id], (err, result) => { // execute query, [id] replaces ? safely
    
        if (err) { return res.send("Error fetching user"); } // if DB error
        let user = result[0]; // result is array → take first row (single user)
        res.render("edit", { user }); // render edit.ejs and pass user object
    });
});

🔍 Key Concepts

🔹 :id (Route Param) → /users/3/edit → id = 3 → 👉 Dynamic value from URL

🔹 req.params → let { id } = req.params; → 👉 Extracts route parameter

🔹 ? Placeholder → WHERE id = ? → 👉 Prevents SQL injection | 👉 Values passed separately [id]

🔹 Result Shape → [{ id: 3, username: 'Ajay', email: 'a@gmail.com' }] → 👉 So we use: result[0]

📌 edit.ejs (FULL INLINE EXPLANATION)

<!DOCTYPE html>
<html>
<head><title>Edit User</title></head>
<body>
<h1>Edit User</h1>
<form action="/users/<%= user.id %>?_method=PATCH" method="POST"> <!-- dynamic URL → /users/3?_method=PATCH --> <!-- method POST + override → becomes PATCH -->
<input type="text" name="username" value="<%= user.username %>"> <!-- name="username" → goes to req.body.username --> <!-- value pre-filled with existing username -->
<br><br>
<input type="email" name="email" value="<%= user.email %>"> <!-- name="email" → req.body.email --> <!-- pre-filled email -->
<br><br>
<button type="submit">Update</button> <!-- submits form -->
</form>
</body>
</html>

🔍 EJS Concepts Here

🔹 <%= user.id %> → 👉 Injects actual id into URL

🔹 Prefilled Form → value="<%= user.username %>" → 👉 Shows existing data in input

🔹 Form Submission Flow → POST /users/3?_method=PATCH ↓ method-override converts → PATCH /users/3 ↓ handled by app.patch("/users/:id")

🔥 Full Flow
Click Edit → /users/3/edit → Route fetches user from DB → Sends data to edit.ejs → Form shows pre-filled values → User edits and submits → Goes to PATCH route

📌 Output (Example Form)
Edit User
[ Ajay ]        ← username (editable)
[ a@gmail.com ] ← email (editable)
[ Update ]

🔥 Key Interview Points
req.params → get dynamic id | ? → safe SQL (no injection) | res.render() → send data to EJS | form value= → pre-fill data | method-override → simulate PATCH

📌 ROUTE 4: UPDATE USER (PATCH /users/:id)

app.patch("/users/:id", (req, res) => { // handle PATCH request for specific user
    let { id } = req.params; // extract id from URL (/users/3 → id=3)
    let { username, email } = req.body; // extract form data (from edit.ejs)
    let q = "UPDATE users SET username = ?, email = ? WHERE id = ?"; // SQL update query with placeholders (?) for safety
    connection.query(q, [username, email, id], (err, result) => { // replace ? with actual values safely → prevents SQL injection
        if (err) { return res.send("Error updating"); } // if DB error occurs
        res.redirect("/users"); // after success → go back to users list page
    });
});

🔍 Line-by-Line Concepts

🔹 app.patch("/users/:id") → 👉 Handles update request | 👉 Triggered by form submission (via method-override)

🔹 req.params → let { id } = req.params; → 👉 Gets ID from URL

🔹 req.body → let { username, email } = req.body; → 👉 Gets form data
From edit.ejs: <input name="username"> <input name="email">

🔹 SQL Query → UPDATE users SET username = ?, email = ? WHERE id = ? → 👉 Updates user data | 👉 ? = placeholders

🔹 Values Binding → [username, email, id] → 👉 Replaces ? in order

🔹 Error Handling → if (err) return res.send("Error updating"); → 👉 Stops execution on failure

🔹 Redirect → res.redirect("/users"); → 👉 After update → go back to /users page

🔁 Full Flow (End-to-End)
/users → list page → Click Edit → /users/3/edit → Form opens (edit.ejs) → Submit form → POST /users/3?_method=PATCH → method-override → converts to: PATCH /users/3 → This route runs → DB updated → Redirect → /users

🔥 IMPORTANT CONCEPTS
req.body → form data | req.params → URL data | ? → prevents SQL injection | PATCH → partial update | res.redirect() → navigate after action

⚠️ Common Mistake
❌ Wrong: "UPDATE users SET username = '" + username + "' WHERE id = " + id → 👉 Problems: SQL injection risk 🔥 messy code

📌 Output Behavior
Before: Ajay, a@gmail.com
After update: Ajay Sharma, ajay@gmail.com

🎯 One-line Interview Answer
👉 “This PATCH route updates user data using form input, safely binds values with placeholders, and redirects after successful update.”

Now you’ve covered:
✅ All routes
✅ EJS integration
✅ Full CRUD flow (except CREATE/DELETE)

================================================================================

📌 STEP 1: DELETE BUTTON (users.ejs)

Add this inside your table row:

<td>
<form action="/users/<%= user.id %>?_method=DELETE" method="POST"> <!-- POST + ?_method=DELETE → treated as DELETE -->
<button type="submit">Delete</button> <!-- clicking sends request -->
</form>
</td>

🔍 What’s happening here
<%= user.id %> → dynamic id (e.g., /users/3) | ?_method=DELETE → method override converts POST → DELETE | method="POST" → required (HTML forms only support GET/POST)

📌 STEP 2: DELETE ROUTE (index.js)

app.delete("/users/:id", (req, res) => { // handle DELETE request
    let { id } = req.params; // extract id from URL
    let q = "DELETE FROM users WHERE id = ?"; // SQL delete query (safe placeholder)
    connection.query(q, [id], (err, result) => { // execute query with id
        if (err) { return res.send("Error deleting user"); } // if error occurs
        res.redirect("/users"); // after delete → go back to users list
    });
});

🔍 Line-by-Line Concepts

🔹 app.delete("/users/:id") → 👉 Handles delete request | 👉 Triggered via method-override

🔹 req.params → let { id } = req.params; → 👉 Gets user ID

🔹 SQL DELETE → DELETE FROM users WHERE id = ? → 👉 Removes row from DB

🔹 Value Binding → [id] → 👉 Safely replaces ?

🔹 Redirect → res.redirect("/users"); → 👉 Refresh list after delete

🔁 FULL FLOW (DELETE)
/users page shows list → Click Delete button → Form submits: POST /users/3?_method=DELETE → method-override converts: DELETE /users/3 → Route runs → DB delete → Redirect → /users → User removed from list ✅

📌 Before / After
Before: Ajay, Raj, Rohit
After deleting Raj: Ajay, Rohit

🔥 IMPORTANT POINTS
HTML form → POST only | method-override → enables DELETE | app.delete() → handles deletion | Always use ? → prevent SQL injection

⚠️ Common Mistake
❌ Using <a href="/users/1/delete"> → 👉 GET should NOT delete data

🎯 One-line Interview Answer
👉 “DELETE is implemented using a form with method-override to simulate a DELETE request, and the backend uses a parameterized query to safely remove the record.”