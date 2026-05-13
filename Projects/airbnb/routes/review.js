
//below line 19
const listing = await Listing.findById(req.params.id);
if(!listing)

throw new CustomError("No listing with this id", 400);

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