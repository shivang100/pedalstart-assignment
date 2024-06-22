const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        task: {
            type: String,
            required: true,
        },
        tagLine: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "Important",
            enum: ["Completed", "Important"],
        },
        date: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
