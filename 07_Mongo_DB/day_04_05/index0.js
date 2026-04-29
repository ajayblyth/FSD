const bookSchema = mongoose. Schema({
title: {
type: String,
required: true
},
author: {
type: String
},
price: {
type: Number,
min:[1, "plz enter a valid price"]

},
discount: {
type: Number,
default: 0
},
category: {
type: String,
enum: ["fiction", "non-fiction"]
}

});

const Book = mongoose.model("Book", bookSchema)
let book1 = new Book({
    title: "Science",
    author: "chetan",
    price: 1,
    category: "fiction"
});
book1.save()

//npm install
//type mongosh in terminal to connect to mongoDB
//use college
// college> show collections
// books
// student
// users
// college> db.books.find()

// _id: ObjectId("69ec22b9a4bf9eb669d9ef73"),
// title: 'Mathematics',
// author: '569',
// price: 1000,
// _V: 0

// }

// college>

// ]
// college> db.books.drop()
// true
// college> show collections
// student
// users
// college>
Book.findByIdAndUpdate("randomm id", {price: -500},{runValidators: true}).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
})