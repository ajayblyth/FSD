
const mongoose = require('mongoose'); 
// Import mongoose library (ODM for MongoDB)


// CONNECT TO DATABASE
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/college');
  // Establish connection to MongoDB database "college"
}


// CREATE SCHEMA
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});
// Define structure (fields + types) of documents


// CREATE MODEL
const User = mongoose.model('User', userSchema);
// Compile schema into model → maps to "users" collection


// CALL CONNECTION FUNCTION
main()
  .then(() => {
    console.log("Connection successful.");
    // Runs when DB connection is established
  })
  .catch(err => console.log(err));
// Handles connection errors


// CREATE DOCUMENT (OBJECT)
const user1 = new User({
  name: "Adam",
  email: "adam@yahoo.in",
  age: 48
});
// Create a new document instance (not saved yet)


// SAVE DOCUMENT
// user1.save();
// Inserts document into database


// CREATE ANOTHER DOCUMENT
// const user2 = new User({
//   name: "eve",
//   email: "eve@yahoo.in",
//   age: 49
// });
// Another document instance


// SAVE SECOND DOCUMENT
// user2.save();
// Saves second document to DB


// MONGODB SHELL COMMANDS (REFERENCE)
// use college
// show collections
// db.users.find()
// Switch DB, list collections, view all documents


// INSERT MULTIPLE DOCUMENTS
// User.insertMany([
//   { name: "Tony", email: "tony@gmail.com", age: 50 },
//   { name: "Bruce", email: "bruce@gmail.com", age: 47 },
//   { name: "Peter", email: "peter@gmail.com", age: 30 }
// ]).then((data) => {
//   console.log(data);
// });
// Insert multiple documents at once


// FIND DOCUMENTS (QUERY)
// User.find({ age: { $gte: 47 } }).then((data) => {
//   console.log(data);
// });
// Retrieve documents where age >= 47


// UPDATE ONE DOCUMENT
User.updateOne({ name: "Bruce" }, { age: 53 }).then((data) => {
  console.log(data);
});
// Updates first matching document (returns status, not updated doc)


// FIND AND UPDATE DOCUMENT
User.findOneAndUpdate(
  { name: "Bruce" },
  { age: 62 },
  { returnDocument: "after" }
).then((data) => {
  console.log(data);
});
// Finds one doc, updates it, returns updated document