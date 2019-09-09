const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/authMiddleware");

//Load models
const Task = require("../../models/Task");

// GET API START

// @route GET api/tasks/
// @description get all tasks
// @access Private
router.get("/", auth, async (req, res) => {
  const match = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  try {
    await req.user.populate({ path: "tasks", match }).execPopulate();

    res.json(req.user.tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// @route GET api/tasks/:id
// @description get task by id
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      return res.status(404).send("No task found");
    }
    res.json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET API END

// POST API START

// @route POST api/tasks/
// @description store tasks
// @access Private
router.post("/", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user.id
  });

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
// @access Private
router.patch("/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body); // Created an array of update fields
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      return res.status(404).send("No task found");
    }

    updates.forEach(update => (task[update] = req.body[update]));

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PATCH API END

// DELETE API START

// @route DELETE api/tasks/:id
// @description DELETE a single task
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      return res.status(404).send("No task found");
    }
    res.json({ success: "Task Successfuly Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE API END

module.exports = router;
