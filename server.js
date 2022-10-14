const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "config.env"),
});
const http = require("http");
const app = require("./src/app");
const mongoose = require("mongoose");

const httpServer = http.createServer(app);

const port = process.env.PORT || 1234;

function startDB() {
    mongoose
        .connect(process.env.DURL)
        .then((e) => {
            console.log("Connected successfuly");
        })
        .catch((err) => {
            console.error("Exception Occured : " + err.message);
            process.emit("SIGTERM");
        });
}
const serverInstance = httpServer.listen(port, () => {
    startDB();
    console.log(`http://localhost:${port}`);
});

process.on("SIGTERM", (e) => {
    serverInstance.close();

    console.error("Closing server with signal : " + e);
});
