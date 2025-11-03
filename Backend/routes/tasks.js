const express = require("express")
const { addTask, getAllTasks, 
    // getUserSpecificTask, 
    toggleTaskStatusById, updateTaskById, deleteTaskById, searchTask } = require("../controllers/task.controller")

const taskRouter = express.Router()

taskRouter.post("/", addTask)
taskRouter.get("/", getAllTasks)
// taskRouter.get("/user/:id", getUserSpecificTask)
taskRouter.patch("/toggle/:id", toggleTaskStatusById)
taskRouter.put("/update/:id", updateTaskById)
taskRouter.delete("/delete/:id", deleteTaskById)

module.exports = taskRouter