const mongoose = require("mongoose");
const Listing = require("../models/listings.js");

const data = require("./data.json")

async function main()
{

await mongoose.connect("mongodb://127.0.0.1:27017/airbnbclone")

}

async function initDB(){
    try{
await Listing.deleteMany({}); // if anything is there, we delete it first
consol.log("Deleted all existing listings")
await Listing.insertMany(data.listings);
console.log("Inserted all listings successfully")
mongoose.connection.close();    //one time activity , so close the connection after we are done with it.

}
 catch(err){
        console.log("Error initializing DB: ", err);
    }

}

main().then(()=>{
console.log("Connection to DB successful.")
}).catch(err=>console.log(err));

