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

// POST API END

// PATCH API START

// @route PATCH api/tasks/:id
// @description update task by id
// @access Public
router.patch("/:id", async (req, res) => {
  try {
    const response = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!response) {
      return res.status(404).send("No task found");
    }

    res.json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PATCH API END

// DELETE API START

// @route DELETE api/tasks/:id
// @description DELETE a single task
// @access Public
router.delete("/:id", async (req, res) => {
  try {
    const response = await Task.findByIdAndDelete(req.params.id);

    if (!response) {
      return res.status(404).send("No task found");
    }
    res.json({ success: "Task Successfuly Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE API END

module.exports = router;
