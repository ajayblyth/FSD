const express = require('express');
const app = express();

app.use(express.json()); // to read JSON body

// Dummy data (Quora posts)
let posts = [
    { id: 'a', username: 'opqtech', content: "hello?" },
    { id: 'b', username: 'shiva', content: "shiva is here?"  },
    {id: 'c', username: 'radha', content: "radhakrishna?" }
];


// GET /posts → render all posts (EJS)
app.get('/posts', (req, res) => {
    res.render('index', { posts });
});

// POST /posts → create new post
app.post('/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});


// GET /posts/:id → get single post
app.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.json(post);
});


// PATCH /posts/:id → update specific post
app.patch('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;

    res.json(post);
});


// DELETE /posts/:id → delete post
app.delete('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== id);

    res.send("Post deleted successfully");
});


// HOME ROUTE
app.get('/', (req, res) => {
    res.send("Hello World");
});


// SERVER
app.listen(3000, () => {
    console.log("Server started on port 3000");
});