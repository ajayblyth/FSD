// C:\Users\NithinShivanna\FSD_Jan_2026\FSD_Jan_2026\nodeJs\Class11>npm i ejs

// added 1 package, and audited 67 packages in 860ms

// 22 packages are looking for funding
// run `npm fund for details

// found 0 vulnerabilities

// C:\Users\NithinShivanna\FSD_Jan_2026\FSD_Jan_2026\nodeJs\Class11>npm i mongoose

// added 17 packages, and audited 84 packages in 4s

// 23 packages are looking for funding
// run `npm fund for details

// found 0 vulnerabilities
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

// establishing connection with mongoDB
require("./init.js");

const app = express();   // ✅ moved up (must be before using app)
const port = 3000;

app.set("view engine", "ejs");   // ✅ fixed aap → app
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));  // ✅ fixed aap → app
app.use(express.urlencoded({ extended: true }));
app.use(require("method-override")("_method"));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main()
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/chats", async (req, res) => {
    try {
        const result = await Chat.find();
        console.log(result);
        res.render("chats", { chats: result });
    } catch (err) {   // ✅ added missing bracket
        res.status(500).send("Error fetching the chats");
    }
});

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});  

app.post("/chats/new", (req, res) => {   // ✅ fixed route string
const data ={...req.body, created_at: new Date()}; 
const chat = new Chat(data);
try {
    await newChat.save();
    res.redirect("/chats");
} catch (err) {
    console.log(err);
    res.status(500).send("Error saving the chat");
}
   res.send("i recvd message");
});   

app.get("/chats/:id/edit", async (req, res) => {
    const { id } = req.params;
    const chat = await Chat.findById(id);

    res.render("edit.ejs", { chat });
});
// app.put("/chats/:id/edit", async (req, res) => {
//     const {msg} = req.body;
//     const { id } = req.params;
//     const { from, to, message } = req.body;

//     await Chat.findByIdAndUpdate(id, {
//         from,
//         to,
//         msg
//     });

//     res.redirect("/chats");
// });

app.patch("/chats/:id/edit", async (req, res)=>{
const {msg} = req.body;
await Chat.findByIdAndUpdate(req.params.id, {msg});
res.redirect("/chats");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});   




// ========================================
// DELETE FEATURE (MONGOOSE + EXPRESS)
// ========================================

// 1. INSTALL + SETUP
// ----------------------------------------
// npm i method-override

// const methodOverride = require("method-override");
// app.use(methodOverride("_method"));


// 2. DELETE BUTTON (index.ejs)
// ----------------------------------------
// <form action="/chats/<%= chat._id %>?_method=DELETE" method="POST">
//     <button type="submit">Delete</button>
// </form>

// NOTE:
// HTML forms support only GET and POST
// → so we use POST + _method=DELETE


// 3. DELETE ROUTE (index.js)
// ----------------------------------------
// app.delete("/chats/:id", async (req, res) => {
//     const { id } = req.params;

//     await Chat.findByIdAndDelete(id);

//     res.redirect("/chats");
// });


// 4. FLOW
// ----------------------------------------
// User clicks Delete
// → POST request sent with _method=DELETE
// → Express converts to DELETE request
// → Chat deleted from MongoDB
// → Redirect to /chats


// 5. KEY LINE (REMEMBER)
// ----------------------------------------
// app.use(methodOverride("_method"))