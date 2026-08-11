till get all users and post using axios

---------------------------------------------
```txt
==============================================================================
FOLDER STRUCTURE
==============================================================================

project/
│
├── node_modules/
│
├── public/
│     ├── style.css
│     └── script.js
│
├── views/
│     └── index.ejs
│
├── server.js
│
├── package.json
│
└── package-lock.json


==============================================================================
WHAT EACH FILE DOES
==============================================================================

server.js
→ backend APIs + server

views/index.ejs
→ frontend UI page

public/style.css
→ styling

public/script.js
→ frontend JavaScript + Axios


==============================================================================
STEP 1 → INSTALL PACKAGES
==============================================================================

npm init -y

npm install express mongoose uuid validator ejs


==============================================================================
STEP 2 → CONFIGURE EJS + STATIC FOLDER
==============================================================================

Inside server.js

------------------------------------------------------------------------------

const express = require("express");
const app = express();
const PORT = 3000;

const path = require("path");

app.use(express.json());


// EJS setup
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));


// Static folder setup
app.use(express.static(path.join(__dirname, "public")));

------------------------------------------------------------------------------


==============================================================================
WHAT THIS MEANS
==============================================================================

1.

app.set("view engine", "ejs");

Means:

We will use EJS templates


2.

app.set("views", path.join(__dirname, "views"));

Means:

All EJS files are inside views folder


3.

app.use(express.static(path.join(__dirname, "public")));

Means:

Frontend can access:

style.css
script.js
images


==============================================================================
STEP 3 → CREATE FRONTEND ROUTE
==============================================================================

Inside server.js

------------------------------------------------------------------------------

app.get("/", (req, res) => {

    res.render("index");

});

------------------------------------------------------------------------------

Meaning

When browser opens "/"

Render views/index.ejs


==============================================================================
STEP 4 → CREATE index.ejs
==============================================================================

Inside:

views/index.ejs


Add:

------------------------------------------------------------------------------

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>User Management</title>

    <link rel="stylesheet" href="/style.css">

</head>

<body>

    <h1>User Management System</h1>


    <!-- FORM -->

    <form id="userForm">

        <input
            type="text"
            id="name"
            placeholder="Enter Name"
        >

        <input
            type="email"
            id="email"
            placeholder="Enter Email"
        >

        <input
            type="number"
            id="age"
            placeholder="Enter Age"
        >

        <button type="submit">
            Add User
        </button>

    </form>



    <!-- TABLE -->

    <table border="1">

        <thead>

            <tr>

                <th>Name</th>
                <th>Email</th>
                <th>Age</th>

            </tr>

        </thead>

        <tbody id="userTableBody">

        </tbody>

    </table>



    <!-- Axios CDN -->

    <script src=
"https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js">
    </script>


    <!-- Frontend JS -->

    <script src="/script.js"></script>

</body>
</html>

------------------------------------------------------------------------------


==============================================================================
WHAT HAPPENED HERE
==============================================================================

Form

<form id="userForm">

Used for adding users.


Table Body

<tbody id="userTableBody">

JavaScript will dynamically insert users here.


Axios CDN

<script src=
"https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js">
</script>

Makes axios available in browser.


script.js

Frontend logic file.


==============================================================================
STEP 5 → CREATE script.js
==============================================================================

Inside:

public/script.js


Add:

------------------------------------------------------------------------------

const form = document.getElementById("userForm");

const tableBody =
document.getElementById("userTableBody");



// FETCH ALL USERS

const fetchUsers = async () => {

    try {

        const response = await axios.get("/users");

        const users = response.data;

        tableBody.innerHTML = "";



        users.forEach((user) => {

            tableBody.innerHTML += `

                <tr>

                    <td>${user.name}</td>

                    <td>${user.email}</td>

                    <td>${user.age}</td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

};




// CREATE USER

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const userData = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        age: document.getElementById("age").value

    };



    try {

        await axios.post("/users", userData);

        form.reset();

        fetchUsers();

    }

    catch (error) {

        console.log(error);

    }

});




// INITIAL FETCH

fetchUsers();

------------------------------------------------------------------------------


==============================================================================
UNDERSTAND FLOW CAREFULLY
==============================================================================

1. Page Opens

fetchUsers();

Runs automatically.


2. Axios GET Request

axios.get("/users")

Hits backend:

app.get("/users")


3. Backend Sends Users

res.json(users);


4. Frontend Receives Users

const users = response.data;


5. Loop Runs

users.forEach()


6. Table Rows Generated

tableBody.innerHTML +=

Dynamically inserts HTML.


==============================================================================
POST FLOW
==============================================================================

User submits form

form.addEventListener("submit")


Prevent page reload

e.preventDefault();

VERY IMPORTANT.

Otherwise form refreshes page.


Collect form data

const userData = {

    name,
    email,
    age

}


Send POST request

axios.post("/users", userData)


Backend receives:

req.body


Save in MongoDB

await newUser.save()


Refresh table

fetchUsers();

New user appears instantly.


==============================================================================
STEP 6 → style.css
==============================================================================

Inside:

public/style.css


Add:

------------------------------------------------------------------------------

body {

    font-family: Arial;

    padding: 20px;

}

form {

    margin-bottom: 20px;

}

input {

    padding: 8px;

    margin-right: 10px;

}

button {

    padding: 8px 15px;

    cursor: pointer;

}

table {

    width: 100%;

    border-collapse: collapse;

}

th,
td {

    padding: 10px;

    text-align: center;

}

------------------------------------------------------------------------------


==============================================================================
FINAL FLOW
==============================================================================

Open localhost:3000
        ↓
index.ejs renders
        ↓
fetchUsers()
        ↓
GET /users
        ↓
Table populated
        ↓
Fill form
        ↓
POST /users
        ↓
MongoDB updated
        ↓
fetchUsers()
        ↓
Updated table shown
