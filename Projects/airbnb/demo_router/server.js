const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");

// const users = require("./routes/user.js");
// const posts = require("./routes/posts.js");

// app.use("/users", users);
// app.use("/posts", posts);



//npm i express-session

app.use(cookieParser())
const sessionOptions = {
secret: "keyboard cat",
resave: false,
saveUninitialized: false,
cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
};
app.use(session(sessionOptions))

app.get("/about", (req, res)=>{
console.log("Hi i am in /about route");
console.log(req.query.name)
req.session.username =req.params.name;
// res.cookie("name", "opqTech", {signed: true});
res.send("/about responded");
})

app.get("/watch", (req, res)=>{
console.log("Hi i am in /watch route");
// console. log(req.signedCookies)
console.log(req.session.username);
res.send("/watch responded");

})

app.listen(3001, () => {
console.log("server is listening on port 3000");

});

