require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// use HTTP request logger middleware for node.js
// app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

// Connection to mongodb
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log(`Connected to ${process.env.DATABASE_URL}`));

//Статический вывод страницы
app.use(express.static(path.join(__dirname, "public/main")));
app.use(express.static(path.join(__dirname, "public/reports")));

// const reportsRouter = require("./routes/rest_api");
app.use("/", require(path.join(__dirname, "./routes")));
app.use("/report", require(path.join(__dirname, "./routes/report")));
app.use("/user", require(path.join(__dirname, "./routes/user")));

app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT}`);
});
