const asyncWrapper = require(" .. /utils.js");
const Listing = require(" .. /models/listings.js");

const Review = require(" .. /models/review.js");
const geocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = geocoding({ accessToken: process.env.MAP_TOKEN });


const CustomError = require(" .. /error.js");
module.exports.index = async (req, res) => {
    try {
        const listings = await Listing.find();
        // console.log(listings);
        res.render("listings/index.ejs", { listings });
    }
    catch (err) {

        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.renderNewForm = async (req, res) => {
    try {
        // res.send("form loaded");
        res.render("listings/new.ejs");
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.createListing = async (req, res) => {
    try {
        let data = req.body;
        const newListing = new Listing(data);
        if (req.file) {
            newListing.image = req.file.path;
        }
const response = await geocodingClient.forwardGeocode({
query: `${data.location}, ${data.country}`,
limit: 2  //will send the top 2 results for the query
}).send();

        newListing.owner = req.user._id;
        console.log(newListing)
        await newListing.save();
        req.flash("success", "Successfullly created a new listing")
        res.redirect("/listings");
    }
    catch (err) {
        req.flash("error", "Failed to create a new listing")
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.showListing = async (req, res) => {

    try {

        const id = req.params.id;
        const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
        res.render("listings/show.ejs", { listing });
    }
    catch (err) {
        console.log(err);
        next(new CustomError("Listing not found", 404));
    }
}

modul.exports.renderEditForm = async (req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id);

    res.render("listings/edit.ejs", { listing });

}
