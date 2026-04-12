const express = require('express'); 
const path = require('path');      // import path module (to handle file paths)

const app = express();             
const port = 3000;                

app.set('view engine', 'ejs');     
// set EJS as templating engine → allows rendering .ejs files

app.set('views', path.join(__dirname, 'views')); 
// tell Express where EJS files are stored
// __dirname = current folder path
// joins current path with "views" folder

app.get('/', (req, res) => {       

    let greet = "Hello How are you"; 
    // create a variable to send to EJS

    res.render('home.ejs', { greet }); 
    // render home.ejs file from views folder
    // send data { greet } to EJS
    // EJS will replace <%= greet %> with this value
});

app.listen(port, () => {           

    console.log(`Server is running on port ${port}`); 
});