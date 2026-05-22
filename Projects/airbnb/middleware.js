let isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
        req.flash("error", "You must be signed in to do that!");
        res.redirect("/login");

    };

let isOwner= async (req, res, next) => {
const {id} = req.params.id;
const listing = await Listing.findById(id).populate("owner");
if (!listing.owner._id.equals(req.user._id)) {
    req.flash("error", "You are not the owner of this listing!");
    return res.redirect(`/listings/${id}`);
}
next();
}
    module.exports = {
        isLoggedIn,
        isOwner

    };