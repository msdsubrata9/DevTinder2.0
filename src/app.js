const express = require("express");

const app = express();

app.use("/test", (req, res) => {
    res.send("sending response form test");
})

app.use("/hello", (req, res) => {
    res.send("sending response form hello");
})

app.use("/", (req, res) => {
    res.send("sending response form dashboard");
});

app.listen(7777, () => {
    console.log("Server is running successfully in 7777...")
});