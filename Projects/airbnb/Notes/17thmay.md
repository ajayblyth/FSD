========================
MVC ARCHITECTURE
========================

MVC = Model + View + Controller


------------------------------------------------------------
1. MODEL
------------------------------------------------------------

Purpose:
- Handles database
- Schema
- Data logic
- Queries

Example:
- MongoDB schema
- MySQL queries

Folder:
models/


Example:

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});


------------------------------------------------------------
2. VIEW
------------------------------------------------------------

Purpose:
- What user sees
- Frontend/UI/Templates

Examples:
- EJS
- HTML
- React

Folder:
views/


Example:

<h1><%= user.name %></h1>


------------------------------------------------------------
3. CONTROLLER
------------------------------------------------------------

Purpose:
- Handles request and response
- Business logic
- Connects Model and View

Folder:
controllers/


Example:

const users = await User.find();

res.render("users", { users });


------------------------------------------------------------
FLOW OF MVC
------------------------------------------------------------

User Request
      ↓
Controller
      ↓
Model
      ↓
Database
      ↓
Controller
      ↓
View / JSON Response
      ↓
User


------------------------------------------------------------
FOLDER STRUCTURE
------------------------------------------------------------

project/
│
├── models/
├── views/
├── controllers/
├── routes/
├── public/
├── app.js


------------------------------------------------------------
WHY MVC?
------------------------------------------------------------

Without MVC:
- Everything in one file
- Hard to manage
- Confusing

With MVC:
- Clean structure
- Easy debugging
- Easy scaling
- Better teamwork
- Better maintenance


------------------------------------------------------------
REAL LIFE EXAMPLE
------------------------------------------------------------

Model       → Kitchen/database
View        → Food shown to customer
Controller  → Waiter handling request