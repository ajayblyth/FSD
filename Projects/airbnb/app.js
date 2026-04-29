//imports
const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listings.js")
const path = require("path");
const methodOverride = require("method-override");

//const variables
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true})); // to parse the form data coming from the client
app.use(express.static(path.join(__dirname, "public"))); // for serving static files like css, js, images etc.

//connection to database
async function main()
{
await mongoose.connect("mongodb://127.0.0.1:27017/airbnbclone");
}

main().then(()=>{
console.log("Connection to DB successful.")
}).catch(err=>console.log(err));

//dummy route
app.get("/", (req, res)=>{
    res.send("hello i am up and running");
});

app.get("/listings", async (req, res)=>{
    try{
        const listings = await Listing.find({});
        // console.log(listings);
        res.render("index.ejs", {listings});
    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
    
});

//new listing form
app.get("/listings/new", async(req, res)=>{

    try{
        res.render("new.ejs");
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.post("/listings/new", async(req, res)=>{
try{
let data = req.body;
const newListing = new Listing(data);
await newListing.save();
res.send("saved new listing");
}
catch(err)
{
console.log(err);
res.status(500).json({ error: "Internal Server Error" });

}

//show a listing
app.get("/listings/:id", async (req, res)=>{
    try{
            const id = req.params.id;

        const listing = await Listing.findById(id);
        // res.send("hello i am a listing");
        res.render("show.ejs", {listing});
    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});