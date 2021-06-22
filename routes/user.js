const moment = require("moment-timezone");
const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const auth = require("../middlewares/auth.js");

// Getting all
router.get("/", auth, async (req, res) => {
  try {
    const rep = await User.find();
    res.status(200).json(rep);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating one
router.post("/", async (req, res) => {
  if (req.body.name == null && req.body.password == null) {
    return res.status(400).json({
      message: "Поля name или password должны быть обязательно заполнены",
    });
  } else {
    const date = moment().tz("Europe/Kiev").format();
    const user = new User({
      name: req.body.name,
      password: req.body.password,
      date: req.body.reportDate || date,
    });
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
});

module.exports = router;
