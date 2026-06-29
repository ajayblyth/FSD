const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const data =  require('./data.json')


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))// this is used for setting the views folder path
    
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());

app.get("/",(req, res)=>{
    let greet = "how are you"
    res.render("home.ejs", {greet})
  
})
app.get("/instagram/:username",(req, res)=>{

    const username = req.params.username;
    const selectedData= data[username];
    res.render("insta.ejs", {selectedData})

})
app.listen(port, ()=>{
    console.log(`server is running on port number ${port}`);
})