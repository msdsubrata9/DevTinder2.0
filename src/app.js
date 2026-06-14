require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res, next) => {
    const user = new User({
        firstName: "Sourav",
        lastName: "Ganguly",
        email: "sourav.g@gmail.com",
        password: "Sourav@1234",
    });

    try {
        await user.save();
        res.send("User saved successfully");
    } catch (error) {
        res.status(400).send("Something went wrong!! " + error.message);
    }
})

connectDB().then(() => {
    console.log("Database connection established successfully");
    app.listen(7777, () => {
        console.log("Server is running successfully in 7777...")
    });
}).catch((err) => {
    console.error("Database connection failed", err);
})


