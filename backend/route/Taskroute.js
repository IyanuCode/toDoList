const express = require("express")
const Task = require("../Model/Taskmodel")
const { createTask, getAllTask, getSingleTaskById, deleteTaskById, updateTask,findOneAndUpdate,getSingleTaskWithName } = require("../controller/Controller")
const router = express.Router()

//POST METHOD
router.post("/api/tasks", createTask)
//GET METHOD
router.get("/api/tasks", getAllTask)

// router.get("/api/tasks/:id", getSingleTaskById)

router.get("/api/tasks/:name", getSingleTaskWithName)

router.delete("/api/tasks/:id", deleteTaskById)

 router.put("/api/tasks/:id", updateTask)

router.put("/api/tasks/:id", findOneAndUpdate)



module.exports = router

// how to run a server
// npm run backend
