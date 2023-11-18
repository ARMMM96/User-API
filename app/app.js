const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connection");
const app = express();

app.use(cors());


connectDB()






app.all("*", (req, res) => {
    res.status(404).send({
        apisStatus: false,
        message: "Invalid URL",
        data: {}
    })
});

module.exports = app;