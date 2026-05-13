const express = require("express");
const app = express();

const PORT = 3000;
app.use(express.json());

const users = [

    {
        id: 1,
        name: "Ajay",
        email: "ajay@gmail.com",
        number: 9876543210
    },

    {
        id: 2,
        name: "Sam",
        email: "sam@gmail.com",
        number: 9876543211
    }

];

//get all
app.get("/users", (req, res)=> {
    res.json(users);
})

//get user by id

app.get("/users/:id", (req, res)=>{
    const id = req.params.id;
    // res.send(id);
   const user= users.find(u => u.id == id);
   res.json(user);
})

//get user by query
app.get("/user", (req, res)=>{

const name = req.query.name.toLowerCase();
const user = users.find(u => u.name.toLowerCase() == name);
res.json(user);

})

//create user
app.post("/users", (req, res)=> {

   const  newUser = req.body;
   users.push(newUser);
   res.json({
    message: "user created",
user: newUser
   });
})

//update
app.patch("/users/:id", (req, res)=>{
    const id = req.params.id;
  const user =  users.find(u=> u.id == id);

  if(!user){
    return res.json({message: "user not found"})
  }
Object.assign(user, req.body);
res.status({
    message: "successfully updated",
    user
});
})

//delete
app.delete("/delete/:id", (req, res)=>{

    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id == id);

    if(index == -1){
       return res.status(404).json({
            message: "user does not exist"
        })
    }else{
        users.splice(index, 1);
        res.json({
            message: "user deleted succesfully",
            users
        })
    }
})

//Note: for objects delete users[id];

app.listen(PORT, ()=>{
    console.log(`server is running at port number ${PORT}`);
})