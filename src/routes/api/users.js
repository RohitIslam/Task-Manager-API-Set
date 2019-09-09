const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/authMiddleware");
const multer = require("multer");

//Load models
const User = require("../../models/User");

// GET API START

// @route GET api/users/me
// @description get current user profile
// @access Private
router.get("/me", auth, async (req, res) => {
  res.send(req.user);
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

// @route POST api/users/me/avater
// @description upload image for user
// @access Private

// Multer configutation
const upload = multer({
  dest: "src/asstes/images",
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error("Please upload a image file"));
    }

    callback(undefined, true);
  }
});

router.post(
  "/me/avatar",
  upload.single("avatar"),
  async (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// POST API END

// PATCH API START

// @route PATCH api/users/me
// @description update user's own account
// @access Public
router.patch("/me", auth, async (req, res) => {
  const updates = Object.keys(req.body); // Created an array of update fields
  try {
    updates.forEach(update => (req.user[update] = req.body[update]));

    await req.user.save();

    res.json(req.user);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PATCH API END

// DELETE API START

// @route DELETE api/users/me
// @description DELETE own account
// @access Public
router.delete("/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.json({ success: "User Successfuly Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE API END

module.exports = router;
