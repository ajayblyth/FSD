// imports
const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
const path = require("path");
const methodOverride = require("method-override");
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


// start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});