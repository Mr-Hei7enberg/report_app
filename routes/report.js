const path = require("path");
const moment = require("moment-timezone");
const express = require("express");
const router = express.Router();
const Report = require("../models/Report.js");
const auth = require("../middlewares/auth.js");

// Getting all
router.get("/", auth, async (req, res) => {
  try {
    const rep = await Report.find();
    res.status(200).json(rep);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one
router.get("/:id", getReport, (req, res) => {
  res.json(res.report);
});

// Creating one
router.post("/", async (req, res) => {
  if (req.body.ploshad == null && req.body.oshibki == null) {
    return res.status(400).json({
      message: "одно из полей должно быть заполнено ploshad или oshibki",
    });
  } else {
    const date = moment().tz("Europe/Kiev").format();
    const report = new Report({
      name: req.body.name,
      workType: req.body.workType,
      ploshad: req.body.ploshad,
      oshibki: req.body.oshibki,
      reportDate: req.body.reportDate || date,
    });
    try {
      const newReport = await report.save();
      res.status(201).json(newReport);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
});

// Updating one
router.patch("/:id", getReport, async (req, res) => {
  if (req.body.name != null) {
    res.report.name = req.body.name;
  }
  if (req.body.ploshad != null) {
    res.report.ploshad = req.body.ploshad;
  }
  if (req.body.oshibki != null) {
    res.report.oshibki = req.body.oshibki;
  }
  if (req.body.workType != null) {
    res.report.workType = req.body.workType;
  }
  if (req.body.reportDate != null) {
    res.report.reportDate = req.body.reportDate;
  }
  try {
    const updateReport = await res.report.save();
    res.json(updateReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one
router.delete("/:id", getReport, async (req, res) => {
  try {
    await res.report.remove();
    res.json({ message: "Отчет удален" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getReport(req, res, next) {
  try {
    report = await Report.findById(req.params.id);
    if (report == null) {
      return res.status(404).json({ message: "Отчет не найден" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.report = report;
  next();
}

module.exports = router;
