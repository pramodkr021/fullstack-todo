const mongoose = require("mongoose");
const env = require("dotenv");

env.config();

const dbConnect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected")
    } catch (error) {
        console.error("Db connection failed ",error)
        process.exit(1)
    }
}

module.exports = dbConnect;