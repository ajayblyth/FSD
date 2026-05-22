const express = require("express");
const router = express. Router()
const Listing = require(" .. /models/listings.js")
const Review = require(" .. /models/review.js");
const { listingSchema, reviewSchema } = require(" .. /schema.js");
const CustomError = require(" .. /error.js");
const asyncWrapper = require(" .. /utils.js");
const { isLoggedIn, isOwner } = require(" .. /middleware.js");
const listingController = require(" .. /controllers/listing.js");
const multer = require("multer");
const { storage } = require(" .. /cloudinaryAccess.js");
const upload = multer({ storage });



function validateListing(req, res, next){
if(error)

let msg = error.details.map(el=>el.message).join(",");
throw new CustomError(msg, 400);

next();
}

// Index route.
router.get("/", listingController.index);


// New listing.
router.get("/new", isLoggedIn, listingController.renderNewForm);



router.post("/new", validateListing, isLoggedIn, listingController.createListing);

// Show a listing.
router.get("/:id", listingController.showListing);

    //Edit the listing

router.get("/:id/edit", isLoggedIn, isOwner, );

router.put("/:id", validateListing, isLoggedIn, isOwner, async(req, res)=>{
const id = req.params.id;

await Listing.findByIdAndUpdate(id, { ... req.body});

res.redirect("/listings")
});


router.delete("/:id", async(req, res)=>{
const id = req.params.id;
console. log("I am here")

await Listing.findByIdAndDelete(id);
req.flash("success", "Listing deleted successfully!");
res.redirect("/listings");
})
module.exports = router;