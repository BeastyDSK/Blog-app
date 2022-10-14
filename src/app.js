const express = require("express");
const path = require("path");
const postRouter = require("./routers/blogPostRouter");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

const app = express();

app.use(cors());
app.use(helmet());
app.use(
    hpp({
        whitelist: ["title", "author"],
    })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.use("/api/post", postRouter);

module.exports = app;
