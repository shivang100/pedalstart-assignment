const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router
    .post("/create", userController.createTask)
    .post("/update", userController.updateTask)
    .post("/delete", userController.deleteTask)
    .get("/all-task", userController.getAllTasks)
    .get("/task", userController.getTaskById);

module.exports = router;
