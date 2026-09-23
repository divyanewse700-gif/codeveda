const express = require("express");
console.log("taskRoutes.js loaded");

const router = express.Router();

let tasks = [
  {
    id: 1,
    title: "Complete Codveda Task",
    description: "Build a REST API using Express",
  },
];

router.get("/", (req, res) => {
  res.status(200).json(tasks);
});

router.post("/", (req, res) => {
  const { title, description } = req.body;

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json(task);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const { title, description } = req.body;

  task.title = title || task.title;
  task.description = description || task.description;

  res.status(200).json(task);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1);

  res.status(200).json({
    message: "Task deleted successfully",
    task: deletedTask[0],
  });
});

router.delete("/test", (req, res) => {
  res.status(200).json({
    message: "DELETE route is working",
  });
});

module.exports = router;
