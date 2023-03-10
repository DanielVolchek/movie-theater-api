const express = require("express");

const router = express.Router();
const { User } = require("../models/User");
const { Show } = require("../models/Show");
const { check, validationResult } = require("express-validator");

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// get user by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// get all shows for a user
router.get("/:id/shows", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    const shows = await user.getShows();
    res.json(shows);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// add a show user has watched
router.put("/:id", [check("showId").not().isEmpty()], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { showId } = req.body;

    const user = await User.findByPk(id);
    const show = await Show.findByPk(showId);
    user.addShow(show);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;

// post a user
// router.post(
//   "/",
//   [check("username").not().isEmpty(), check("password").not.isEmpty()],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const { username, password } = req.body;
//
//     const user = await User.create({ username, password });
//     res.json(user);
//   }
// );
