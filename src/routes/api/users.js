const express = require("express");
const auth = require("../../middlewares/authMiddleware");
const router = express.Router();

//Load models
const User = require("../../models/User");

// GET API START

// @route GET api/users/me
// @description get current user profile
// @access Private
router.get("/me", auth, async (req, res) => {
  res.send(req.user);
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
// @description Create users
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

// @route POST api/users/logout
// @description User logout from single device
// @access Private
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );

    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

// @route POST api/users/logout/all
// @description User logout from all devices
// @access Private
router.post("/logout/all", auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
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
