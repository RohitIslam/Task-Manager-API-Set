const express = require("express");
const router = express.Router();

//Load models
const Task = require("../../models/Task");

// POST API START

// @route POST api/tasks/
// @description store tasks
// @access Public
router.post("/", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => res.send(task))
    .catch(err => {
      res.status(400).send(err);
    });
});

module.exports = router;
