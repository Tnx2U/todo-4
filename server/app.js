const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const initializeRouter = require("./routes/initialize");
const columnOrderRouter = require("./routes/column_order");
const cardRouter = require("./routes/cards");
const columnRouter = require("./routes/column");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();
app.set("views", path.join(__dirname, "../client/public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/", indexRouter);
app.use("/init", initializeRouter);
app.use("/column_order", columnOrderRouter);
app.use("/card", cardRouter);
app.use("/column", columnRouter);
app.use(express.static(path.join(__dirname, "../client")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
