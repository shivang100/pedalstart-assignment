require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const MONGODB_URL = process.env.MONGODB_URL;

app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.statusCode).json({
        error: error.message,
        data: error.data,
    });
});

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        app.listen(5000);
        console.log(`Server started at port 5000`);
    })
    .catch((err) => {
        console.log(err);
    });
