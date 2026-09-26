const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validations");


profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        console.error("Invalid Token" + error.message);
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateProfileEditData(req.body)) {
            throw new Error("Invalid fields in profile edit");
        }
        const loggedInUser = req.user;

        Object.keys(req.body).forEach(element => {
            loggedInUser[element] = req.body[element];
        });

        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, Your profile edited successfully`,
            data: loggedInUser
        });
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
})

profileRouter.patch("/profile/password", async (req, res) => {

})


module.exports = profileRouter;