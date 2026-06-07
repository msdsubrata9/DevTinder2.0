const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.post("/user/login",(req, res, next)=>{
    res.send("User loggedIn Successfully");
})

app.get("/user/data", userAuth, (req, res, next)=>{
    res.send("User data send");
})

app.get("/admin/getAllData",(req, res, next)=>{
    res.send("Admin gets all the data");
})

app.listen(7777, () => {
    console.log("Server is running successfully in 7777...")
});