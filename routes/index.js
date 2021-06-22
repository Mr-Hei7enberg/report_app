const path = require("path");
const moment = require("moment-timezone");
const express = require("express");
const app = express();
const router = express.Router();
const Report = require("../models/Report.js");
const auth = require("../middlewares/auth.js");

// main page
router.get("/", async (req, res) => {
  // Use this statement for render /views pages
  // res.render("pages/indexPage", { title: "Report App" });
  res.sendFile(path.join(__dirname, "../public/main/index.html"));
});

// reports page
router.get("/reports", async (req, res) => {
  // Use this statement for render /views pages
  // res.render("pages/reportsPage", { title: "All reports" });
  res.sendFile(path.join(__dirname, "../public/reports/index.html"));
});

// users page
router.get("/users", async (req, res) => {
  // Use this statement for render /views pages
  // res.render("pages/usersPage", { title: "Users" });
});

// help page
router.get("/help", async (req, res) => {
  // Use this statement for render /views pages
  // res.render("pages/helpPage", { title: "Help" });
});

module.exports = router;
