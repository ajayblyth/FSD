//practice again

const express = require("express");
const app = express();

const port = 3000;

app.use(express.json())

app.use((req, res, next)=>{
    console.log("received a request")
    next();
})

let students = [
  {
    id: 1,
    name: "Ajay Sharma",
    age: 22
  },
  {
    id: 2,
    name: "Rohit Sharma",
    age: 25
  },
  {
    id: 3,
    name: "Sunil Pal",
    age: 30
  },
  {
    id: 4,
    name: "Ramesh Kumar",
    age: 28
  },
  {
    id: 5,
    name: "Suresh Kumar",
    age: 35
  }
];


//get students
app.get("/", (req, res) => {
    res.status(200).json({
        data: students
    });
});


//get student by id
app.get("/:id", (req, res) => {

    const id = Number(req.params.id);

    const student =
        students.find(x => x.id === id);

    if (!student) {
        return res.status(404).json({
            message: `student with id: ${id} doesn't exist`
        });
    }

    res.status(200).json({
        data: student
    });
});

//create student
app.post("/", (req, res) => {
    const { id, name, age } = req.body;

    if (!id || !name || !age) {
        return res.status(400).json({
            message: "id, name and age are required"
        });
    }

    const existingStudent =
        students.find(x => x.id === id);

    if (existingStudent) {
        return res.status(400).json({
            message: "Student id already exists"
        });
    }


    const newStudent = { id, name , age
    };

    students.push(newStudent);

    res.status(201).json({
        message: "student added successfully",
        data: newStudent
    });
});

//update
app.put("/:id", (req, res) => {

    const id = Number(req.params.id);

    const student =
        students.find(x => x.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.age = req.body.age;

    res.status(200).json({
        message: "student updated successfully",
        data: student
    });
});



app.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    // CHANGED: Check existence before delete
    const student =
        students.find(x => x.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students = students.filter(
        x => x.id !== id
    );

    res.status(200).json({
        message: "Student deleted successfully",
        data: students
    });
});
app.patch("/:id", (req, res) => {

    const id = Number(req.params.id);

    const student =
        students.find(x => x.id === id);

    if (!student) {
        return res.status(404).json({
            message: `student with id : ${id} does not exist`
        });
    }

    if (req.body.name !== undefined) {
        student.name = req.body.name;
    }

    if (req.body.age !== undefined) {
        student.age = req.body.age;
    }

    res.status(200).json({
        message: "Student patched successfully",
        data: student
    });
});
app.listen(port, () => {
    console.log(
        `app is running on port number : ${port}`
    );
});