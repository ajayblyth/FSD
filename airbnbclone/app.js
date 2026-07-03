// Imports.
const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
const path = require("path");

const methodOverride = require("method-override");

// Const variables.
const app = express();
const port = 3000;

// Setup app variables and middleware.
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

// Connection to database.
async function main() {
    await mongoose.connect(
        "mongodb://127.0.0.1:27017/airbnbclone"
    );
}

main()
.then(() => {
    console.log("Connection to DB successful.");
})
.catch((err) => {
    console.log(err);
});

// Home route.
app.get("/", (req, res) => {
    res.send("Hello , Welcome to this Page");
});

// Index route.
app.get("/listings", async (req, res) => {

    try {
        const listings = await Listing.find();

        res.render("index.ejs", { listings });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

});

// New listing form.
app.get("/listings/new", async (req, res) => {

    try {
        res.render("new.ejs");

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

});

// Create listing.
app.post("/listings/new", async (req, res) => {

    try {

        let data = req.body;

        const newListing = new Listing(data);

        await newListing.save();

        res.send("Saved new listing");

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

});

// Show a listing.
app.get("/listings/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const listing = await Listing.findById(id);

        res.render("show.ejs", { listing });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

});

app.listen(port, () => {
    console.log(`Server is running @ port: ${port}`);
});

