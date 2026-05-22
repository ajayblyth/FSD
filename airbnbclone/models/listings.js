const mongoose = require("mongoose");
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1720884413532-59289875c3e1?q=80&w=1935&auto=format&fit=crop"
    },
    price: Number,
    location: String,
    country: String
});

const Listing = mongoose.model("listing", listingSchema);

module.exports = Listing;