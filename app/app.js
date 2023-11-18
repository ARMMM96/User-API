const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connection");
const app = express();


app.use(express.json())
app.use(cors());


connectDB()

const userRoutes = require('./routes/user.routes')



app.use("/user", userRoutes)

app.all("*", (req, res) => {
    res.status(404).send({
        apisStatus: false,
        message: "Invalid URL",
        data: {}
    })
});

module.exports = app;