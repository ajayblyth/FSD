function validateListing(req, res, next)
if(error)

let msg = error.details.map(el=>el.message).join(",");
throw new CustomError(msg, 400);

next();
}
// Index route.
router.get("/", async (req, res)=>{
try{

// console.log(listings);
res.locals.message = req.flash("success");
res.render("listings/index.ejs", {listings});
}
catch(err)
{
console.log(err);
res.status(500).json({ error: "Internal Server Error" });

const listings = await Listing.find();

}


router.post("/new", validateListing, async(req, res)=>{
try{
let data = req.body;
const newListing = new Listing(data);
await newListing.save();
req. flash("success", "Successfullly created a new listing")
res.redirect("/listings");

catch(err)

req. flash("error", "Failed to create a new listing")
res.status(500).json({ error: "Internal Server Error" });

// Show a listing.
router.get("/:id", async (req, res)=>{







    //Edit the listing

router.get("/:id/edit", async (req, res)=>{
const id = req.params.id;
const listing = await Listing.findById(id);

res.render("listings/edit.ejs", {listing});

});

router.put("/:id", validateListing, async(req, res)=>{
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