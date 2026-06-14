const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect("mongodb+srv://msdsubrata9:Subrata1234@namastenode.qgsag.mongodb.net/devTinderNew");
}

module.exports = connectDB;

