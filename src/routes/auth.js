const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validations");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user");

authRouter.post("/signup", async (req, res, next) => {
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

authRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!validator.isEmail(email)) {
            throw new Error("Invalid credentials");
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordCorrect = await user.validatePassword(password);
        if (!isPasswordCorrect) {
            throw new Error("Invalid credentials");
        }

        // Create a JWT Token
        const token = await user.getJWT();

        // send the token to the user when it logged in successfully
        res.cookie("token", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
        res.status(200).send("Login Successful");
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
})

module.exports = authRouter;