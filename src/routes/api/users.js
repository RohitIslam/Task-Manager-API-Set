const express = require("express");
const router = express.Router();

//Load models
const User = require("../../models/User");

// GET API START

// @route GET api/users/
// @description get all users
// @access Public
router.get("/", (req, res) => {
  User.find()
    .then(response => {
      if (!response) {
        return res.status(404).send("No user found");
      }
      res.json(response);
    })
    .catch(err => res.status(500).json(err));
});

// @route GET api/users/:id
// @description get user by id
// @access Public
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(response => {
      if (!response) {
        return res.status(404).send("No user found");
      }
      res.json(response);
    })
    .catch(err => res.status(500).json(err));
});

// GET API END

// POST API START

// @route POST api/users/
// @description store users
// @access Public
router.post("/", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => res.status(201).send(user))
    .catch(err => {
      res.status(400).send(err);
    });
});

// POST API END

module.exports = router;
