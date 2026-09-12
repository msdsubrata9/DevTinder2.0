const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            throw new Error("Token is not valid!!!!!!");
        }
        const decodeMessage = await jwt.verify(
            token,
            process.env.JWT_PRIVATE_KEY
        );

        const { _id } = decodeMessage;

        const user = await User.findById(_id);

        if (!user) {
            throw new Error("User Not found");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
}

module.exports = {
    userAuth,
}