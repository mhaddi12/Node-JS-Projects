const router = require("express").Router();
const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middleware/middleware");

router.post("/create", authMiddleware, taskController.createTask);
router.get("/", authMiddleware, taskController.getTasks);
router.delete("/:id", authMiddleware, taskController.deleteTask);
router.put("/:id", authMiddleware, taskController.updateTask);

module.exports = router;
