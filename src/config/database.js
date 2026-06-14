const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect(process.env.MONGO_DATABASE_CONNECTION_URL);
}

module.exports = connectDB;

