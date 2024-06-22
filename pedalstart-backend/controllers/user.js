const Task = require("../models/task");

exports.createTask = async (req, res, next) => {
    try {
        const { task, tagLine, status, date } = req.body;
        const newTask = new Task({
            task,
            tagLine,
            status,
            date,
        });
        await newTask.save();
        res.status(200).json({ message: "Task created", task: newTask });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const { taskId, task, tagLine, status, date } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { task, tagLine, status, date },
            { new: true }
        );

        if (!updatedTask) {
            const error = new Error("Task not found");
            error.statusCode = 404;
            throw error;
        }

        return res
            .status(200)
            .json({ message: "Task updated", task: updatedTask });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const { taskId } = req.body;
        console.log(taskId);
        const deletedTask = await Task.findByIdAndRemove(taskId);
        if (!deletedTask) {
            const error = new Error("Task not found");
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({ message: "Task deleted" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllTasks = async (req, res, next) => {
    try {
        const { status } = req.query;
        const query = status ? { status } : {};
        const tasks = await Task.find(query);
        return res
            .status(200)
            .json({ message: "Tasks fetched successfully", tasks });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getTaskById = async (req, res, next) => {
    try {
        const { taskId } = req.query;
        const task = await Task.findById(taskId);
        if (!task) {
            const error = new Error("Task not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: "Task fetched successfully", task });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
