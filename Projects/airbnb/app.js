const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
const Review = require("./models/review.js");
const path = require("path");
const methodOverride = require("method-override");
const CustomError = require("./error.js"); //fix at 8:32...5/4/2026
const engine = require("ejs-mate");
const listingSchema = require("./schema.js");  
 const flash = require("connect-flash"); 
// app setup

//const variables

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

const sessionOptions = {
secret: "thisisasecret",
resave: false,
saveUninitialized: true,
cookie:{
httpOnly: true,
expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
}
};

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new.LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next)=>{
res.locals.success = req.flash("success");
res.locals.error = req.flash("error");
console.log("current user in middleware:", req.user);
res.locals.currentUser = req.user;
next();});

    // dummy route
app.get("/", (req, res) => {
    res.send("hello i am up and running");
});
function validateListing((req, res, next)=>
{
let {error} = listingSchema.validate(req.body);
if(error)

let msg = error.details.map(el=>el.message).join(",");
throw new CustomError(msg, 400);
}
next();

});
const validateReview = (req, res, next) => {
const { error } = reviewSchema.validate(req.body);
if(error){
const msg = error.details.map(el => el.message).join(",");
throw new CustomError(msg, 400);
} else {
next();
}
}
app.use((req, res, next)=>{
req.responseTime = new Date(Date.now()).toString();
console.log(req.method, req.path, req.responseTime, req.hostname);
// res.send("bye")
next();
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
        next(new CustomError("Listing Not Found", 404));
    }
});

// EDIT - form
app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// UPDATE - save changes
app.put("/listings/:id", validateListing, async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body });
    res.redirect("/listings");
});


// DELETE - remove listing

app.delete("/listings/:id", async(req, res)=>{
const id = req.params.id;
console.log("I am here")
await Listing.findByIdAndDelete(id);

res.redirect("/listings");

I//checked till below for 5/08/2026, updated
app.post("/listings/:id/reviews", async (req, res)=>{
const newreview = new Review(req.body);
const listing = await Listing.findById(req.params.id);
listing.reviews.push(newreview);
await listing.save();
await newreview.save();
res.redirect(`/listings/${req.params.id}`);

});

app.delete("/listings/:id/reviews/:reviewid", async (req, res)=>{
const {id, reviewid} = req.params;
await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewid}});
await Review.findByIdAndDelete(reviewid);
res.redirect(`/listings/${id}`);

app.all("*splat", (req, res, next)=>{
next(new CustomError("Page Not Found", 404));

})

app.use((err, req, res, next)=>{
let {statusCode = 500, message = "Something went wrong"} = err;
res.render("error.ejs", {err: {statusCode, message}});

});

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


//update from 7:52... 5/10/2026