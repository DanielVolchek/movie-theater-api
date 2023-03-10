const express = require("express");
const { Show } = require("../models/Show");

const router = express.Router();

// get all shows
router.get("/", async (req, res) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// get one show by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const show = await Show.findByPk(id);
    res.json(show);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// get all shows by genre
router.get("/:genre", async (req, res) => {
  try {
    const { genre } = req.params;
    const shows = await Show.findAll({ where: { genre: genre } });
    res.json(shows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/// update show by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const show = await Show.findByPk(id);
    show.update(req.body);
    res.json(show);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// delete a show
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const show = await Show.findByPk(id);
    show.destroy();
    res.json(show);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
