const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 10,
    },
    lastUpdated: {
        type: Date,
        default: Date.now(),
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
        default: "Anonymous",
    },
});

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
