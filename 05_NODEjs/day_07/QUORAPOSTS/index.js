const express = require('express');

const app = express();

const port = 3000;

const path = require('path');

const{v4: uuidv4} = require('uuid')



let posts = [
    {id: 'a', username: 'opqtech', content: 'first post'},
        {id: 'b', username: 'ajay', content: 'second post'},

            {id: 'c', username: 'vijay', content: 'third post'}


]
app.set('view engine', "ejs");
app.set("views", path.join(__dirname , "views"));


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));


app.get('/', (req, res)=>{
    res.send("server is reachable");

});

app.get('/posts', (req, res)=>{
    res.render('index.ejs',{posts});
});

//handle new post creation
app.get('/posts/newpost', (req, res)=>{
    res.render('newpost.ejs')

})

app.post('/posts', (req, res)=>{
console.log(req.body);
posts.push({id:uuidv4(), ...req.body})

res.redirect("/posts") // will redirect to this route 

});

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);
});

      