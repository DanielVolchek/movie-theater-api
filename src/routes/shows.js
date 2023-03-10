const express = require("express");
const { Show } = require("../models/index");

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
router.get("/genres/:genre", async (req, res) => {
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

function hasWhiteSpace(s) {
  return /\s/g.test(s);
}

router.put("/:id/:update", async (req, res) => {
  try {
    const { id, update } = req.params;
    const show = await Show.findByPk(id);
    const ratingUpdate = parseInt(update);

    // if rating is NaN then we are updating status which is a string of enum type (consult models/shows)
    if (isNaN(ratingUpdate)) {
      show.update({ status: update });
      if (hasWhiteSpace(update)) {
        return res
          .status(400)
          .json({ message: "Status cannot contain spaces" });
      }
      if (update.length < 5) {
        return res
          .status(400)
          .json({ message: "Status cannot be less than 5 characters" });
      }

      if (update.length > 25) {
        return res
          .status(400)
          .json({ message: "Status cannot be more than 25 characters" });
      }

      // if not then we are updating rating
    } else {
      show.update({ rating: ratingUpdate });
    }
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
