const Task = require("../models/task.model");

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!description)
      return res.status(400).json({ message: "Description is required" });

    const task = new Task({
      title,
      description,
      status: status || "pending", // Default to "pending"
      user: req.user._id, // Ensure consistency
    });

    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!description)
      return res.status(400).json({ message: "Description is required" });
    if (!status) return res.status(400).json({ message: "Status is required" });

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title;
    task.description = description;
    task.status = status;
    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, deleteTask, updateTask };
