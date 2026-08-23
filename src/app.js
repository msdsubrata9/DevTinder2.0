require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validations");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res, next) => {
    try {
        // validation of data
        validateSignUpData(req);

        // Encrypt the password
        const { firstName, lastName, email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        // create new instance of the User model
        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });

        // save the user
        await user.save();
        res.send("User saved successfully");
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
})

app.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!validator.isEmail(email)) {
            throw new Error("Invalid credentials");
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Invalid credentials");
        }

        // Create a JWT Token
        const token = await jwt.sign({_id: user._id}, process.env.JWT_PRIVATE_KEY);

        // send the token to the user when it logged in successfully
        res.cookie("token", token);
        res.status(200).send("Login Successful");
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
})

app.get("/profile", async (req, res) => {
    try {
        const cookies = req.cookies;
        const {token} = cookies;
        const decodeMessage = await jwt.verify(
            token,
            process.env.JWT_PRIVATE_KEY
        );

        const {_id} = decodeMessage;

        const user = await User.findOne({_id});
        if(!user){
            throw new Error("User Not Found!! Please create new User!!")
        }
        res.send(user);
    } catch (error) {
        console.error("Invalid Token" + error.message);
    }
})

app.get("/user", async (req, res) => {
    const userEmail = req.body.email;

    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            res.status(404).send("user not found");
        }
        else {
            res.send(user);
        }
    } catch (error) {
        res.send("Something went wrong!!");
    }
})

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            res.status(404).send("no users found");
        }
        else {
            res.send(users);
        }
    } catch (error) {
        res.send("something went wrong");
    }
})

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (error) {
        res.send("something went wrong");
    }
})

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = [
            "photoUrl",
            "about",
            "gender",
            "age",
            "skills",
        ];

        const isUpdateAllowed = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key));

        if (!isUpdateAllowed) {
            throw new Error("Update Not Possible");
        }

        const user = await User.findByIdAndUpdate(userId, data, {
            returnDocument: "after",
            runValidators: true,
        });
        res.send("User data updated successfully");
    } catch (error) {
        res.send("UPDATE FAILED: " + error.message);
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


