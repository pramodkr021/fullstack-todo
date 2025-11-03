const { taskModel, userModel } = require("../models/index")

const addTask = async (req, res) => {
    const data = req.body

    if (!data || data.length === 0) {
        return res.status(422).json({ "message": "Incomplete Data" })
    }

    const newTask = await taskModel.create(data)
    return res.status(201).json({
        "success": true,
        "data": newTask
    })
}

const getAllTasks = async (req, res) => {
    const search = req.query.search
    let filter = {}

    if (search) {
        filter.task = { $regex: search, $options: "i" }
    }
    
    const result = await taskModel.find(filter)

    return res.status(200).json({
        "success": true,
        data: result
    })
}

// const getUserSpecificTask = async (req, res) => {
//     const userId = req.params.id

//     const user = await userModel.findOne({ _id: userId })
//     if (!user) {
//         return res.status(404).json({
//             "success": false,
//             "message": "Invalid UserId provided"
//         })
//     }

//     const result = await taskModel.find({ createdBy: userId })
//     return res.status(200).json({
//         "success": true,
//         "data": result
//     })
// }

const toggleTaskStatusById = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await taskModel.findById(taskId);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Invalid Task ID"
            });
        }

        task.completed = !task.completed;
        await task.save();

        return res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

const updateTaskById = async (req, res) => {
    try {
        const id = req.params.id
        const updatedTask = await taskModel.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        if (!updatedTask) {
            return res.status(404).json({
                "success": false,
                "message": "Invalid task Id "
            })
        }
        res.status(200).json({
            "success": true,
            data: updatedTask
        })

    } catch (error) {
        return res.status(500).json(
            {
                "success": false,
                "message": "Something went wrong"
            }
        )
    }
}

const deleteTaskById = async (req, res) => {
    const id = req.params.id
    const status = await taskModel.findByIdAndDelete(id)
    if (!status) {
        return res.status(404).message({
            "success": false,
            "message": "Invalid ID"
        })
    }

    return res.status(200).json({
        "success": true,
        "message": "Task deleted successfully"
    })
}

module.exports = {
    addTask, getAllTasks,
    // getUserSpecificTask, 
    toggleTaskStatusById, updateTaskById, deleteTaskById
}