const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },
    completed:{
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = new mongoose.model("Task", taskSchema)