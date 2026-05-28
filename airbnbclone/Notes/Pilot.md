==============================================================
1. OVERALL ARCHITECTURE
==============================================================
Browser
   ↓
Express Server (app.js)
   ↓
Routes
   ↓
Mongoose
   ↓
MongoDB Database
   ↓
Data comes back
   ↓
EJS renders HTML
   ↓
Browser shows page

==============================================================
2. MAIN TECHNOLOGIES USED
==============================================================

+----------------------+----------------------------------+
| Technology           | Why Used                         |
+----------------------+----------------------------------+
| Node.js              | Runs JS on server                |
| Express              | Backend framework                |
| MongoDB              | Database                         |
| Mongoose             | Connects Node + MongoDB          |
| EJS                  | Dynamic HTML templating          |
| method-override      | Allows PUT/DELETE from forms     |
| express.urlencoded() | Reads form data                  |
| express.static()     | Serves CSS/images                |
| path                 | Safe folder paths                |
+----------------------+----------------------------------+


==============================================================
3. STARTING OF app.js
==============================================================

const express = require("express");

- Imports Express framework.
- Express helps create:
  • server
  • routes
  • middleware
  • APIs
--------------------------------------------------------------
const mongoose = require("mongoose");

- Mongoose connects:

  Node.js ↔ MongoDB

- Without mongoose:
  DB operations become harder

- Mongoose provides:
  • schemas
  • validation
  • model methods


--------------------------------------------------------------

const Listing = require("./models/listings.js");

- Imports Listing model.
- Represents MongoDB "listings" collection.

Example document:

{
   title: "Villa",
   price: 5000
}


--------------------------------------------------------------

const path = require("path");

- Used for safe folder paths.

Example:

path.join(__dirname, "views")

- Creates OS-independent paths.


--------------------------------------------------------------

const methodOverride = require("method-override");

HTML forms support only:
  • GET
  • POST

REST APIs use:
  • PUT
  • PATCH
  • DELETE

method-override helps fake these methods.

Example:

<form method="POST"
      action="/listings/1?_method=DELETE">

Express converts POST → DELETE.


==============================================================
4. CREATING EXPRESS APP
==============================================================

const app = express();

- Creates Express application object.
- app controls:
  • routes
  • middleware
  • server


--------------------------------------------------------------

const port = 3000;

- Server runs on port 3000.

Access using:

http://localhost:3000


==============================================================
5. VIEW ENGINE SETUP
==============================================================

app.set("view engine", "ejs");

- Tells Express:
  "Render EJS files"

Without this:
res.render()
will not work.


--------------------------------------------------------------

app.set("views", path.join(__dirname, "views"));

- Tells Express where EJS files exist.

Folder structure:

views/
   index.ejs
   show.ejs
   new.ejs


==============================================================
6. MIDDLEWARE
==============================================================

--------------------------------------------------------------
A) URL ENCODED
--------------------------------------------------------------

app.use(express.urlencoded({ extended: true }));

- Reads form data.

Without this:
req.body
will be undefined.

Example:

<input name="title">

Becomes:

req.body.title


--------------------------------------------------------------
B) STATIC FOLDER
--------------------------------------------------------------

app.use(express.static(path.join(__dirname, "public")));

- Makes public files accessible.

Example:

public/style.css

Browser accesses:

/style.css


--------------------------------------------------------------
C) METHOD OVERRIDE
--------------------------------------------------------------

app.use(methodOverride("_method"));

Looks for:

?_method=PUT

or

?_method=DELETE

Used later for:
  • edit
  • update
  • delete


==============================================================
7. DATABASE CONNECTION
==============================================================

async function main()

- Async because DB connection takes time.


--------------------------------------------------------------

await mongoose.connect(...)

- Waits until MongoDB connects.


--------------------------------------------------------------

mongodb://127.0.0.1:27017/airbnbclone

+---------------+----------------------+
| Part          | Meaning              |
+---------------+----------------------+
| 127.0.0.1     | localhost            |
| 27017         | MongoDB port         |
| airbnbclone   | database name        |
+---------------+----------------------+


--------------------------------------------------------------
PROMISE FLOW
--------------------------------------------------------------

main()
.then(...)
.catch(...)

If success:
  Connection to DB successful

If failure:
  Prints error


==============================================================
8. HOME ROUTE
==============================================================

app.get("/")

- GET request for homepage.

Browser visits:

localhost:3000/

Response:

res.send()

- Sends plain text response.


==============================================================
9. INDEX ROUTE
==============================================================

app.get("/listings")

- Shows ALL listings.


--------------------------------------------------------------
FLOW
--------------------------------------------------------------

STEP 1

Browser requests:

/listings


--------------------------------------------------------------

STEP 2

const listings = await Listing.find();

- Fetches all documents from MongoDB.

Equivalent MongoDB query:

db.listings.find()


--------------------------------------------------------------

STEP 3

res.render("index.ejs", { listings });

- Passes data to EJS.

Equivalent object:

{
   listings: [...]
}


==============================================================
10. index.ejs
==============================================================

- Dynamic HTML page.


--------------------------------------------------------------
LOOP
--------------------------------------------------------------

<% for(let listing of listings) { %>

- Runs JavaScript loop.


--------------------------------------------------------------
OUTPUT
--------------------------------------------------------------

<%= listing.title %>

- Prints value into HTML.

Example output:

Villa
Apartment
Farmhouse


--------------------------------------------------------------
DYNAMIC LINK
--------------------------------------------------------------

<a href="/listings/<%= listing.id %>">

Creates links like:

/listings/6853hshd

- Unique page for each listing.


==============================================================
11. NEW LISTING FORM
==============================================================

app.get("/listings/new")

- Shows form page.


--------------------------------------------------------------

res.render("new.ejs");

- Loads HTML form.


==============================================================
12. FORM SUBMISSION
==============================================================

app.post("/listings/new")

- Handles submitted form.


--------------------------------------------------------------
FLOW
--------------------------------------------------------------

STEP 1

User fills form:

<input name="title">


--------------------------------------------------------------

STEP 2

Browser sends:

POST /listings/new


--------------------------------------------------------------

STEP 3

Express receives data:

req.body

Example:

{
   title: "Villa",
   price: 5000
}


--------------------------------------------------------------

STEP 4

const newListing = new Listing(data);

- Creates mongoose document object.


--------------------------------------------------------------

STEP 5

await newListing.save();

- Stores document in MongoDB.

Equivalent MongoDB query:

db.listings.insertOne(...)


==============================================================
13. SHOW ROUTE
==============================================================

app.get("/listings/:id")

- Dynamic route parameter.

Example:

/listings/685e2hj


--------------------------------------------------------------
ROUTE PARAM
--------------------------------------------------------------

req.params.id

- Gets ID from URL.


--------------------------------------------------------------
FETCH ONE LISTING
--------------------------------------------------------------

await Listing.findById(id)

- Gets single document.

Equivalent MongoDB query:

db.listings.findOne({ _id: id })


--------------------------------------------------------------
RENDER PAGE
--------------------------------------------------------------

res.render("show.ejs", { listing });

- Passes listing object to EJS.


==============================================================
14. show.ejs
==============================================================

- Displays one listing.

Example:

<%= listing.title %>

Output:

Luxury Villa


==============================================================
15. WHY EJS IS USED
==============================================================

Without EJS:
  HTML stays static

With EJS:
  HTML changes dynamically using DB data

Example:

<%= listing.title %>

- Injects backend data into frontend.


==============================================================
16. REST PATTERN FOLLOWED
==============================================================

+----------------+----------------------+---------+
| Action         | Route                | Method  |
+----------------+----------------------+---------+
| Read all       | /listings            | GET     |
| Show form      | /listings/new        | GET     |
| Create         | /listings/new        | POST    |
| Read one       | /listings/:id        | GET     |
+----------------+----------------------+---------+


LATER YOU WILL ADD:

+----------------+----------------------+---------+
| Action         | Route                | Method  |
+----------------+----------------------+---------+
| Edit form      | /listings/:id/edit   | GET     |
| Update         | /listings/:id        | PUT     |
| Delete         | /listings/:id        | DELETE  |
+----------------+----------------------+---------+


==============================================================
17. FULL CURRENT FLOW EXAMPLE
==============================================================

STEP 1

User opens:

localhost:3000/listings


--------------------------------------------------------------

STEP 2

Express route runs:

app.get("/listings")


--------------------------------------------------------------

STEP 3

Mongoose fetches data:

Listing.find()


--------------------------------------------------------------

STEP 4

Data sent to EJS:

res.render("index.ejs", { listings })


--------------------------------------------------------------

STEP 5

EJS generates HTML dynamically.


--------------------------------------------------------------

STEP 6

Browser receives final HTML.


==============================================================
18. BIG CONCEPTS YOU ALREADY LEARNED
==============================================================

You already used:

• MVC-like structure
• Server-side rendering
• Dynamic routing
• Middleware
• REST routes
• MongoDB CRUD
• Form handling
• Route params
• Templating engine
• Database connection
• Async/await
• Mongoose models