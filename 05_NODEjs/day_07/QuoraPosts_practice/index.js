const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;


let posts = [
    { id: 'a', username: 'opqtech', content: 'Hello, this is my first post' },
    { id: 'b', username: 'shiva', content: 'Hello, this is my third post' },
    { id: 'c', username: 'radha', content: 'Hello, this is my second post' }
]

app.set('view engine', "ejs");

app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.send("server is reachable");
});


app.get('/posts', (req, res) => {

    res.render('index.ejs', { posts });
});

app.listen(PORT, () => {
    console.log(`server is running on port number ${PORT}`);
})



