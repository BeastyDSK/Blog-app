const Post = require("../models/postModel");

async function getPost(req, res, next) {
    try {
        console.log(req.query);
        let posts = null;
        if (req.params.id) posts = await Post.findById(req.params.id);
        else if (req.query.title || req.query.author) {
            let filter = {};

            for (let key in req.query) {
                if (key.toLowerCase().match(/(title)|(author)/g)) filter[key] = req.query[key];
            }
            console.log(filter);
            posts = await Post.find(filter);
        } else posts = await Post.find();
        res.status(200).send({
            status: "success",
            message: {
                data: posts,
            },
        });
    } catch (error) {
        res.status(400).send({
            status: "fail",
            message: "Bad Request",
        });
    }
}

async function createPost(req, res, next) {
    try {
        let post = await Post.create({
            title: req.body.title,
            author: req.body.author || "Anonymous",
            content: req.body.content,
        });

        res.status(201).send({
            status: "success",
            message: {
                data: post,
            },
        });
    } catch (error) {
        console.log(error);
        let err = {
            status: "fail",
            message: "Bad Request",
        };
        if ((error.code = 11000)) {
            err.message = "Title Already Exists.";
        }

        res.status(400).send(err);
    }
}

async function updatePost(req, res, next) {
    try {
        let post = await Post.findById(req.params.id);

        if (req.body.author) post.author = req.body.author;
        if (req.body.content) post.content = req.body.content;
        if (req.body.title) post.title = req.body.title;

        post.lastUpdated = Date.now();

        post.save({
            validateBeforeSave: true,
        });

        res.status(201).send({
            status: "success",
            message: "Updated",
        });
    } catch (error) {
        res.status(400).send({
            status: "fail",
            message: "Bad Request",
        });
    }
}

module.exports = {
    getPost,
    createPost,
    updatePost,
};
