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
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json(err);
  }
});

// @route POST api/users/login
// @description User login
// @access Public
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (err) {
    res.status(400).send();
  }
});

// POST API END

// PATCH API START

// @route PATCH api/users/:id
// @description update user by id
// @access Public
router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body); // Created an array of update fields
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("No user found");
    }

    updates.forEach(update => (user[update] = req.body[update]));

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PATCH API END

// DELETE API START

// @route DELETE api/users/:id
// @description DELETE a single user
// @access Public
router.delete("/:id", async (req, res) => {
  try {
    const response = await User.findByIdAndDelete(req.params.id);

    if (!response) {
      return res.status(404).send("No user found");
    }
    res.json({ success: "User Successfuly Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE API END

module.exports = router;
