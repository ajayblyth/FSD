const mongoose = require("mongoose");
const Review = require("./review.js");
const User = require("./user.js");
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
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],

        },
    }
});

const Listing = mongoose.model("listing", listingSchema);

module.exports = listing;
