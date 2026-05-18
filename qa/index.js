const express = require("express");
const app = express();
const PORT = 3000;


const mysql =require("mysql2/promise");
const  {v4: uuidv4} = require("uuid");
const validator = require("validator");


app.use(express.json());

// let users =[
//     {id: 1, name: "Ajay",email: "ajay@gmail.com", number: 1234567890 },
//         {id: 2, name: "Sam",email: "samgmail.com", number: 1234567800 }


// ];

//connection
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "test",
    database: "userManagementDB",
    connectionLimit: 10,
    queueLimit:0

});

// pool.query("Select 1")
// .then(()=>{
//     console.log("connected");
// })
// .catch((err)=>{
// console.log(err)
// });

//1. create user
app.post("/users", async (req, res)=>{
    try{
    const {name, email, age} = req.body;
       name = name?.trim();
        email = email?.trim();
        age = parseInt(age);

    if(!name || !email || !age){
        return res.status(400).json({
            message: "name, email, and age are all required"
        });

    }
    if(!validator.isEmail(email)){
        return res.status(400).json({
            message: " wrong email format"
        })
    }

     if (age < 1) {

            return res.status(400).json({
                message: "invalid age"
            });

        }
    const id = uuidv4();
    const query = "INSERT INTO users(id, name, email, age) VALUES(?,?,?,?)";
    await pool.query(query, [id, name, email, age]);
    res.status(201).json({
        message: "user created"
    })

    }
    catch(error){
        res.status(500).json({
            message: "internal server error"
        })
    }
})


//get all users
app.get("/users" , async(req, res)=>{
    try{
        const query = "SELECT * FROM users";

        const[users] = await pool.query(query);

        res.json(users);
    }
    catch(error){
                console.log(error);

        res.status(500).json({
            message: "internal server error"
        });
    }
})

//get users by id

app.get("/users/:id", async(req, res)=>{

    try{
const id = req.params.id;

const query ="SELECT * FROM users WHERE id = ?";

const[user] = await pool.query(query, [id]);

if(user.length === 0){

    return res.status(404).json({
        message: "user not found"
    })
}
res.json(user[0]);


    }

        catch(error){
                    console.log(error);

        res.status(500).json({
            message: "internal server error"
        });
    }

})

//update
app.patch("/users/:id", async(req, res)=>{

try{
    const id = req.params.id;
    const {name, email, age} = req.body;


        name = name?.trim();
        email = email?.trim();
        age = parseInt(age);


        if (age && age < 1) {

            return res.status(400).json({
                message: "invalid age"
            });

        }

    const query = "UPDATE users SET name = ?, email = ?,  age =? WHERE id = ?";
   const [result]=  await pool.query(query, [name, email, age, id]);


   res.json({
    message: "user updated",
                user: [result]

   })

}

    catch(error){
        console.log(error);
        res.status(500).json({
            message: "internal server error",
        });
    }


})

//delete by id

app.delete("/users/:id", async (req, res)=>{

try{

const id = req.params.id;

const query = "DELETE FROM users WHERE id = ?";

const [result]= await pool.query(query, [id]);

   if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "user not found"
            });

        }

        res.json({
            message: "user deleted"
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "internal server error"
        });

    }

})






// //2. get all users

// app.get("/users", (req, res)=>{
//     res.json(users);
// })

// //3. get user by id
// app.get("/users/:id", (req, res)=>{
// const id = parseInt(req.params.id);
// const user = users.find(u=> u.id ==id);

// if(!user){
//     return res.status(404).json({
//         message: "user not found"
//     })
// }
// res.json(user);
// })

// //4. update user
// app.patch("/users/:id", (req, res)=>{
//     const id = parseInt(req.params.id);
//     const user = users.find(u=> u.id ===id);

//   if(!user){
//     return res.status(404).json({
//         message: "user not found"
//     })
// }

// Object.assign(user, req.body);

// res.status(200).json({
//     message: "user updated",
//     user
// })
// })

// //5.delete user 
// app.delete("/users/:id", (req, res)=>{

//     const id = parseInt(req.params.id);
//     const user = users.find(u=> u.id ===id);


//   if(!user){
//     return res.status(404).json({
//         message: "user not found"
//     })
// }
// users = users.filter(u => u.id != id);
// res.json({
// message: "user deleted successfully",
// users

// });

// })




app.listen(PORT, ()=>{
    console.log(`server is running at port number ${PORT}`);
})

