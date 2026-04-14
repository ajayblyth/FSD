const express = require('express');
const path = require('path')
const app = express();
const port = 3000;

let data = require("./data.json")

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    let greet = "Hello How are you"
    res.render('home', {greet})
})

app.get("/instagram/:username/st", (req, res)=>{
    const username = req.params.username;
    let selectData = data[username]
    res.render('insta', {selectData})
})
app.listen(port, ()=>{
    console.log(`Server is unning on port ${port}`)
})