const express = require("express");
const router = express.Router();

//Load models
const User = require("../../models/User");

// GET API START

// @route GET api/users/
// @description get all users
// @access Public
router.get("/", async (req, res) => {
  try {
    const response = await User.find();

    if (!response) {
      return res.status(404).send("No user found");
    }

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// @route GET api/users/:id
// @description get user by id
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const response = await User.findById(req.params.id);

    if (!response) {
      return res.status(404).send("No user found");
    }

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET API END

// POST API START

// @route POST api/users/
// @description store users
// @access Public
router.post("/", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST API END

// PATCH API START

// @route PATCH api/users/:id
// @description update user by id
// @access Public
router.patch("/:id", async (req, res) => {
  try {
    const response = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!response) {
      return res.status(404).send("No user found");
    }

    res.json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PATCH API END

module.exports = router;
