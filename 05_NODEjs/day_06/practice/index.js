const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());

let employees = [
    { id: 1, name: "Ajay Sharma", phone: 12345, city: "Jammu" },
    { id: 2, name: "Vijay Verma", phone: 13456, city: "Kashmir" },
    { id: 3, name: "Pankaj Singh", phone: 54321, city: "Ladakh" }
];

// =======================================================
// GET ALL EMPLOYEES
// =======================================================
app.get("/", (req, res) => {

    if (employees.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No records found"
        });
    }

    res.status(200).json({
        success: true,
        count: employees.length,
        employees
    });

});

// =======================================================
// GET EMPLOYEE BY ID
// =======================================================
app.get("/:id", (req, res) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid employee id"
        });
    }

    const employee = employees.find(emp => emp.id === id);

    if (!employee) {
        return res.status(404).json({
            success: false,
            message: `Employee with id ${id} not found`
        });
    }

    res.status(200).json({
        success: true,
        employee
    });

});

// =======================================================
// CREATE EMPLOYEE
// =======================================================
app.post("/", (req, res) => {

    const { name, phone, city } = req.body;

    if (!name || !phone || !city) {
        return res.status(400).json({
            success: false,
            message: "Name, phone and city are required"
        });
    }

    const newEmployee = {
        id: employees.length
            ? employees[employees.length - 1].id + 1
            : 1,
        name,
        phone,
        city
    };

    employees.push(newEmployee);

    res.status(201).json({
        success: true,
        message: "Employee created successfully",
        employee: newEmployee
    });

});

// =======================================================
// UPDATE ENTIRE EMPLOYEE (PUT)
// =======================================================
app.put("/:id", (req, res) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid employee id"
        });
    }

    const { name, phone, city } = req.body;

    if (!name || !phone || !city) {
        return res.status(400).json({
            success: false,
            message: "Name, phone and city are required"
        });
    }

    const index = employees.findIndex(emp => emp.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Employee with id ${id} not found`
        });
    }

    employees[index] = {
        id,
        name,
        phone,
        city
    };

    res.status(200).json({
        success: true,
        message: "Employee updated successfully",
        employee: employees[index]
    });

});

// =======================================================
// PARTIAL UPDATE (PATCH)
// =======================================================
app.patch("/:id", (req, res) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid employee id"
        });
    }

    const employee = employees.find(emp => emp.id === id);

    if (!employee) {
        return res.status(404).json({
            success: false,
            message: `Employee with id ${id} not found`
        });
    }

    const { name, phone, city } = req.body;

    if (name !== undefined) employee.name = name;
    if (phone !== undefined) employee.phone = phone;
    if (city !== undefined) employee.city = city;

    res.status(200).json({
        success: true,
        message: "Employee updated successfully",
        employee
    });

});

// =======================================================
// DELETE EMPLOYEE
// =======================================================
app.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid employee id"
        });
    }

    const index = employees.findIndex(emp => emp.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Employee with id ${id} not found`
        });
    }

    const deletedEmployee = employees.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Employee deleted successfully",
        employee: deletedEmployee[0]
    });

});

app.listen(port, () => {
    console.log(`App is running at port ${port}`);
});