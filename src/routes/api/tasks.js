const express = require("express");
const router = express.Router();

//Load models
const Task = require("../../models/Task");

// GET API START

// @route GET api/tasks/
// @description get all tasks
// @access Public
router.get("/", async (req, res) => {
  try {
    const response = await Task.find();

    if (!response) {
      return res.status(404).send("No task found");
    }

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// @route GET api/tasks/:id
// @description get task by id
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const response = await Task.findById(req.params.id);

    if (!response) {
      return res.status(404).send("No task found");
    }
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET API END

// POST API START

// @route POST api/tasks/
// @description store tasks
// @access Public
router.post("/", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
