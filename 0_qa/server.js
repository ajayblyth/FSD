const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const validator = require("validator");


// database Connection
    mongoose.connect("mongodb://127.0.0.1:27017/userManagementDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const userSchema = new mongoose.Schema({

    id: {
        type: String,
        default: uuidv4
    },

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    match: /^[A-Za-z\s]+$/   //regular expression for pattern matching
  },
 
/*
    Note:
 / /          -> regex starts and ends
^              -> start of string
$              -> end of string
[A-Z]          -> all capital letters
[a-z]          -> all small letters
[0-9]          -> all numbers
\s             -> space/whitespace
+              -> one or more times
*              -> zero or more times
?              -> optional

/^[A-Za-z\s]+$/  
-> only letters and spaces allowed
*/

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase:true
    },

    age: {
        type: Number,
        required: true,
        min: 1,
        max:150
    }},
    {       
        timestamps: true //utc timezone will be used for createdAt and updatedAt fields and  converted to local timezone, use utc 
    });


// Model
const User = mongoose.model("User", userSchema);


const seedUsers = async () => {

    try {
        const existingUsers = await User.countDocuments();

        if (existingUsers > 0) {
            return;
        }

        const users = [

            {
                name: "Pawan Singh",
                email: "pawan@gmail.com",
                age: 22
            },

            {
                name: "Rahul Kumar",
                email: "rahul@gmail.com",
                age: 25
            }

        ];

        await User.insertMany(users);


    }

    catch (error) {

        console.log(error);

    }

};

seedUsers();


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});



// 1. CREATE USER
app.post("/users", async (req, res) => {

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
                message: "wrong email format"
            });

        }

        if (age < 1) {

            return res.status(400).json({
                message: "invalid age"
            });

        }

        const newUser = new User({ name, email, age });

        await newUser.save();

        res.status(201).json({
            message: "user created",
            user: newUser
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "internal server error"
        });

    }

});




// 2. GET ALL USERS
app.get("/users", async (req, res) => {

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




// 3. GET USER BY ID
app.get("/users/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const user = await User.findOne({ id });

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

// 4. UPDATE USER
app.patch("/users/:id", async (req, res) => {

    try {
        const id = req.params.id;
        let { name, email, age } = req.body;

        name = name?.trim();
        email = email?.trim();
        age = parseInt(age);

        const updateData = {};   // object for storing only update fields

        if (name) {
            updateData.name = name;
        }

        if (email) {
            if (!validator.isEmail(email)) {

                return res.status(400).json({
                    message: "wrong email format"
                });

            }
            updateData.email = email;
        }

        if (!isNaN(age)) {   // alone  if(age) fails for 0 because 0 is falsy in JavaScript and inner code wont run
            // !isNaN(age) is truthy,  ensures validation runs for valid numbers including 0

            if (age < 1) {
                return res.status(400).json({
                    message: "invalid age"
                });
            }
            updateData.age = age;

        }



        // updating user
        const updatedUser = await User.findOneAndUpdate( { id }, updateData,  { new: true } 
/* 
{id} same as {id:id}, shorthand
Without new:true:
❌ returns old "Ram" 
With new:true:
✅ returns updated "Ajay"
*/
        );



        // if user not found
        if (!updatedUser) {

            return res.status(404).json({
                message: "user not found"
            });

        }



        // success response
        res.json({

            message: "user updated",

            user: updatedUser

        });

    }

    catch (error) {

        console.log(error);



        // duplicate email error
        if (error.code === 11000) {

            return res.status(400).json({
                message: "email already exists"
            });

        }



        // server error
        res.status(500).json({
            message: "internal server error"
        });

    }

});

// 5. DELETE USER
app.delete("/users/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const deletedUser = await User.findOneAndDelete({ id });

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

app.listen(PORT, () => {

    console.log(`server is running at port number ${PORT}`);

});

