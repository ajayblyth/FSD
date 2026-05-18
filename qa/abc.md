Project structure:

user-management-mongodb/

│
├── config/
│   └── db.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── userRoutes.js
│
├── app.js
│
├── package.json
│
└── .gitignore
1. Install packages
npm init -y
npm install express mongoose validator
npm install --save-dev nodemon
2. config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {

    try {

        await mongoose.connect(
            "mongodb://127.0.0.1:27017/userManagementDB"
        );

        console.log("MongoDB connected");

    }

    catch (error) {

        console.log(error);

    }

};

module.exports = connectDB;
3. models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    age: {
        type: Number,
        required: true,
        min: 1
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
4. routes/userRoutes.js
const express = require("express");
const router = express.Router();

const validator = require("validator");

const User = require("../models/User");

// ======================================
// CREATE USER
// ======================================

router.post("/", async (req, res) => {

    try {

        let { name, email, age } = req.body;

        name = name?.trim();
        email = email?.trim();

        age = parseInt(age);

        if (!name || !email || !age) {

            return res.status(400).json({
                message: "name, email and age are required"
            });

        }

        if (!validator.isEmail(email)) {

            return res.status(400).json({
                message: "invalid email format"
            });

        }

        if (age < 1) {

            return res.status(400).json({
                message: "invalid age"
            });

        }

        const user = await User.create({
            name,
            email,
            age
        });

        res.status(201).json({
            message: "user created",
            user
        });

    }

    catch (error) {

        console.log(error);

        if (error.code === 11000) {

            return res.status(400).json({
                message: "email already exists"
            });

        }

        res.status(500).json({
            message: "internal server error"
        });

    }

});

// ======================================
// GET ALL USERS
// ======================================

router.get("/", async (req, res) => {

    try {

        const users = await User.find();

        res.json(users);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "internal server error"
        });

    }

});

// ======================================
// GET USER BY ID
// ======================================

router.get("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const user = await User.findById(id);

        if (!user) {

            return res.status(404).json({
                message: "user not found"
            });

        }

        res.json(user);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "internal server error"
        });

    }

});

// ======================================
// UPDATE USER
// ======================================

router.patch("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        let { name, email, age } = req.body;

        name = name?.trim();
        email = email?.trim();

        if (email && !validator.isEmail(email)) {

            return res.status(400).json({
                message: "invalid email format"
            });

        }

        if (age && age < 1) {

            return res.status(400).json({
                message: "invalid age"
            });

        }

        const updatedUser = await User.findByIdAndUpdate(

            id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!updatedUser) {

            return res.status(404).json({
                message: "user not found"
            });

        }

        res.json({
            message: "user updated",
            updatedUser
        });

    }

    catch (error) {

        console.log(error);

        if (error.code === 11000) {

            return res.status(400).json({
                message: "email already exists"
            });

        }

        res.status(500).json({
            message: "internal server error"
        });

    }

});

// ======================================
// DELETE USER
// ======================================

router.delete("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const deletedUser =
            await User.findByIdAndDelete(id);

        if (!deletedUser) {

            return res.status(404).json({
                message: "user not found"
            });

        }

        res.json({
            message: "user deleted"
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "internal server error"
        });

    }

});

module.exports = router;
5. app.js
const express = require("express");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());

// database connection

connectDB();

// routes

app.use("/users", userRoutes);

app.listen(PORT, () => {

    console.log(
        `server running at port ${PORT}`
    );

});
6. package.json scripts
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
7. Run MongoDB project

Start MongoDB locally.

Then:

npm run dev

“Project”