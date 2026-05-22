const express = require("express");
const router = express. Router(this.mergeParams = true);
const Listing = require(" .. /models/listings.js")
const Review = require(" .. /models/review.js");
const { listingSchema, reviewSchema } = require(" .. /schema.js");
const CustomError = require(" .. /error.js");
const asyncWrapper = require(" .. /utils.js")
const { isLoggedIn, isOwner } = require(" .. /middleware.js");

const validateReview = (req, res, next) => {
const { error } = reviewSchema.validate(req.body);
if(error){
const msg = error.details.map(el => el.message).join(",");
throw new CustomError(msg, 400);
} else {
next();
router.post("/", isLoggedIn, validateReview, asyncWrapper(async (req, res)=>
const newreview = new Review(req.body.review);
newreview.1 T
const listing = await Listing.findById(req.params.id);
if(!listing)
{

throw new CustomError("No listing with this id", 400);
}
listing.reviews.push(newreview);
await listing.save();
await newreview.save();
req.flash("success", "New review added!");
res.redirect(`/listings/${req.params.id}`);

O

router.delete("/:reviewId", async (req, res)=>{

const {id, reviewId} = req.params;
await Listing.findByIdAndUpdate(id, {$pull: { reviews: reviewId } });
await Review.findByIdAndDelete(reviewId);
req. flash("success", "Review deleted successfully!");
res.redirect(`/_istings/${id}`);

module.exports = router;