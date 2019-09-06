const express = require("express");
const router = express.Router();

//Load models
const User = require("../../models/User");

// POST API START

// @route POST api/users/
// @description store users
// @access Public
router.post("/", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => res.send(user))
    .catch(err => {
      res.status(400).send(err);
    });
});

module.exports = router;
