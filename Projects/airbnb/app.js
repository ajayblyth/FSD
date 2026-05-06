const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
const path = require("path");
const methodOverride = require("method-override");
const CustomError = require("./error.js"); //fix at 8:32...5/4/2026
const engine = require("ejs-mate");

// app setup

const app = express();
const port = 3000;

// view engine setup

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares

app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


// database connection

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/airbnbclone");
}

main()
    .then(() => console.log("Connection to DB successful."))
    .catch((err) => console.log(err));


    // dummy route
app.get("/", (req, res) => {
    res.send("hello i am up and running");
});

// //learning error handling
// app.get("/about", (req, res) => {
//     let abcd;
//     res.send("About page");
// });

//learning error handling
app.get("/about", (req, res)=>{
abcd = abcd

res.send("About page");
}); // will throw error


// =====================
// LISTINGS ROUTES
// =====================

// INDEX - all listings
app.get("/listings", async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.render("listings/index.ejs", { listings });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});


// NEW - form
app.get("/listings/new", (req, res) => {
    try {
        res.render("listings/new.ejs");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// CREATE - add listing

app.post("/listings/new", async (req, res) => {
    try {
        let data = req.body;
        const newListing = new Listing(data);
        await newListing.save();
        res.redirect("/listings");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// SHOW - single listing

app.get("/listings/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const listing = await Listing.findById(id);
        res.render("listings/show.ejs", { listing });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

// EDIT - form
app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// UPDATE - save changes
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body });
    res.redirect("/listings");
});


// DELETE - remove listing

app.delete("/listings/:id", async (req, res) => {
    const id = req.params.id;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});



//manual response to error handler, always put this at the end of all routes, so that if any error is thrown in any route, it will be caught here and handled.

// app.use((err, req, res, next)=>{
// console.log(err);
// console.log("I am here in the error handler1");
// // res.status(500).send("Internal Server Error !");
// next(err); //can also pass on the error handler which is default error handler

// app.use((err, req, res, next)=>{
// console.log("I am here in the last error handler2");
// console.log(err);
// res.status(500).send("Internal Server Error !");
// // next(err);


app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).send(message);
});


// start server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//class after middleware

// app.use("/listings", (req, res, next)=>{
// let {token} = req.query;
// if(token === "giveaccess")
// {

// return next();
// }
// res.send("ACCESS.DENIED !");

// // Connection to database.
// async function main()
// {
// await mongoose. connect ("mongodb://127.0.0.1:27017/airbnbclone"
// );
// }
// main().then(()=>{
// console. log("Connection to DB successful.")
// }).catch(err=>console.log(err));
