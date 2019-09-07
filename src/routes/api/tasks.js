const express = require("express");
const router = express.Router();

//Load models
const Task = require("../../models/Task");

// GET API START

// @route GET api/tasks/
// @description get all tasks
// @access Public
router.get("/", (req, res) => {
  Task.find()
    .then(response => {
      if (!response) {
        return res.status(404).send("No task found");
      }
      res.json(response);
    })
    .catch(err => res.status(500).json(err));
});

// @route GET api/tasks/:id
// @description get task by id
// @access Public
router.get("/:id", (req, res) => {
  Task.findById(req.params.id)
    .then(response => {
      if (!response) {
        return res.status(404).send("No task found");
      }
      res.json(response);
    })
    .catch(err => res.status(500).json(err));
});

// GET API END

// POST API START

// @route POST api/tasks/
// @description store tasks
// @access Public
router.post("/", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => res.status(201).send(task))
    .catch(err => {
      res.status(400).send(err);
    });
});

module.exports = router;
