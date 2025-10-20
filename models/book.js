const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter book title"],
        unique: true,
        trim: true,
        maxlength: 200,
        lowercase: true
    },
    author: String,
    price: {
        type: Number,
        required: [true, "Enter book price"],
        min: [0, "Price cannot be negative"]
    },
    rating: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Book", bookSchema);