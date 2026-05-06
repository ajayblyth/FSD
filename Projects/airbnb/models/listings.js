const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/Airbnb-Logo-PNG-Picture.png"
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("listing", listingSchema);

module.exports = Listing;