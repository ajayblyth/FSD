const express = require('express');
const router = express.Router();
const User = require(" .. /models/user");
const { asyncWrapper } = require



router.post("/signup" , async (req, res)=>{
const {username, email, password} = req.body;
const userdoc = new User({username, email});
const registeredUser = await User.register(userdoc, password)
req.login(registeredUser, (err) => {
if (err) {
return next(err);

req.flash("success", "Welcome to Airbnb!");
res.redirect("/listings");

I

});

router.get("/login", (req, res) => {
res.render("users/login.ejs");

});

});

router.get("/signup", async (req, res) => {
    res.render("users/signup.ejs");
});




router.post("/login", passport.authenticate("local", {
failureFlash: true,
failureRedirect: "/login",

async (req, res) => {
req. flash("success", "Welcome back!");
res.redirect("/listings");

router.get("/logout", (req, res)=>{
req.logout((err)=>{
if(err){
return next(err);

req.flash("success", "You have been logged out!");
res Jredirect("/listings");


module.exports = router;